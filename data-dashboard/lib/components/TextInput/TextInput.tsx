import styled from 'styled-components';

export interface TextInputProps {
  id?: string;
  name?: string;
  type: 'text' | 'password' | 'email';
  placeholder?: string;
  style?: React.CSSProperties;
  length?: {
    min: number;
    max: number;
  }
  required?: boolean;
}

// Could also add pattern, disabled, autofocus, value, readOnly, etc.

const InputField = styled.input`
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

const TextInput = ({ id, name, type, placeholder, style, length, required }: TextInputProps) => {
  return (
    <InputField
      id={id}
      name={name}
      type={type}
      placeholder={placeholder}
      style={style}
      minLength={length?.min}
      maxLength={length?.max}
      required={required}
    />
  );
};

export default TextInput;