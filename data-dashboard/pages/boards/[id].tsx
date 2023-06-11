/* eslint-disable function-paren-newline */
/* eslint-disable implicit-arrow-linebreak */
import React, { useState } from 'react';
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
  bottom: 80px;
  left: 48px;
`;

const ChartTypeMenuContainer = styled.div`
  position: absolute;
  bottom: 186px;
  left: 48px;
`;

const FAB = styled.button`
  position: absolute;
  bottom: 20px;
  left: 20px;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background-color: #0f62fe;
  border: none;
  cursor: pointer;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: #0540d0;
  }

  &:active {
    background-color: #002d9c;
  }

  &.ShowCancel {
    transition: all 0.2s ease-in-out;
    transform: rotate(45deg);
  }

  display: flex;
  align-items: center;
  justify-content: center;
`;

type GridElementProps = {
  id: string;
  xIndex: number;
  yIndex: number;
  width: number;
  height: number;
};

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
  const [createChartFlow, setCreateChartFlow] = useState<{
    isOpen: boolean;
    type: ChartType;
  }>({
    isOpen: false,
    type: 'bar',
  });

  const { data: widgetArrayRes, refetch: refetchWidgetArray } =
    trpc.charts.getCharts.useQuery({
      boardId: params.id as string,
    });
  const { mutateAsync: addChart } = trpc.charts.addChart.useMutation({
    onSuccess: () => refetchWidgetArray(),
  });
  const { mutate: deleteChart } = trpc.charts.deleteChart.useMutation({
    onSuccess: () => refetchWidgetArray(),
  });
  const { mutate: updateChart } = trpc.charts.updateChart.useMutation();
  const [showAddMenu, setShowAddMenu] = useState(false);

  const toggleAddMenu = () => {
    setShowAddMenu(!showAddMenu);
  };

  const [layouts, setLayouts] = useState<{ [index: string]: Layout[] }>();

  const router = useRouter();
  const toggleChartTypeMenu = () => {
    setOpenChartTypeMenu(!openChartTypeMenu);
  };

  const closeChartTypeMenu = () => {
    setOpenChartTypeMenu(false);
  };

  const handleShowDataSources = () => {
    setIsDataSourcesModalOpen(true);
  };

  const handleRemoveChart = (id: string) => {
    deleteChart({ chartId: id });
  };

  const boardId = router.query.id as string;

  if (!router.isReady || !widgetArrayRes) return <div>Loading...</div>;

  return (
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
            const yIndex = Math.floor(widgetArrayRes.length / cols.lg) * 3;
            await addChart({
              x: (widgetArrayRes.length * 2) % cols.lg,
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

            widgetArrayRes.forEach((widget) => {
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
          {widgetArrayRes.map((widget) =>
            getGridChartItem({
              chartProps: {
                data: widget.data,
                id: widget.id,
                removeChart: handleRemoveChart,
                settings: {
                  categories: widget.categories,
                  colors: ['blue'],
                  index: widget.index,
                  twClassName: 'mx-4',
                  type: widget.type,
                  yAxisWidth: widget.width,
                },
                title: widget.title,
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

      {showAddMenu && (
        <AddButtonContainer>
          <ButtonWithIcon
            text="Agregar grafica"
            icon={Add}
            onClick={toggleChartTypeMenu}
            style={{ width: '100%' }}
          />
          <ButtonWithIcon
            text="Data sources"
            icon={DataVolume}
            onClick={handleShowDataSources}
            style={{ marginTop: '10px', width: '100%' }}
          />
        </AddButtonContainer>
      )}

      <FAB onClick={toggleAddMenu} className={showAddMenu ? 'ShowCancel' : ''}>
        <Add aria-label="add" size={24} color="#FFFFFF" />
      </FAB>
    </Container>
  );
}

const BoardPage: NextPageWithLayout = Board;

BoardPage.getLayout = (page) => <TopLayout>{page}</TopLayout>;
export default BoardPage;
