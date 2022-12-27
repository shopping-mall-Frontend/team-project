import React, { useState } from 'react'
import styled from 'styled-components';

export const AddAccount = () => {
  const [bankCode, setBankCode] = useState(0);

  const selectChangeHandler = (e) => {
    setBankCode(e.target.value)

    return
  }

  const bankNumInput = (bankCode) => { 
    switch(bankCode){
      case '004' :
        return (
          <>
            <input type='numver' max={999}/>
            <input type='numver' max={99}/>
            <input type='numver' max={9999}/>
            <input type='numver' max={999}/>
          </>
        )
      case '008' :
        return (
          <>
            <input type='numver' max={999}/>
            <input type='numver' max={999}/>
            <input type='numver' max={999999}/>
          </>
        )
      case '020' :
        return (
          <>
            <input type='numver' max={9999}/>
            <input type='numver' max={999}/>
            <input type='numver' max={999999}/>
          </>
        )
      case '081' :
        return (
          <>
            <input type='numver' max={999}/>
            <input type='numver' max={999999}/>
            <input type='numver' max={99999}/>
          </>
        )
        case '089' :
          return (
            <>
              <input type='numver' max={999}/>
              <input type='numver' max={999}/>
              <input type='numver' max={999999}/>
            </>
          )
      case '090' :
        return (
          <>
            <input type='numver' max={9999}/>
            <input type='numver' max={99}/>
            <input type='numver' max={9999999}/>
          </>
        )
      case '011' :
        return (
          <>
            <input type='numver' max={999}/>
            <input type='numver' max={9999}/>
            <input type='numver' max={9999}/>
            <input type='numver' max={99}/>
          </>
        )
      default : 
        return <p>은행을 선택해주세요</p>
    }
  }

  return (
    <div>
      <p>선택 가능한 계좌가 없습니다. 계좌를 등록하세요.</p>
      <BankForm>
        <select className='bank-selector' onChange={bankNumInput}>
          <option value="000" key="0">은행 선택</option>
          <option value="004" key="1">KB국민은행</option>
          <option value="088" key="2">신한은행</option>
          <option value="020" key="3">우리은행</option>
          <option value="081" key="4">하나은행</option>
          <option value="089" key="5">케이뱅크</option>
          <option value="090" key="6">카카오뱅크</option>
          <option value="011" key="7">NH농협은행</option>
        </select>

        {bankNumInput(bankCode)}

      </BankForm>
    </div>
  )
}

const BankForm = styled.form`

  input[type="number"]::-webkit-outer-spin-button,
  input[type="number"]::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
  }
`