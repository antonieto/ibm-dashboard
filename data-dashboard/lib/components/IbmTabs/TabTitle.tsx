import styled from 'styled-components';

interface Props {
  title: string;
  index: number;
  setSelectedTab: (index: number) => void;
  selectedTab: number;
}

interface TabTitleBadgeProps {
  isSelected: boolean;
}

const TabTitleBadge = styled.button<TabTitleBadgeProps>`
  background-color: #fff;
  width: 100%;
  border-bottom: ${(props) => (props.isSelected ? '2px solid #0F62FE' : '2px solid #8D8D8D')};
  margin: 0 1px;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 1rem;
`;

export default function TabTitle({
  title,
  setSelectedTab,
  selectedTab,
  index,
}: Props) {
  return (
    <TabTitleBadge isSelected={selectedTab === index} type="button" onClick={() => setSelectedTab(index)}>
      {title}
    </TabTitleBadge>
  );
}
