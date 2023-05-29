import { useState } from 'react';
import styled from 'styled-components';
import TabTitle from './TabTitle';

interface Props {
  children: React.ReactElement[];
}

const TabTitles = styled.ul`
  display: flex;
  justify-content: space-between;
  list-style: none;
  padding: 0;
  margin: 0;
`;

export default function IbmTabs({ children }: Props) {
  const [selectedTab, setSelectedTab] = useState<number>(0);
  return (
    <div>
      <TabTitles>
        {children.map((child, index) => (
          <TabTitle
            // @eslint-disable-next-line
            key={child.props.title}
            title={child.props.title}
            setSelectedTab={setSelectedTab}
            selectedTab={selectedTab}
            index={index}
          />
        ))}
      </TabTitles>
      {children[selectedTab]}
    </div>
  );
}
