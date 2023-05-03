import { useState } from 'react';
import styled from 'styled-components';
import { Add } from '@carbon/icons-react';
import { BarChart } from '@tremor/react';

import { Responsive, WidthProvider } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

import { NavBar } from '../../lib/components';
import { MOCK_CHART_LIST } from './MOCK_CHART_LIST';
import ChartCard from '../../lib/components/ChartCard/ChartCard';
import ButtonWithIcon from '../../lib/components/ButtonWithIcon/ButtonWithIcon';

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

const chartdata = [
  {
    name: 'Amphibians',
    'Number of threatened species': 2488,
  },
  {
    name: 'Birds',
    'Number of threatened species': 1445,
  },
  {
    name: 'Crustaceans',
    'Number of threatened species': 743,
  },
];

function dataFormatter(number: number) {
  return `$ ${Intl.NumberFormat('us').format(number).toString()}`;
}

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
                minW: 2,
                maxH: Infinity,
                minH: 3,
                isDraggable: true,
                isResizable: true,
              }}
            >
              <ChartCard>
                <BarChart
                  className="mt-6"
                  data={chartdata}
                  index="name"
                  categories={['Number of threatened species']}
                  colors={['blue']}
                  valueFormatter={dataFormatter}
                  yAxisWidth={48}
                />
              </ChartCard>
            </div>
          ))}
        </ResponsiveReactGridLayout>
      </div>

      <AddButtonContainer>
        <ButtonWithIcon text="Add Widget" icon={Add} />
      </AddButtonContainer>
    </Container>
  );
}
