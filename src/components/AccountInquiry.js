import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import styled from 'styled-components'
import { delAccount, getAccount, auth } from '../utils/useAPI';
import Loading from './Loading';

const AccountInquiry = () => {
  const { register, handleSubmit, reset } = useForm();
  // 로딩
  const [loading, setLoading] = useState(false);

  const [accounts, setAccounts] = useState([]);
  const [selectBank, setSelectBank] = useState('');
  const [totalBalance, setTotalBalance] = useState(0);
  const [disconnect, setDisconnect] = useState(false);
  const [user, setUser] = useState([]);

  useEffect(() => {
    getAccounInfo()
    getUser()
  }, []);

  const getUser = async () => {
    const userInfo = await auth()

    setUser(userInfo)
  }

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

    setLoading(true)
    let res = await delAccount(body)
    
    if(typeof res !== 'string'){
      setSelectBank('')
      getAccounInfo()
      alert('해지 완료되었습니다.')
    }else{
      alert(res)
    }
    setLoading(false)
  }

  return (
    <Container>
      <div className='inquiry-title'><span>{user.displayName}</span>님의 계좌 총 잔액은 <span>${totalBalance.toLocaleString()}</span> 입니다.</div>

      <select onChange={(e) => {
        selectAccountInfo(e) 
        reset()
        }}>
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
            <div key={account.id} className='account-info-box'>
              <div><span>{user.displayName}</span>님의 <span>{account.bankName}</span> 계좌 정보입니다.</div>
              <ul>
                <li><span>계좌번호</span>: {account.accountNumber}</li>
                <li><span>잔액</span>: ${account.balance.toLocaleString()}</li>
              </ul>
              {disconnect ? (
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div>
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
                  </div>

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
        <p className='inquiry-sub-title'>상세 조회를 원하시면 은행을 선택해 주세요 <span>*목록에 은행이 없다면 계좌 등록을 먼저 진행해 주세요.</span></p>
      }
      {
        loading && <Loading />
      }
    </Container>
  )
}

const Container = styled.div`
  min-width:900px;

  .inquiry-title {
    padding: 10px 0;
    font-size: 1.1rem;

    span {
      font-weight: 600;
    }
  }

  .inquiry-sub-title {
    font-size:.8rem;
    color:#555;
    padding:10px 0;
    margin-top:15px;
  }

  select {
    width: 100%;
    height: 30px;
    border:1px solid #ddd;
    padding-left:10px;
  }

  .account-info-box {
    display:flex;
    gap:10px; 
    flex-direction:column;
    align-items:flex-start;
    margin-top:20px;

    div { 
      font-size:1rem;

      span {
        font-weight:600;
      }
    }

    ul {
      display:flex;
      flex-direction: column;
      gap:10px;
      border:1px solid #ddd;
      width:100%;
      padding:10px;

      li span {
        font-weight:600;
      }
    }

    & > button {
      font-size:.8rem;
      color:#555;
      padding:10px 0;
    }

    form {
      div {
        display:flex;
        align-items:center;

        label {
          padding:10px 0;
        }

        input {
          width:20px;
          height:20px;
          margin-left:10px;
        }
      }

      button {
        font-size:0.8rem;
        color:#555
      }
    }
  }
`;

export default AccountInquiry