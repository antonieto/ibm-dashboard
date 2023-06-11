import styled from 'styled-components';
import { useRouter } from 'next/router';
import trpc from '@/lib/hooks/trpc';

const Container = styled.nav`
  height: 48px;
  background-color: #161616;
  display: flex;
  justify-content: space-between;
`;

const Logo = styled.h2`
  color: #FFF;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  font-size: 14px;
  font-weight: normal;
  padding-left: 16px;
  padding-top: 14px;
  `;

const Logout = styled.button`
  color: #FFF;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  font-size: 14px;
  font-weight: normal;
  padding-right: 16px;
  padding-top: 14px;

`;

function NavBar(): JSX.Element {
  const router = useRouter();
  const { mutate } = trpc.auth.logout.useMutation({
    onSuccess: () => {
      router.replace('/');
    },
  });
  const handleClick = () => {
    mutate();
  };
  return (
    <Container>
      <Logo>
        IBM
        <b>Insight Hub</b>
      </Logo>
      <Logout type="button" onClick={handleClick}>Log out</Logout>
    </Container>
  );
}

export default NavBar;
