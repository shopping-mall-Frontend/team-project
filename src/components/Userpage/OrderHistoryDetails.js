import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import reset from '../../css/reset-css.css';
import styled from 'styled-components';
import { orderedProduct } from '../../utils/useAPI';

const OrderHistoryDetails = () => {
  const { id } = useParams();
  const [detail, setDetail] = useState();

  useEffect(() => {
    const getOrderedProduct = async (id) => {
      let body = JSON.stringify({
        detailId: id,
      });
      const json = await orderedProduct(body);
      setDetail(json);
    };
    getOrderedProduct(id);
  }, []);

  //날짜 포맷
  const dateFormat = (timePaid) => {
    const date = new Date(timePaid);
    const year = String(date.getFullYear()).slice(2);
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${year}.${month}.${day} (${hours}:${minutes})`;
  };

  return (
    <Container>
      {detail && Object.keys(detail).length !== 0 ? (
        <>
          <OrderDate>
            <dl>
              <dt>주문일자</dt>
              <dd>{dateFormat(detail.timePaid)}</dd>
            </dl>
            <dl>
              <dt>주문번호</dt>
              <dd>{detail.detailId}</dd>
            </dl>
          </OrderDate>
          <Detail>
            <h3>주문상품정보</h3>
            <Wrap>
              <ProductInfo>
                <Link to={`/product/${detail.product.productId}`}>
                  <img src={detail.product.thumbnail} alt={`${detail.product.title} 썸네일`} />
                </Link>
                <div>
                  <h4>상품정보</h4>
                  <dl>
                    <dt>상품명</dt>
                    <dd>
                      [{detail.product.tags[0]}]{detail.product.title}
                    </dd>
                  </dl>
                  <dl>
                    <dt>결제금액</dt>
                    <dd>${detail.product.price.toLocaleString()}</dd>
                  </dl>
                </div>
              </ProductInfo>
              <State>
                <h4>진행상태</h4>
                <p>
                  {!detail.done && !detail.isCanceled
                    ? '배송중'
                    : (detail.done ? '배송완료' : '') || (detail.isCanceled ? '취소완료' : '')}
                </p>
              </State>
            </Wrap>
          </Detail>

          <PaymentInfo>
            <h3>결제 정보</h3>
            <Wrap>
              <div>
                <h4>결제 수단</h4>
                <div>
                  <span>{detail.account.bankName}</span>
                  <span>{detail.account.accountNumber}</span>
                </div>
              </div>
              <div>
                <h4>결제금액</h4>
                <p>
                  <span>상품금액 ${detail.product.price.toLocaleString()}</span>
                  <span>배송비 0원</span>
                </p>
              </div>
            </Wrap>
          </PaymentInfo>
        </>
      ) : (
        ''
      )}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 60px;
  min-width: 900px;

  h3 {
    margin-bottom: 20px;
    padding-bottom: 10px;
    border-bottom: 1px solid #dfdfdf;
    font-size: 18px;
  }
`;

const OrderDate = styled.div`
  display: flex;
  gap: 30px;

  dl {
    display: flex;
    gap: 5px;
  }

  dd {
    font-weight: 700;
  }
`;

const Detail = styled.div``;

const Wrap = styled.div`
  display: flex;
  justify-content: space-between;

  h4 {
    font-weight: 700;
    margin-bottom: 20px;
    text-align: center;
  }
`;

const ProductInfo = styled.div`
  display: flex;
  gap: 20px;

  img {
    margin-top: 30px;
    width: 60px;
    height: 70px;
  }

  dl {
    display: flex;
    gap: 20px;
  }

  dl:first-child {
    dt {
      margin-right: 15px;
    }
  }

  dt {
    color: #4c4c4c;
  }
`;

const State = styled.div`
  padding-right: 50px;
  p {
    padding: 10px 30px;
    height: 40px;
    border: 1px solid #dfdfdf;
    border-radius: 5px;
  }
`;

const PaymentInfo = styled.div`
  h4 + p {
    display: flex;
    flex-direction: column;
  }
  span + span {
    margin-left: 10px;
  }
`;

export { OrderHistoryDetails };
