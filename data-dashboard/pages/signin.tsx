import { useState } from 'react';
import type { MouseEvent, ChangeEvent } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import Image from 'next/image';
import { IbmButton, TextInput, InputField } from '@/lib/components';
import trpc from '@/lib/hooks/trpc';
import TopLayout from '@/lib/components/TopLayout/TopLayout';
import { NextPageWithLayout } from './_app';

const Body = styled.main`
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

const Content = styled.section`
  margin-top: 150px;
  margin-left: 124px;
`;

const SectionHeader = styled.h1`
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  font-size: 20px;
  font-weight: normal;
  color: #161616;
  margin-bottom: 8px;
`;

const Description = styled.legend`
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  font-size: 14px;
  font-weight: normal;
  color: #161616;
`;

const Form = styled.form`
  margin-top: 56px;
`;

const InputFields = styled.div`
  display: grid;
  row-gap: 24px;
`;

const ButtonStyle = {
  width: '178px',
  height: '48px',
  marginTop: '40px',
  fontFamily: 'Verdana, Geneva, Tahoma, sans-serif',
  fontSize: '14px',
  fontWeight: 'normal',
};

const ToSingup = styled.div`
  margin-top: 40px;
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

const ImageStyle = {
  marginTop: '167px',
  justifySelf: 'end',
  marginRight: '202px',
};

function SignIn() {
  // const router = useRouter();
  const { mutate } = trpc.auth.login.useMutation({
    onError(error) {
      console.log(error);
    },
  });

  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    mutate({
      email: credentials.email,
      password: credentials.password,
    });
  };

  return (
    <div>
      <Body>
        <Content>
          <SectionHeader>Iniciar sesión</SectionHeader>
          <Description>Ingresa tus datos para iniciar sesión</Description>
          <Form>
            <InputFields>
              <InputField
                label="Correo electrónico"
                name="email"
                inputChild={TextInput}
                inputProps={{
                  type: 'email',
                  value: credentials.email,
                  onChange: handleChange,
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
                  value: credentials.password,
                  onChange: handleChange,
                  placeholder: 'e.g. S3cureP@ssworD',
                  required: true,
                  length: { min: 8, max: 24 },
                }}
              />
            </InputFields>
            <IbmButton
              text="Iniciar sesión"
              style={ButtonStyle}
              onClick={handleSubmit}
            />
          </Form>
          <ToSingup>
            <Cue>¿No tienes cuenta?</Cue>
            <Link href="/signup" style={LinkStyle}>
              Crear cuenta
            </Link>
          </ToSingup>
        </Content>
        <Image
          src="/images/signup.png"
          alt="Man and Woman"
          width={333}
          height={402}
          style={ImageStyle}
        />
      </Body>
    </div>
  );
}

const SignInPage: NextPageWithLayout = SignIn;
SignInPage.getLayout = (page) => <TopLayout>{page}</TopLayout>;

export default SignInPage;
