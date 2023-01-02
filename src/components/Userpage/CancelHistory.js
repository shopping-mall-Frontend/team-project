import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { orderedProducts } from '../../utils/useAPI';
import Loading from '../../components/Loading';

const CancelHistory = () => {
  const [loading, setLoading] = useState(true);

  const [canceled, setCanceled] = useState([]);

  useEffect(() => {
    // 전체제품 거래내역 가져오기
    const getorderedProducts = async () => {
      setLoading(true);
      const json = await orderedProducts();
      //거래일자 최신순으로 목록 정렬
      if (Array.isArray(json)) {
        let sortedData = json.sort(function (a, b) {
          return new Date(b.timePaid).getTime() - new Date(a.timePaid).getTime();
        });
        setCanceled(sortedData);
        setLoading(false);
      }
    };
    getorderedProducts();
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
      <ol>
        {canceled.length === 0 ? (
          <Blank>
            <p>You haven't placed any orders canceled yet.</p>
          </Blank>
        ) : (
          canceled
            .filter((list) => list.isCanceled === true)
            .map((list) => (
              <li key={list.detailId}>
                <Title>
                  <h4>{dateFormat(list.timePaid)}</h4>
                  <span>주문내역 상세보기 〉</span>
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
                          [{list.product.tags[0]}] {list.product.title}
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
                  <p>환불 완료</p>
                </Details>
              </li>
            ))
        )}
      </ol>
      {loading && <Loading />}
    </Container>
  );
};

const Container = styled.div`
  min-width: 900px;

  ol li + li {
    margin-top: 30px;
  }
`;

const Blank = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;

  padding: 80px 0 120px 0;
  border-bottom: 1px solid #000;

  p {
    font-size: 25px;
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
  align-items: center;

  p {
    padding: 8px 30px;
    height: 40px;
    border: 1px solid #dfdfdf;
    border-radius: 5px;
    background-color: #dfdfdf;
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

  dl:first-child {
    dt {
      margin-right: 15px;
    }
  }

  dt {
    color: #4c4c4c;
  }
`;

export { CancelHistory };
