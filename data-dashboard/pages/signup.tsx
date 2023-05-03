import styled from 'styled-components';
import Link from 'next/link';
import {
  IbmButton,
  NavBar,
  TextInput,
  InputField,
} from '@/lib/components';

const Body = styled.main`
  display: flex;
  justify-content: center;
`;

const Content = styled.section`
  margin-top: 92px;
  display: inline-block;
  width: auto;
  height: auto;
`;

const SectionHeader = styled.h1`
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  font-size: 20px;
  font-weight: normal;
  color: #161616;
  margin-bottom: 8px;
  display: inline-block;
`;

const Description = styled.legend`
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  font-size: 14px;
  font-weight: normal;
  color: #161616;
`;

const Form = styled.form`
  display: inline-block;
  margin-top: 56px;
  width: auto;
`;

const InputFields = styled.div`
  display: inline-grid;
  grid-template-rows: auto auto auto;
  grid-auto-flow: column;
  column-gap: 40px;
  row-gap: 24px;
  width: auto;
`;

const ButtonStyle = {
  width: '178px',
  height: '48px',
  marginTop: '40px',
  fontFamily: 'Verdana, Geneva, Tahoma, sans-serif',
  fontSize: '14px',
  fontWeight: 'normal',
};

const ToSingin = styled.div`
  margin-top: 40px;
  width: auto;
  display: block;
`;

const Cue = styled.span`
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  font-size: 14px;
  font-weight: normal;
  color: #393939;
`;

const LinkStyle = {
  marginLeft: '44px',
  fontFamily: 'Verdana, Geneva, Tahoma, sans-serif',
  color: '#0F62FE',
  fontSize: '14px',
  fontWeight: 'normal',
};

function SignUp() {
  return (
    <div>
      <NavBar />
      <Body>
        <Content>
          <SectionHeader>Crear cuenta</SectionHeader>
          <Description>Ingresa tus datos para crear una cuenta</Description>
          <Form>
            <InputFields>
              <InputField
                label="Correo electrónico"
                name="email"
                inputChild={TextInput}
                inputProps={{
                  type: 'email',
                  placeholder: 'e.g. correo@gmail.com',
                  required: true,
                }}
              />
              <InputField
                label="Contraseña"
                name="password"
                inputChild={TextInput}
                inputProps={{
                  type: 'password',
                  placeholder: 'e.g. S3cureP@ssworD',
                  required: true,
                  length: { min: 8, max: 24 },
                }}
              />
              <InputField
                label="Confirmar contraseña"
                name="confirmPassword"
                inputChild={TextInput}
                inputProps={{
                  type: 'password',
                  placeholder: 'e.g. S3cureP@ssworD',
                  required: true,
                  length: { min: 8, max: 24 },
                }}
              />
              <InputField
                label="Nombre"
                name="name"
                inputChild={TextInput}
                inputProps={{
                  type: 'text',
                  placeholder: 'e.g. Jane',
                  required: true,
                }}
              />
              <InputField
                label="Apellido Paterno"
                name="firstLastName"
                inputChild={TextInput}
                inputProps={{
                  type: 'text',
                  placeholder: 'e.g. Doe',
                  required: true,
                }}
              />
              <InputField
                label="Apellido Materno"
                name="secondLastName"
                inputChild={TextInput}
                inputProps={{
                  type: 'text',
                  placeholder: 'e.g. Linn',
                  required: true,
                }}
              />
            </InputFields>
            <IbmButton text="Crear cuenta" style={ButtonStyle} />
          </Form>
          <ToSingin>
            <Cue>¿Ya tienes cuenta?</Cue>
            <Link href="/signin" style={LinkStyle}>
              Ingresar
            </Link>
          </ToSingin>
        </Content>
      </Body>
    </div>
  );
}

export default SignUp;
