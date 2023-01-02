import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import reset from '../../css/reset-css.css';
import styled from 'styled-components';
import { orderedProduct } from '../../utils/useAPI';
import { declareTypeAlias } from '@babel/types';

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
          <div>
            <dl>
              <dt>주문일자</dt>
              <dd>{dateFormat(detail.timePaid)}</dd>
            </dl>
            <dl>
              <dt>주문번호</dt>
              <dd>{detail.detailId}</dd>
            </dl>
          </div>
          <ProductInfo>
            <Link to={`/product/${detail.product.productId}`}>
              <img src={detail.product.thumbnail} alt={`${detail.product.title} 썸네일`} />
            </Link>
            <div>
              <h3>상품정보</h3>
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
            <div>
              <h3>진행상태</h3>
              <div>
                {!detail.done && !detail.isCanceled
                  ? '배송중'
                  : (detail.done ? '배송완료' : '') || (detail.isCanceled ? '취소완료' : '')}
              </div>
            </div>
          </ProductInfo>
          <PaymentInfo>
            <h3>결제 정보</h3>
            <div>{detail.account.bankName}</div>
          </PaymentInfo>
        </>
      ) : (
        ''
      )}
    </Container>
  );
};

const Container = styled.div``;

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

  dl:first-child {
    dt {
      margin-right: 15px;
    }
  }

  dt {
    color: #4c4c4c;
  }
`;

const PaymentInfo = styled.div``;

export { OrderHistoryDetails };
