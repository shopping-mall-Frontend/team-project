import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const NotfoundPage = () => {
  //   const navigate = useNavigate();

  return (
    <Container>
      <p>잘못된 경로입니다.</p>
    </Container>
  );
};

const Container = styled.div``;

export { NotfoundPage };
