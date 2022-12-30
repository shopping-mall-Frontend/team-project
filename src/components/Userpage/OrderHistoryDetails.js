import React, { useEffect, useState } from 'react';
import reset from '../../css/reset-css.css';
import styled from 'styled-components';
import { transactionDetails } from '../../utils/useAPI';

const OrderHistory = () => {
  const [list, setList] = useState();
  useEffect(() => {
    const getTransaction = async () => {
      const json = await transactionDetails();
      setList(json);
    };
    getTransaction();
  }, []);
  console.log(list);
  return (
    <Container>
      나의 주문내역 컴포넌트
      <div>{list}</div>
    </Container>
  );
};

const Container = styled.div``;

export default OrderHistory;
