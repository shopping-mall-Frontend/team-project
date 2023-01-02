import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { getAccount, accountAdd } from "../utils/useAPI";
import Loading from "./Loading";

export const AddAccount = ({setCheckAcc}) => {
  const { register, handleSubmit, reset } = useForm();
  // 로딩
  const [loading, setLoading] = useState(false);
  
  // 은행 코드, 선택 가능 은행 조회
  const [bankCode, setBankCode] = useState('0');
  const [selectBank, setSelectBank] = useState([]);
  const allBank = []

  const bankNumInput = async () => {
    const selectBank = await getAccount("banks");
    
    setSelectBank(selectBank.filter(e => {return e.disabled === false}));
    allBank.push(selectBank)
  };

  useEffect(() => {
    bankNumInput();
  }, []);

  // 계좌 등록
  const onSubmit = async (data) => {
    let body = JSON.stringify({
      bankCode: data.bankCode,
      accountNumber: data.accountNumber0 + data.accountNumber1 + data.accountNumber2 + (data.accountNumber3 ? data.accountNumber3 : ''),
      phoneNumber: data.phoneNumber,
      signature: data.signature,
    });
    
    setLoading(true)
    let res = await accountAdd(body)

    if(typeof res !== 'string'){
      setBankCode('0')
      bankNumInput()
      alert('계좌 등록이 완료되었습니다.')
      data = ''
      setCheckAcc(true)
    }else{
      alert(res)
    }
    reset()
    setLoading(false)
  };

  // 은행 선택
  const selectChangeHandler = (e) => {
    setBankCode(e.target.value);

    return;
  };

  // maxlenth check
  const maxLengthChk = (object) => {
    if (object.target.value.length > object.target.maxLength) {
      object.target.value = object.target.value.slice(0, object.target.maxLength);
    }
  };

  return (
    <>
      <BankForm onSubmit={handleSubmit(onSubmit)}>
        <select
          {...register("bankCode")}
          className="bank-selector"
          onChange={(e) => {selectChangeHandler(e)}}
        >
          <option value={0} key="99" onClick={() => {setBankCode(0)}}>
            은행 선택
          </option>
          {selectBank.map((item, index) => {
            return (
              <option value={item.code} key={index}>
                {item.name}
              </option>
            );
          })}
        </select>

        {bankCode === '0' ? (
          <p className="select-text">은행을 선택해 주세요 * 목록에 은행이 보이지 않는다면 전부 등록된 상태입니다.</p>
        ) : (
          <>
            <div className="bank-code-wrap">
              {selectBank.map((item, index) => {
                let input = [];
                if (item.code === bankCode) {
                  for (let i = 0; i < item.digits.length; i++) {
                    input.push(
                      <input
                        {...register(`accountNumber${i}`)}
                        type="number"
                        onInput={(e) => {
                          maxLengthChk(e);
                        }}
                        maxLength={item.digits[i]}
                        key={index++}
                        style={{'width':(100 / item.digits.length)+'%'}}
                        className='number-input'
                      />
                    );
                  }
                }
                return [...input];
              })}
            </div>

            <div>
              <label htmlFor="phoneNumber">휴대폰 번호</label>
              <input
                {...register("phoneNumber")}
                name="phoneNumber"
                type="number"
                onInput={(e) => {
                  maxLengthChk(e);
                }}
                maxLength={11}
                className='number-input'
              />
            </div>

            <div>
              <label htmlFor="signature">약관 동의</label>
              <input
                {...register("signature")}
                type="checkbox"
                name="signature"
                onClick={(e) => {
                  return (e.target.value = e.target.checked);
                }}
              />
            </div>

            <button type="submit">
              계좌 등록
            </button>
          </>
        )}
      </BankForm>
      {
        loading && <Loading />
      }
    </>
  );
};

const BankForm = styled.form`
  display:flex;
  flex-direction:column;
  align-items:flex-start;
  gap:10px;
  width:100% ;

  div {
    display:flex;
    align-items:center;
    width:100%;
  }
  
  select {
    border: 1px solid #ddd;
    width:100%;
    height:30px;
  }

  .select-text {
    display:block;
    padding:10px 0;
    font-size:0.8rem;
    color:#777;
  }

  .bank-code-wrap {
    display: flex;
    gap: 15px;
    width:100%;
  }
  input[name="phoneNumber"] {
    margin-left:10px;
  }

  input[name="signature"] {
    width:20px;
    height:20px;
    margin-left:10px;
  }

  input[type="number"] {
    border: 1px solid #ddd;
    height:30px;
    padding:0 10px
  }

  input[type="number"]::-webkit-outer-spin-button,
  input[type="number"]::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  button {
    width:100px;
    height:30px;
    background-color:#ddd !important; 
    font-size:.9rem;
    cursor: pointer;
  }
`;
