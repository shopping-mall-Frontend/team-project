import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import reset from '../../css/reset-css.css';
import styled from 'styled-components';
import { orderedProduct } from '../../utils/useAPI';

const OrderHistoryDetails = () => {
  const { id } = useParams();
  console.log(id);
  // const [list, setList] = useState();
  // useEffect(() => {
  //   const getTransaction = async () => {
  //     const json = await orderedProduct();
  //     setList(json);
  //   };
  //   getTransaction();
  // }, []);
  // console.log(list);
  return <Container>주문상세 컴포넌트</Container>;
};

const Container = styled.div``;

export { OrderHistoryDetails };
