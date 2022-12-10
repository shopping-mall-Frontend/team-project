import Header from '../components/Header';
import Main from '../components/Main';
import styled from 'styled-components';

const Container = styled.div``;

const MainPage = () => {
  return (
    <Container>
      <Header />
      This is Main Page
      <Main />
    </Container>
  );
};

export { MainPage };
