import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import reset from '../../css/reset-css.css';
import styled from 'styled-components';
import { orderedProducts, confirmProduct, refundProduct } from '../../utils/useAPI';

const OrderHistory = () => {
  const [ordered, setOdered] = useState([]);

  useEffect(() => {
    // 전체제품 거래내역 가져오기
    const getorderedProducts = async () => {
      const json = await orderedProducts();
      setOdered(json);
    };
    getorderedProducts();
  }, []);

  // 거래 확정
  const orderConfirm = async (detailId) => {
    let body = JSON.stringify({
      detailId: detailId,
    });
    const json = await confirmProduct(body);
    return json;
  };

  const handelOrderConfirm = (detailId) => {
    orderConfirm(detailId);
  };

  // 거래 취소
  const orderCancle = async (detailId) => {
    let body = JSON.stringify({
      detailId: detailId,
    });
    const json = await refundProduct(body);
    return json;
  };

  const handelOrderCancle = (detailId) => {
    orderCancle(detailId);
  };

  const ddEl = document.querySelectorAll('dd');

  return (
    <Container>
      <ol>
        {ordered.map((list) => (
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
              <CancleOk>
                {list.done === false && list.isCanceled === false ? (
                  <>
                    <button type="button" onClick={() => handelOrderConfirm(list.detailId)}>
                      구매 확정
                    </button>
                    <button type="button" onClick={() => handelOrderCancle(list.detailId)}>
                      구매 취소
                    </button>
                  </>
                ) : list.done ? (
                  <>
                    <button type="button" className="confirmtrue">
                      배송완료
                    </button>
                  </>
                ) : list.isCanceled ? (
                  <>
                    <button type="button" className="confirmtrue">
                      취소완료
                    </button>
                  </>
                ) : (
                  ''
                )}
              </CancleOk>
            </Details>
          </li>
        ))}
      </ol>
    </Container>
  );
};

const Container = styled.div`
  min-width: 900px;
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

export { OrderHistory };
