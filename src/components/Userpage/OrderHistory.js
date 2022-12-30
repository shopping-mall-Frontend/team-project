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
            <Title>
              <h4>{list.timePaid}</h4>
              <span>주문내역 상세보기 ></span>
            </Title>
            <Details>
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
              <CancleOk>
                <button>거래확정</button>
                <button>취소</button>
              </CancleOk>
            </Details>
          </li>
        ))}
      </ol>
    </Container>
  );
};

const Container = styled.div`
  padding-top: 30px;
  li + li {
    margin-top: 30px;
  }
`;

const Title = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 20px;
  border-bottom: 1px solid #dfdfdf;
`;

const Details = styled.div`
  display: flex;
  justify-content: space-between;
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

const CancleOk = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
  button {
    padding: 0 30px;
    height: 40px;
    border: 1px solid #000;
    border-radius: 5px;
    cursor: pointer;
  }
`;

export default OrderHistory;
