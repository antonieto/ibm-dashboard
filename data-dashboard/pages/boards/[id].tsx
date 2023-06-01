import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Add, DataVolume } from '@carbon/icons-react';

import { Responsive, WidthProvider } from 'react-grid-layout';
import type { Layout } from 'react-grid-layout';
import { useRouter } from 'next/router';
import trpc from '@/lib/hooks/trpc';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

import TopLayout from '@/lib/components/TopLayout/TopLayout';
import ChartTypeMenu, {
  ChartType,
} from '@/lib/components/ChartTypeMenu/ChartTypeMenu';
import { DataSourcesMenuModal } from '@/lib/components';
import ButtonWithIcon from '../../lib/components/ButtonWithIcon/ButtonWithIcon';
import Chart from '../../lib/components/Chart/Chart';
import { NextPageWithLayout } from '../_app';

import { Chart as ChartModel } from '@/server/models';

const ResponsiveReactGridLayout = WidthProvider(Responsive);

const breakpoints = {
  lg: 1200,
};

const cols = {
  lg: 8,
};

const margin: [number, number] | { [P: string]: [number, number] } = {
  lg: [20, 20],
};

const Container = styled.div`
  background-color: #f4f5f5;
  height: 100vh;
`;

const AddButtonContainer = styled.div`
  position: absolute;
  bottom: 20px;
  left: 20px;
`;

const ChartTypeMenuContainer = styled.div`
  position: absolute;
  bottom: 130px;
  left: 20px;
`;

type DataGridProps = {
  id: string;
  xIndex: number;
  yIndex: number;
  width: number;
  height: number;
};

