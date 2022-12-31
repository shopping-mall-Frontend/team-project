import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const ResultsBox = ({ products, openSearchBox }) => {
  const navigate = useNavigate();

  if (openSearchBox) {
    return (
      <Container>
        {products.slice(0, 10).map((item) => {
          return (
            <li
              key={item.id}
              onClick={() => {
                navigate(`/product/${item.id}`);
              }}
            >
              <img alt="이미지" src={item.thumbnail} />
              <p>{item.title}</p>
              <span>${item.price}</span>
            </li>
          );
        })}
      </Container>
    );
  }
};

const Container = styled.ul`
  border: 1px solid black;
  display: flex;
  flex-direction: column;
  background-color: white;
  margin-left: 30px;
  li {
    position: relative;
    width: 400px;
    cursor: pointer;
    display: flex;
    height: 50px;
    align-items: center;
    padding: 10px;
    img {
      display: block;
      height: 100%;
      padding-right: 20px;
    }
    &:hover {
      background-color: #dee2e6;
    }
    p {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      padding-right: 100px;
    }
    span {
      position: absolute;
      right: 10px;
    }
  }
`;

export default ResultsBox;
