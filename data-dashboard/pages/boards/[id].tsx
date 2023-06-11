/* eslint-disable function-paren-newline */
/* eslint-disable implicit-arrow-linebreak */
import React, { useEffect, useState, createContext, useMemo } from 'react';
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
import CreateChartFlow from '@/lib/components/CreateChartFlow/CreateChartFlow';
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

// Creating an interface for the context that will be used to open the modal
interface OpenModalContextValue {
  isDataSourcesModalOpen: boolean;
  setIsDataSourcesModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

// Creating the context
const OpenDataSourcesModalContext = createContext<OpenModalContextValue | undefined>(undefined);

// Creating a hook to use the context
export const useOpenDataSourcesModalContext = () => {
  const openDataSourcesModalContext = React.useContext(OpenDataSourcesModalContext);
  if (openDataSourcesModalContext === undefined) {
    throw new Error('useOnboardingContext must be inside a OpenDataSourcesModalProvider');
  }
  return openDataSourcesModalContext;
};

function Board() {
  // Creating the provider
  const [isDataSourcesModalOpen, setIsDataSourcesModalOpen] = useState(false);
  // Refactoring the previous line to use the hook useMemo
  const openDataSourcesModalContext = useMemo(() => ({
    isDataSourcesModalOpen,
    setIsDataSourcesModalOpen,
  }), [isDataSourcesModalOpen, setIsDataSourcesModalOpen]);
  const params = useRouter().query;
  const [openChartTypeMenu, setOpenChartTypeMenu] = useState(false);
  const [createChartFlow, setCreateChartFlow] = useState<{
    isOpen: boolean;
    type: ChartType;
  }>({
    isOpen: false,
    type: 'bar',
  });
  const [layouts, setLayouts] = useState<{ [index: string]: Layout[] }>();
  const { mutateAsync: addChart } = trpc.charts.addChart.useMutation();
  const router = useRouter();

  const { data: widgetArrayRes, refetch: refetchWidgetArray } = trpc.charts.getCharts.useQuery({
    boardId: params.id as string,
  });
  const [widgetArray, setWidgetArray] = useState<ChartModel[]>([]);

  useEffect(() => {
    if (widgetArrayRes) {
      setWidgetArray(widgetArrayRes.charts);
    }
  }, [widgetArrayRes]);

  const { mutate: deleteChart } = trpc.charts.deleteChart.useMutation({
    onSuccess: (res) => {
      setWidgetArray(
        widgetArray.filter((widget) => widget.id !== res.chart.id),
      );
    },
  });

  const { mutate: updateChart } = trpc.charts.updateChart.useMutation({});

  const toggleChartTypeMenu = () => {
    setOpenChartTypeMenu((prevState) => !prevState);
  };

  const closeChartTypeMenu = () => {
    setOpenChartTypeMenu(false);
  };

  const handleRemoveChart = (id: string) => {
    deleteChart({ chartId: id });
  };

  const boardId = router.query.id as string;

  if (!router.isReady) return <div>Loading...</div>;

  return (
    <OpenDataSourcesModalContext.Provider value={openDataSourcesModalContext}>
      <Container>
        <DataSourcesMenuModal
          boardId={boardId}
          isOpen={isDataSourcesModalOpen}
          onClose={() => setIsDataSourcesModalOpen(false)}
        />
        <CreateChartFlow
          isOpen={createChartFlow.isOpen}
          onClose={() => setCreateChartFlow({ isOpen: false, type: 'bar' })}
          chartType={createChartFlow.type}
          boardId={boardId}
          onCreate={async (chartToCreate) => {
            try {
              const yIndex = Math.floor(widgetArray.length / cols.lg) * 3;
              await addChart({
                x: (widgetArray.length * 2) % cols.lg,
                y: yIndex,
                width: 2,
                height: 3,
                data_source_id: chartToCreate.dataSourceId,
                boardId: chartToCreate.boardId,
                columnSettings: chartToCreate.columnSettings,
                title: chartToCreate.title,
                type: chartToCreate.type,
              });
              refetchWidgetArray();
            } catch (e) {
              console.log('Handle error here!');
            }
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
            {widgetArray.map((widget) =>
              getGridChartItem({
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
              }),
            )}
          </ResponsiveReactGridLayout>
        </div>

        {openChartTypeMenu && (
          <ChartTypeMenuContainer>
            <ChartTypeMenu
              onSelect={(type: ChartType) => {
                setCreateChartFlow({ isOpen: true, type });
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
            onClick={() => setIsDataSourcesModalOpen(true)}
            style={{ marginTop: '10px' }}
          />
        </AddButtonContainer>
      </Container>
    </OpenDataSourcesModalContext.Provider>
  );
}

const BoardPage: NextPageWithLayout = Board;

BoardPage.getLayout = (page) => <TopLayout>{page}</TopLayout>;
export default BoardPage;
