import { useState } from 'react';
import styled from 'styled-components';

import { Responsive, WidthProvider } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

import { NavBar } from '../../lib/components';
import { MOCK_CHART_LIST } from './MOCK_CHART_LIST';
import ChartCard from '../../lib/components/ChartCard/ChartCard';

const ResponsiveReactGridLayout = WidthProvider(Responsive);
const breakpoints = {
  lg: 1200,
  md: 996,
  sm: 768,
  xs: 480,
  xxs: 0,
};

const cols = {
  lg: 8,
  md: 8,
  sm: 4,
  xs: 2,
  xxs: 2,
};

const margin: [number, number] | { [P: string]: [number, number] } = {
  lg: [20, 20],
  md: [20, 20],
  sm: [20, 20],
  xs: [20, 20],
  xxs: [20, 20],
};

const Container = styled.div`
  background-color: #f4f5f5;
  height: 100vh;
`;

export default function Board(): JSX.Element {
  // const router = useRouter();
  // const { id } = router.query;

  const [layouts, setLayouts] = useState<{ [index: string]: any[] }>();

  const widgetArray = MOCK_CHART_LIST;

  const onLayoutChange = (layout: any, layouts_: any) => {
    setLayouts({ ...layouts_ });
  };

  return (
    <Container>
      <NavBar />
      <div>
        <ResponsiveReactGridLayout
          style={{ background: '#F4F5F5' }}
          layouts={layouts}
          preventCollision={false}
          onLayoutChange={onLayoutChange}
          verticalCompact
          autoSize
          breakpoints={breakpoints}
          cols={cols}
          margin={margin}
        >
          {widgetArray.map((widget) => (
            <div
              className="reactGridItem"
              key={widget.i}
              data-grid={{
                x: widget?.x,
                y: widget?.y,
                w: widget?.w,
                h: widget?.h,
                i: widget.i,
                maxW: Infinity,
                maxH: Infinity,
                isDraggable: true,
                isResizable: true,
              }}
            >
              <ChartCard>{widget.i}</ChartCard>
            </div>
          ))}
        </ResponsiveReactGridLayout>
      </div>
    </Container>
  );
}
