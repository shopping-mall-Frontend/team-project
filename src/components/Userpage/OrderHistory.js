import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import reset from '../../css/reset-css.css';
import styled from 'styled-components';
import { transaction } from '../../utils/useAPI';

const OrderHistory = () => {
  const [history, setHistory] = useState([]);
  useEffect(() => {
    const getTransaction = async () => {
      const json = await transaction();
      setHistory(json);
    };
    getTransaction();
  }, []);
  console.log(history);
  return (
    <Container>
      <ol>
        {history.map((list) => (
          <li key={list.detailId}>
            <div>{list.timePaid}</div>
            <ProductInfo>
              <Link to={`/product/${list.product.productId}`}>
                <img src={list.product.thumbnail} alt={`${list.product.title} 썸네일`} />
              </Link>
              <div>
                <dl>
                  <dt>상품명</dt>
                  <dd>
                    [{list.product.tags[0]}]{list.product.title}
                  </dd>
                </dl>
                <dl>
                  <dt>주문번호</dt>
                  <dd>{list.detailId}</dd>
                </dl>
                <dl>
                  <dt>결제금액</dt>
                  <dd>${list.product.price.toLocaleString()}</dd>
                </dl>
              </div>
            </ProductInfo>
          </li>
        ))}
      </ol>
    </Container>
  );
};

const Container = styled.div`
  li + li {
    margin-top: 30px;
    border-top: 1px solid #000;
  }
`;

const ProductInfo = styled.div`
  display: flex;
  gap: 30px;
  margin-top: 30px;

  img {
    width: 60px;
    height: 70px;
  }

  dl {
    display: flex;
    gap: 20px;
  }

  dt {
    font-weight: 700;
  }
`;

export default OrderHistory;
