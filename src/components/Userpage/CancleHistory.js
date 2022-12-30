import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { orderedProducts } from '../../utils/useAPI';

const CancleHistory = () => {
  const [ordered, setOdered] = useState([]);

  useEffect(() => {
    // 전체제품 거래내역 가져오기
    const getorderedProducts = async () => {
      const json = await orderedProducts();
      setOdered(json);
    };
    getorderedProducts();
  }, []);

  return (
    <Container>
      <ol>
        {ordered
          .filter((list) => list.isCanceled === true)
          .map((list) => (
            <li key={list.detailId} className="orderedList">
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
                <p>취소 완료</p>
              </Details>
            </li>
          ))}
      </ol>
    </Container>
  );
};

const Container = styled.div``;

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
    border: 1px solid #dfdfdf;
    border-radius: 5px;
    cursor: pointer;
  }

  .confirmtrue {
    background-color: #eaeaea;
  }

  .cancle {
    text-decoration: line-through;
  }
`;

export default CancleHistory;
