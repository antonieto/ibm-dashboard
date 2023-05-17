import styled from 'styled-components';
import type { ChangeEvent } from 'react';

interface TextInputProps {
  id?: string;
  name?: string;
  type: 'text' | 'password' | 'email';
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  style?: React.CSSProperties;
  length?: {
    min: number;
    max: number;
  };
  required?: boolean;
}

// Could also add pattern, disabled, autofocus, value, readOnly, etc.

const Field = styled.input`
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  font-size: 14px;
  height: 40px;
  width: 100%;
  border: 0 0 1px 0 solid #8D8D8D;
  box-sizing: border-box;
  background-color: #F4F4F4;
  font-weight: normal;
  border-radius: 0;
  padding-left: 16px;
`;

function TextInput({
  id,
  name,
  type,
  value,
  onChange,
  placeholder,
  style,
  length,
  required,
}: TextInputProps): JSX.Element {
  return (
    <Field
      id={id}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      style={style}
      minLength={length?.min}
      maxLength={length?.max}
      required={required}
    />
  );
}

export default TextInput;