function Board() {
  const params = useRouter().query;
  const [openChartTypeMenu, setOpenChartTypeMenu] = useState(false);
  const [isDataSourcesModalOpen, setIsDataSourcesModalOpen] = useState(false);
  const [layouts, setLayouts] = useState<{ [index: string]: Layout[] }>();
  const router = useRouter();

  // const widgetArray = MOCK_CHART_LIST;
  const { data: widgetArrayRes } = trpc.charts.getCharts.useQuery({
    boardId: params.id! as string,
  });
  const [widgetArray, setWidgetArray] = useState<ChartModel[]>([]);

  useEffect(() => {
    if (widgetArrayRes) {
      setWidgetArray(widgetArrayRes.charts);
    }
  }, [widgetArrayRes]);

  const { mutate: createChart } = trpc.charts.addChart.useMutation({
    onSuccess: (res) => {
      console.log('Success!', res);
      setWidgetArray([...widgetArray, res.chart]);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  /*
  const { mutate: createBoard } = trpc.boards.createBoard.useMutation({
    onSuccess: (res) => {
      const board = {
        ...res.board,
        createdAt: new Date(res.board.createdAt),
      };
      router.push(`boards/${board.boardId}`);
    },
    onError: (error) => {
      console.log(error);
    },
  });
  */

  const toggleChartTypeMenu = () => {
    setOpenChartTypeMenu(!openChartTypeMenu);
  };

  const closeChartTypeMenu = () => {
    setOpenChartTypeMenu(false);
  };

  const onAddChart = (type: ChartType) => {
    console.log('onAddChart', type);
    createChart({
      boardId: params.id! as string,
      type,
      title: 'New Chart',
      x: 0,
      y: 0,
      width: 4,
      height: 4,
      data_source_id: '6d463973-8fa3-4841-b610-f493d52ea089',
    });
  };

  const handleShowDataSources = () => {
    setIsDataSourcesModalOpen(true);
    console.log('handling');
  };

  const getComponent = (
    widget: DataGridProps & React.ComponentProps<typeof Chart>,
  ) => {
    const { id, xIndex, yIndex, width, height } = widget;

    return (
      <div
        key={id}
        data-grid={{
          x: xIndex,
          y: yIndex,
          w: width,
          h: height,
          i: id,
          maxW: Infinity,
          minW: 2,
          maxH: Infinity,
          minH: 3,
          isDraggable: true,
          isResizable: true,
        }}
      >
        <Chart key={id} {...widget} />
      </div>
    );
  };

  const boardId = router.query.id as string;
  interface ChartProps {
    className: string;
    index: string;
    categories: string[];
    colors: (
      | 'blue'
      | 'cyan'
      | 'fuchsia'
      | 'gray'
      | 'green'
      | 'indigo'
      | 'lime'
      | 'orange'
      | 'pink'
      | 'purple'
      | 'red'
      | 'teal'
      | 'violet'
      | 'yellow'
      | 'slate'
      | 'zinc'
      | 'neutral'
      | 'stone'
      | 'amber'
      | 'emerald'
      | 'sky'
      | 'rose'
    )[];
    yAxisWidth: number;
  }

  const chartProps: ChartProps = {
    className: 'mt-6',
    index: 'name',
    categories: ['Number of threatened species'],
    colors: ['blue'],
    yAxisWidth: 48,
  };

  interface ChartPropsPie {
    className: string;
    index: string;
    // category: string,
    categories: string[];
    colors: (
      | 'blue'
      | 'cyan'
      | 'fuchsia'
      | 'gray'
      | 'green'
      | 'indigo'
      | 'lime'
      | 'orange'
      | 'pink'
      | 'purple'
      | 'red'
      | 'teal'
      | 'violet'
      | 'yellow'
      | 'slate'
      | 'zinc'
      | 'neutral'
      | 'stone'
      | 'amber'
      | 'emerald'
      | 'sky'
      | 'rose'
    )[];
    yAxisWidth: number;
  }

  const chartPropsPie: ChartPropsPie = {
    className: 'mt-6',
    index: 'name',
    // category: 'Number of threatened species',
    categories: ['Number of threatened species'],
    colors: ['blue'],
    yAxisWidth: 48,
  };

  const data = [
    {
      name: 'Mammals',
      'Number of threatened species': 10,
    },
    {
      name: 'Birds',
      'Number of threatened species': 20,
    },
    {
      name: 'Reptiles',
      'Number of threatened species': 30,
    },
    {
      name: 'Amphibians',
      'Number of threatened species': 40,
    },
  ];
  return (
    <Container>
      <DataSourcesMenuModal
        boardId={boardId}
        isOpen={isDataSourcesModalOpen}
        onClose={() => setIsDataSourcesModalOpen(false)}
      />
      <div>
        <ResponsiveReactGridLayout
          style={{ background: '#F4F5F5' }}
          layouts={layouts}
          preventCollision={false}
          onLayoutChange={(_, allLayouts) => {
            setLayouts({
              ...allLayouts,
            });
          }}
          verticalCompact
          autoSize
          breakpoints={breakpoints}
          cols={cols}
          margin={margin}
        >
          {widgetArray !== undefined &&
            widgetArray.map((widget: ChartModel) =>
              getComponent({
                ...widget,
                xIndex: widget.x,
                yIndex: widget.y,
                type: 'bar',
                data,
                chartProps: widget.type === 'pie' ? chartPropsPie : chartProps,
              }),
            )}
        </ResponsiveReactGridLayout>
      </div>

      {openChartTypeMenu && (
        <ChartTypeMenuContainer>
          <ChartTypeMenu onSelect={onAddChart} onClose={closeChartTypeMenu} />
        </ChartTypeMenuContainer>
      )}

      <AddButtonContainer>
        <ButtonWithIcon
          text="Agregar grafica"
          icon={Add}
          onClick={toggleChartTypeMenu}
        />
        <ButtonWithIcon
          text="Data sources"
          icon={DataVolume}
          onClick={handleShowDataSources}
          style={{ marginTop: '10px' }}
        />
      </AddButtonContainer>
    </Container>
  );
}

const BoardPage: NextPageWithLayout = Board;

BoardPage.getLayout = (page) => <TopLayout>{page}</TopLayout>;
export default BoardPage;
