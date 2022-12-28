import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { getAccount } from '../utils/useAPI';

const AccountInquiry = () => {
  const [accounts, setAccounts] = useState([]);
  
  useEffect(() => {
    const getAccounInfo = async () => {
      const accountData = await getAccount()

      setAccounts(accountData.accounts);
    }
    getAccounInfo()
  }, []);

  console.log(accounts)

  const selectAccountInfo = (e) => {
    let code = e.target.value;

    console.log(accounts.filter(e => e.bankCode === '004'))
  }

  return (
    <Container>
      {/* <h2>은행을 선택해주세요</h2> */}

      <select onChange={(e) => {selectAccountInfo(e)}}>
        {
          accounts.map(account => {
            return (
              <option value={account.bankCode} key={account.bankCode}>{account.bankName}</option>
            )
          })
        }
      </select>
    </Container>
  )
}

const Container = styled.div `

`

export default AccountInquiry