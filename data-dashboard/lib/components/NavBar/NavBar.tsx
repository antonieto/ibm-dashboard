import styled from 'styled-components';

const Container = styled.nav`
  height: 48px;
  background-color: #161616;
`;

const Logo = styled.h2`
  color: #FFF;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  font-size: 14px;
  font-weight: normal;
  padding-left: 16px;
  padding-top: 14px;
`;

const NavBar = () => {
  return (
    <Container>
      <Logo>IBM <b>Insight Hub</b></Logo>
    </Container>
  );
};

export default NavBar;