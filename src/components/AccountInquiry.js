import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import styled from 'styled-components'
import { delAccount, getAccount } from '../utils/useAPI';

const AccountInquiry = () => {
  const { register, handleSubmit } = useForm();

  const [accounts, setAccounts] = useState([]);
  const [selectBank, setSelectBank] = useState('');
  const [totalBalance, setTotalBalance] = useState(0);
  const [disconnect, setDisconnect] = useState(false);

  useEffect(() => {
    getAccounInfo()
  }, []);

  const getAccounInfo = async () => {
    const accountData = await getAccount();

    setAccounts(accountData.accounts);
    setTotalBalance(accountData.totalBalance)
  }

  const selectAccountInfo = (e) => {
    let code = e.target.value;
    let select = ''
    if(code !== '') {
      select = accounts.filter(e => e.bankCode === code)
    }
    setDisconnect(false)
    setSelectBank(select)
  }

  const onSubmit = async (data) => {
    let body = JSON.stringify({
      accountId : selectBank[0].id,
      signature : data.signature
    })

    let res = await delAccount(body)
    
    if(typeof res !== 'string'){
      setSelectBank('')
      getAccounInfo()
      alert('해지 완료되었습니다.')
    }else{
      alert(res)
    }
  }

  return (
    <Container>
      <p>username님의 계좌 총 잔액은 ${totalBalance.toLocaleString()} 입니다.</p>

      <select onChange={(e) => {selectAccountInfo(e)}}>
        <option value="" key="000">은행 선택</option>
        {
          accounts.map(account => {
            return (
              <option value={account.bankCode} key={account.bankCode}>{account.bankName}</option>
            )
          })
        }
      </select>

      {
        selectBank !== ''?
        selectBank.map(account => {
          return (
            // user name 부분 user 정보 props 받아 처리 예정
            <div key={account.id}>
              <p>user name님의 {account.bankName} 계좌 정보입니다.</p>
              <ul>
                <li>계좌번호:{account.accountNumber}</li>
                <li>잔액: $ {account.balance.toLocaleString()}</li>
              </ul>
              {disconnect ? (
                <form onSubmit={handleSubmit(onSubmit)}>
                  <label htmlFor="check">정말 계좌를 해제 하시겠습니까?</label>
                  <input 
                    {...register("signature")}
                    type="checkbox"
                    name="signature"
                    id="check"
                    onClick={(e) => {
                      return (e.target.value = e.target.checked);
                    }}
                  />

                  <button type='submit'>계좌 해제</button>
                </form>
              ) : (
                <button
                  onClick={() => {
                    setDisconnect(true);
                  }}
                >
                  계좌 해제
                </button>
              )}
            </div>
          );
        })
        : 
        <p>상세 조회를 원하시면 은행을 선택해 주세요 <span>*목록에 은행이 없다면 계좌 등록을 먼저 진행해 주세요.</span></p>
      }
      
    </Container>
  )
}

const Container = styled.div `

`

export default AccountInquiry