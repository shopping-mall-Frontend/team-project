import React from 'react'
import styled from 'styled-components'

const Loading = ({title='잠시만 기다려 주세요..'}) => {
  return (
    <Container>
      <div><p>{title}</p></div>
    </Container>
  )
}
export default Loading

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: rgba(255, 255, 255, 0.5);
  position:fixed;
  top:0;
  left:0;
  z-index:9999;

  div {
    width: 500px;
    height: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
    position:absolute;
    top:50%;
    left:50%;
    transform:translate(-50%, -50%);
    border:1px solid #555;
    background:#fff;

    p {
      font-size:1.2rem;
      color:#555;
    }
  }
`; 