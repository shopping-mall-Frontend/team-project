import React from 'react';
import styled from 'styled-components';

const Step = (props) => {
  return (
    <StepEl>
      <li style={props.style === 'step1' ? liStyle : null}>01 SHOPPING BAG</li>
      <li style={props.style === 'step2' ? liStyle : null}>02 ORDER</li>
      <li style={props.style === 'step3' ? liStyle : null}>03 ORDER CONFIRMED</li>
    </StepEl>
  );
};

const liStyle = {
  color : '#000',
  fontWeight:'600',
}

const StepEl = styled.ul`
  display: flex;
  justify-content: center;
  gap: 10px;

  width: fit-content;
  margin: 0 auto;
  padding: 50px;
  color: rgb(181, 176, 176);

  li {
    font-size:1.2rem;
  }

  li + li::before {
    content: '<';
    margin-right: 10px;
  }
`;

export default Step;
