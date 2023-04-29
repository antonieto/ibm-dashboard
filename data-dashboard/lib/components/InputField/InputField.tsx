// This component can be used to wrap any input component and add a label to it while vinculating them together.
// In should accept different input components, not just TextInput, but there aren't any other input components yet,
// please add them here if you create them.


import styled from 'styled-components';
import { TextInput } from '..';
import { TextInputProps } from '../TextInput/TextInput';

interface InputFieldProps {
  label: string;
  name?: string;
  inputChild: typeof TextInput;
  inputProps: TextInputProps;
}

const Field = styled.div`
  display: grid;
  row-gap: 8px;
  width: 288px;
`;

const FieldLabel = styled.label`
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  font-size: 12px;
  font-weight: normal;
`;

const InputField = ({ label, name, inputChild: InputChild, inputProps }: InputFieldProps) => {
  return (
    <Field>
      <FieldLabel htmlFor={name}>{label}</FieldLabel>
      <InputChild name={name} id={name} {...inputProps}/>
    </Field>
  );
};

export default InputField;