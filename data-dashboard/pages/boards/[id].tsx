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
import { Chart as ChartModel } from '@/server/models';
import TemporalDataSourcesListModal from '@/lib/components/TemporalDataSourcesListModal/TemporalDataSourcesListModal';
import ButtonWithIcon from '../../lib/components/ButtonWithIcon/ButtonWithIcon';
import Chart from '../../lib/components/Chart/Chart';
import { NextPageWithLayout } from '../_app';

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

type GridElementProps = {
  id: string;
  xIndex: number;
  yIndex: number;
  width: number;
  height: number;
};

const MOCK_CHART_DATA = [
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
function getGridChartItem({
  gridElement,
  chartProps,
}: {
  gridElement: GridElementProps;
  chartProps: React.ComponentProps<typeof Chart>;
}) {
  const { id, xIndex, yIndex, width, height } = gridElement;

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
      <Chart key={id} {...chartProps} />
    </div>
  );
}

function Board() {
  const params = useRouter().query;
  const [openChartTypeMenu, setOpenChartTypeMenu] = useState(false);
  const [isDataSourcesModalOpen, setIsDataSourcesModalOpen] = useState(false);
  const [selectDataSource, setIsTemporalDataSourcesModalOpen] = useState(false);
  const [chartTypeCreate, setChartTypeCreate] = useState<ChartType>('bar');
  const [layouts, setLayouts] = useState<{ [index: string]: Layout[] }>();
  const router = useRouter();

  const { data: widgetArrayRes } = trpc.charts.getCharts.useQuery({
    boardId: params.id as string,
  });
  const [widgetArray, setWidgetArray] = useState<ChartModel[]>([]);

  useEffect(() => {
    if (widgetArrayRes) {
      setWidgetArray(widgetArrayRes.charts);
    }
  }, [widgetArrayRes]);

  const { mutate: createChart } = trpc.charts.addChart.useMutation({
    onSuccess: (res) => {
      setWidgetArray([...widgetArray, res.chart]);
    },
  });

  const { mutate: deleteChart } = trpc.charts.deleteChart.useMutation({
    onSuccess: (res) => {
      setWidgetArray(
        widgetArray.filter((widget) => widget.id !== res.chart.id),
      );
    },
  });

  const { mutate: updateChart } = trpc.charts.updateChart.useMutation({});

  const toggleChartTypeMenu = () => {
    setOpenChartTypeMenu(!openChartTypeMenu);
  };

  const closeChartTypeMenu = () => {
    setOpenChartTypeMenu(false);
  };

  const onAddChart = (type: ChartType, dataSourceId: string) => {
    const yIndex = Math.floor(widgetArray.length / cols.lg) * 3;
    createChart({
      boardId: params.id as string,
      type,
      title: 'New Chart',
      x: (widgetArray.length * 2) % cols.lg,
      y: yIndex,
      width: 2,
      height: 3,
      data_source_id: dataSourceId,
    });
  };

  const handleShowDataSources = () => {
    setIsDataSourcesModalOpen(true);
  };

  const handleRemoveChart = (id: string) => {
    deleteChart({ chartId: id });
  };

  const boardId = router.query.id as string;

  return (
    <Container>
      <DataSourcesMenuModal
        boardId={boardId}
        isOpen={isDataSourcesModalOpen}
        onClose={() => setIsDataSourcesModalOpen(false)}
      />
      <TemporalDataSourcesListModal
        isOpen={selectDataSource}
        onClose={() => setIsTemporalDataSourcesModalOpen(false)}
        onSelectDataSource={(dataSourceId) => {
          onAddChart(chartTypeCreate, dataSourceId);
          setIsTemporalDataSourcesModalOpen(false);
        }}
      />
      <div>
        <ResponsiveReactGridLayout
          style={{ background: '#F4F5F5' }}
          layouts={layouts}
          preventCollision={false}
          onLayoutChange={(currentLayout, allLayouts) => {
            setLayouts({
              ...allLayouts,
            });

            widgetArray.forEach((widget) => {
              const newLayout = currentLayout.find(
                (layout) => layout.i === widget.id,
              );
              if (newLayout) {
                updateChart({
                  id: newLayout.i,
                  x: newLayout.x,
                  y: newLayout.y,
                  width: newLayout.w,
                  height: newLayout.h,
                });
              }
            });
          }}
          verticalCompact
          autoSize
          breakpoints={breakpoints}
          cols={cols}
          margin={margin}
        >
          {widgetArray.map((widget) => getGridChartItem({
            chartProps: {
              id: widget.id,
              data: MOCK_CHART_DATA,
              removeChart: handleRemoveChart,
              settings: {
                categories: ['Number of threatened species'],
                colors: ['blue', 'pink'],
                index: 'name',
                twClassName: 'mt-6',
                type: widget.type,
                yAxisWidth: widget.width,
              },
              title: 'New chart',
            },
            gridElement: {
              height: widget.height,
              id: widget.id,
              width: widget.width,
              xIndex: widget.x,
              yIndex: widget.y,
            },
          }))}
        </ResponsiveReactGridLayout>
      </div>

      {openChartTypeMenu && (
        <ChartTypeMenuContainer>
          <ChartTypeMenu
            onSelect={(type: ChartType) => {
              setChartTypeCreate(type);
              setIsTemporalDataSourcesModalOpen(true);
            }}
            onClose={closeChartTypeMenu}
          />
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
