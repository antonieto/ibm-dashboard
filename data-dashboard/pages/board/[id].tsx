import React, { useState } from 'react';
import styled from 'styled-components';
import { Add } from '@carbon/icons-react';

import { Responsive, WidthProvider } from 'react-grid-layout';
import type { Layout } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

import TopLayout from '@/lib/components/TopLayout/TopLayout';
import { NavBar } from '../../lib/components';
import ButtonWithIcon from '../../lib/components/ButtonWithIcon/ButtonWithIcon';
import { MOCK_CHART_LIST } from '../../lib/components/BoardList/MOCK_CHART_LIST';
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

type DataGridProps = {
  id: string;
  xIndex: number;
  yIndex: number;
  width: number;
  height: number;
};

function Board() {
  // const router = useRouter();
  // const { id } = router.query;

  const [layouts, setLayouts] = useState<{ [index: string]: Layout[] }>();

  const widgetArray = MOCK_CHART_LIST;

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

  return (
    <Container>
      <NavBar />
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
          {widgetArray.map((widget) => getComponent(widget))}
        </ResponsiveReactGridLayout>
      </div>

      <AddButtonContainer>
        <ButtonWithIcon text="Add Widget" icon={Add} />
      </AddButtonContainer>
    </Container>
  );
}

const BoardPage: NextPageWithLayout = Board;

BoardPage.getLayout = (page) => (
  <TopLayout>
    {page}
  </TopLayout>
);
export default BoardPage;
