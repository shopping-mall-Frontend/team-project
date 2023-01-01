import React from 'react'
import styled from 'styled-components'

const Footer = () => {
  return (
    <FooterWrap>
      <ul>
        <li>주식회사 N4 | CEO 이미정</li>
        <li><address>서울특별시 강남구 테헤란로 231</address></li>
        <li><address>고객센터 : 080-4498-2271 (13:00AM ~ 17:00PM)</address></li>
        <li><address>E-Mail : N4@email.com</address></li>
      </ul>

      <p>COPYRIGHT ©N4</p>
    </FooterWrap>
  )
}

const FooterWrap = styled.footer`
  min-width:1200px;
  padding:80px 40px;
  position:relative;
  border-top:1px solid #ddd;

  ul {
    display:flex;
    flex-direction:column;
    gap:8px;
    font-size:.90rem;
    color:#333;
  }

  p {
    position:absolute;
    top:50%;
    left:50%;
    transform:translate(-50% , -50%);
    font-weight:600;
    font-size:1rem;
    color:#111;
  }
`

export default Footer