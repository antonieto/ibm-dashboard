import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  height: fit-content;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const FieldLabel = styled.label`
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  font-size: 12px;
  font-weight: normal;
`;

const DropDownContainer = styled.select`
  cursor: pointer;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  font-family: Verdana, Geneva, Tahoma, sans-serif;
  font-size: 12px;
  font-weight: normal;

  border: 1px solid #d2d3d2;
  border-radius: 3px;

  padding: 10px;

  padding-right: 20px;

  gap: 10px;

  color: #4d4d4d;
  background-color: #efefef;
  &:hover {
    background-color: #e1e1e1;
  }

  &:active {
    background-color: #cbcbcb;
  }

  position: relative;
`;

const Option = styled.option`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

interface Props {
  title: string;
  options: string[];
  onSelect: (option: number) => void;
}

export default function DropdownInput({
  title,
  options,
  onSelect,
}: Props): JSX.Element {
  return (
    <Container>
      <FieldLabel htmlFor={title}>{title}</FieldLabel>
      <DropDownContainer>
        {options.map((option, index) => (
          <Option
            key={option}
            value={option}
            onClick={() => {
              onSelect(index);
            }}
          >
            {option}
          </Option>
        ))}
      </DropDownContainer>
    </Container>
  );
}
