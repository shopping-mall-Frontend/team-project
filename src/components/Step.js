import React from 'react';
import styled from 'styled-components';

const Step = ({}) => {
  return (
    <StepEl>
      <li>01 SHOPPING BAG</li>
      <li>02 ORDER</li>
      <li>03 ORDER CONFIRMED</li>
    </StepEl>
  );
};

const StepEl = styled.ul`
  display: flex;
  justify-content: center;
  gap: 10px;

  width: fit-content;
  margin: 0 auto 70px;
  padding: 20px;
  color: rgb(181, 176, 176);

  li:first-child {
    font-weight: 700;
    color: #000;
  }

  li + li::before {
    content: '<';
    margin-right: 10px;
  }
`;

export default Step;
