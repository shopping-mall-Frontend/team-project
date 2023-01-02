import Header from "../components/Header";
import Footer from "../components/Footer";
import { AddAccount } from "../components/AddAccount";
import React, { useEffect, useState } from "react";
import { getAccount, auth, buyProduct } from "../utils/useAPI";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Step from "../components/Step";
import PopupPostCode from "../components/PopupPostCode";
import AddressPopup from "../components/AddressPopup";
import Loading from "../components/Loading";

const OrderPage = () => {
  const navigate = useNavigate();
  let orderList = sessionStorage.getItem("order");

  const [user, setUser] = useState(false);
  // 전체 계좌 잔액, 리스트 확인
  const [allBankList, setAllBankList] = useState([]);
  // 선택 가능 은행 리스트
  const [holdBankList, setHoldBankList] = useState([]);
  // 구매 제품 목록
  const [cart, setCart] = useState(JSON.parse(orderList));
  // 구매 할 때 사용될 배열
  const [buyProducts, setBuyProducts] = useState([]);
  // 토탈 구매 금액
  const [totalPrice, setTotalPrice] = useState(0);
  // 선택 계좌 아이디
  const [accountId, setAccountId] = useState("");
  // 주소 팝업창 관리
  const [isPopupOpen, setIsPopupOpen] = useState(false)
  // 주소 팝업 구분
  const [popupNum, setPopupNum] = useState(1);
  // 이메일 직접 선택 인풋 토글
  const [emailDrt, setEmailDrt] = useState(true);
  // 로딩
  const [loading, setLoading] = useState(true);
  // 계좌 추가 체크
  const [checkAcc, setCheckAcc] = useState(false);

  // 주소 팝업창 열기
  const openPostCode = (num) => {
      setIsPopupOpen(true)
      setPopupNum(num)
  }

  // 주소 팝업창 닫기
  const closePostCode = () => {
      setIsPopupOpen(false)
  }

  // maxlenth check
  const maxLengthChk = (object) => {
    if (object.target.value.length > object.target.maxLength) {
      object.target.value = object.target.value.slice(0, object.target.maxLength);
    }
  };

  useEffect(() => {
    const userBank = async () => {

      setLoading(true)
      const userInfo = await auth();
      const selectBank = await getAccount("banks");
      const allBank = await getAccount();
      setLoading(false)
      setUser(userInfo);
      // 전체 은행 리스트
      setAllBankList(allBank);
      // 선택 가능 은행 리스트
      setHoldBankList(selectBank.filter((e) => e.disabled === true));

      // 결제 할 때 필요한 배열 생성 (수량 체크)
      let buyProduct = cart.map((item) => {
        let product = [];

        if (item.quantity > 0) {
          for (let i = 0; i < item.quantity; i++) {
            product.push(item);
          }
        } else product.push(item);

        return product;
      });

      let totalBuyProduct = [];
      buyProduct.forEach((element) => {
        totalBuyProduct = [...totalBuyProduct, ...element];
      });
      setBuyProducts(totalBuyProduct);

      // 토탈 금액 계산
      let price = 0;
      cart.forEach((e) => {
        if (e.quantity > 0) price += Number(e.price * e.quantity);
        else price += Number(e.price);

        return null;
      });
      setTotalPrice(price);
    };
    userBank();
  }, [cart, checkAcc]);

  // 선택 은행 계좌 id 저장
  useEffect(() => {
    const getAccid = async () => {
      const allBankList = await getAccount();
      allBankList.accounts.forEach((e) => {
        if (e.bankCode === accountId) {
          return setAccountId(e.id);
        }
      });
    };
    getAccid();
  }, [accountId]);

  // 결제
  const payment = async () => {
    // 입력 폼 값 체크
    const formList = document.querySelectorAll('.form')
    for(let i=0; i<formList.length; i++){
      if(formList[i].value === '') {
        alert('입력란을 확인해주세요.')
        formList[i].focus()
        return 
      }
    }

    // 구매 의사, 계좌 선택 여부 확인 및 결제 진행
    if (window.confirm("정말 구매하시겠습니까?") && accountId !== "") {
      if (allBankList.accounts.filter((e) => e.id === accountId)[0].balance >= totalPrice) {
        setLoading(true)
        for (const x of buyProducts) {
          let body = JSON.stringify({
            productId: x.id,
            accountId: accountId,
          });
          await buyProduct(body);
        }
        setLoading(false)
        navigate('/orderconfirmed')
      } else {
        alert("잔액이 부족합니다.");
      }
    } else if (accountId === "") {
      alert("결제 계좌를 선택하세요.");
    } else return;
  };

  // 이메일 직접선택 
  const email = (e) => {
    if(e.target.value === 'direct') setEmailDrt(true)
    else setEmailDrt(false)
  }

  return (
    <>
      <Header user={user} />
      <Container>
        <Step style={`step2`}/>
        <section className="product-list">
          <ul>
            {cart.map((item) => {
              return (
                <li key={item.id} id={item.id}>
                  <div>
                    <img src={item.thumbnail} alt="제품 이미지" />
                    <p className="item-title">{item.title}</p>
                  </div>
                  <p>
                    수량 : <span>{item.quantity ? item.quantity : 1}</span>
                  </p>
                  <p>
                    상품 금액 : <span>${(item.price * (item.quantity ? item.quantity : 1)).toLocaleString()}</span>
                  </p>
                </li>
              );
            })}
          </ul>
        </section>

        <section className="order-info">
          <div className="order-form">
            <SubTitle> 주문 정보 </SubTitle>
            <ShippingInfo>
              <div>
                <p htmlFor="">주문자</p>
                <div>
                  <input type="text" className='form'/>
                </div>
              </div>
              <div>
                <p htmlFor="">이메일</p>
                <div>
                  <input type="text" className='form'/>
                  <span>@</span>
                  <select onChange={(e) => {email(e)}} className='form'>
                      <option value="direct" key="0">직접 입력</option>
                      <option value="naver.com" key="1">naver.com</option>
                      <option value="daum.net" key="2">daum.net</option>
                      <option value="gmail.com" key="3">gmail.com</option>
                      <option value="nate.com" key="4">nate.com</option>
                      <option value="hotmail.com" key="5">hotmail.com</option>
                  </select>
                  {
                    emailDrt && (
                      <input type="text" className="direct-input form" placeholder="직접 입력"/>
                    )
                  }
                </div>
              </div>
              <div>
                <p htmlFor="">일반 전화</p>
                <div>
                  <input type="number" className='form' maxLength={3} onInput={(e) => {maxLengthChk(e)}}/>
                  <input type="number" className='form' maxLength={4} onInput={(e) => {maxLengthChk(e)}}/>
                  <input type="number" className='form' maxLength={4} onInput={(e) => {maxLengthChk(e)}}/>
                </div>
              </div>
              <div>
                <p htmlFor="">휴대 전화</p>
                <div>
                  <input type="number" className='form' maxLength={3} onInput={(e) => {maxLengthChk(e)}}/>
                  <input type="number" className='form' maxLength={4} onInput={(e) => {maxLengthChk(e)}}/>
                  <input type="number" className='form' maxLength={4} onInput={(e) => {maxLengthChk(e)}}/>
                </div>
              </div>
              <div className="address-form">
                <p htmlFor="">주소</p>
                <div className="address-search">
                  <div className="address-num">
                    <input type="text" placeholder="우편번호" disabled className="address-number-01 form"/>
                    <button type="button" onClick={() => {openPostCode(1)}}>주소 검색</button>
                  </div>
                  <input type="text" placeholder="기본 주소" disabled className="default-address-01 form"/>
                  <input type="text" placeholder="상세 주소" className='form' />
                </div>
              </div>
            </ShippingInfo>

            <ShippingInfo>
              <SubTitle> 배송지 </SubTitle>
              <div>
                <p htmlFor="">받는사람</p>
                <div>
                  <input type="text" />
                </div>
              </div>
              <div className="address-form">
                <p htmlFor="">주소</p>
                <div className="address-search">
                  <div className="address-num">
                    <input type="text" placeholder="우편번호" disabled className="address-number-02 form"/>
                    <button type="button" onClick={() => {openPostCode(2)}}>주소 검색</button>
                  </div>
                  <input type="text" placeholder="기본 주소" disabled className="default-address-02 form"/>
                  <input type="text" placeholder="상세 주소" className='form' />
                </div>
              </div>
              <div>
                <p htmlFor="">일반 전화</p>
                <div>
                  <input type="number" className='form' maxLength={3} onInput={(e) => {maxLengthChk(e)}}/>
                  <input type="number" className='form' maxLength={4} onInput={(e) => {maxLengthChk(e)}}/>
                  <input type="number" className='form' maxLength={4} onInput={(e) => {maxLengthChk(e)}}/>
                </div>
              </div>
              <div>
                <p htmlFor="">휴대 전화</p>
                <div>
                  <input type="number" className='form' maxLength={3} onInput={(e) => {maxLengthChk(e)}}/>
                  <input type="number" className='form' maxLength={4} onInput={(e) => {maxLengthChk(e)}}/>
                  <input type="number" className='form' maxLength={4} onInput={(e) => {maxLengthChk(e)}}/>
                </div>
              </div>
              <div>
                <select className='form'>
                  <option value="none" key="1">
                    메시지 선택(선택 사항)
                  </option>
                  <option value="0" key="2">부재시 문 앞에 놓고 가주세요.</option>
                  <option value="0" key="3">부재시 문 앞에 놓고 가주세요.</option>
                  <option value="0" key="4">부재시 문 앞에 놓고 가주세요.</option>
                  <option value="0" key="5">부재시 문 앞에 놓고 가주세요.</option>
                </select>
              </div>
            </ShippingInfo>

            <SubTitle>결제 계좌 선택</SubTitle>
            {holdBankList.length === 0 ? (
              <>
                <p className="select-none-text">선택 가능한 계좌가 없습니다. 계좌를 등록하세요.</p>
                <AddAccount setCheckAcc={setCheckAcc}/>
              </>
            ) : (
              <ShippingInfo style={{'border':'none'}}>
                <select onChange={(e) => setAccountId(e.target.value)} className='account-selector'>
                  <option value="" key="100">
                    은행 선택
                  </option>
                  {holdBankList.map((bank) => {
                    return (
                      <option value={bank.code} key={bank.name}>
                        {bank.name}
                      </option>
                    );
                  })}
                </select>
              </ShippingInfo>
            )}
          </div>

          <div className="order-price">
            <div className="order-price-info">
              <p><span>상품 금액</span> : ${totalPrice.toLocaleString()}</p>
              <p><span>배송비</span> : 0 </p>
              <p><span>할인/부가결제</span> : 0 </p>
              <p className="order-total-price"><span>총 주문금액</span> : ${totalPrice.toLocaleString()}</p>
            
              <button
                onClick={() => {
                  payment();
                }}
              >
                구매하기
              </button>
            </div>
          </div>
        </section>

        <div id='AddressPopup'>
          {isPopupOpen && (
              <AddressPopup>
                  <PopupPostCode onClose={closePostCode} popupNum={popupNum} />
              </AddressPopup>
          )}
        </div>
        {
        loading && <Loading />
        }
      </Container>
      <Footer />
      {
        isPopupOpen && (
          <PopBg className="popup-bg"></PopBg>
        )
      }
    </>
  );
};

const Container = styled.main`
  width: 1200px;
  margin: 0 auto;

  .product-list {
    ul {
      padding: 20px;
      border: 2px solid #111;
      border-right: 0;
      border-left: 0;

      li {
        display: flex;
        align-items: center;
        justify-content:space-between;

        div {
          display: flex;
          align-items: center;
          gap: 20px;
          width: calc(100% / 2);

          img {
            width: 150px;
          }

          p {
            width: 100%;
          }
        }

        & > p:nth-child(2){
          width:200px;
          text-align:left;
        }

        & > p:last-child {
          width:200px;
          text-align:right;
        }
      }
    }
  }

  .order-info {
    display: flex;
    gap: 20px;
    margin-bottom:50px;

    .order-form {
      width: 50%;
    }

    .order-price {
      width: 50%;
      position:relative;

      .order-price-info {
        display:flex;
        flex-direction:column;
        gap:10px;
        margin-top:57px;
        padding:20px;
        position:sticky;
        top:20px;
        border: 1px solid #ddd;

        p {
          font-size:0.9rem;

          span {
            font-weight: 900;
          }
        }

        .order-total-price {
          padding:10px 0;
          font-size:1.1rem;
          border-top:1px solid #ddd;
          margin-top:5px;
        }

        button {
          width:100%;
          background:#eee;
          padding:10px 0;
          cursor:pointer;

          &:hover {
            background:#111;
            color:#fff;
          }
        }
      }
    }
  }

  .select-none-text { 
    font-size:0.9rem; 
    padding:10px 0;
  }

  .select-text {
    display:none;
  }
`;

const SubTitle = styled.p`
  padding: 20px 0;
  color: #111;
  font-size: 0.8rem;
  font-weight:600;
`;

const PopBg = styled.div`
  position:fixed;
  width:100%;
  height:100%;
  background: #fff;
  opacity:.8;
  top:0;
  left:0;
  z-index:50;
`

const ShippingInfo = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding-bottom: 30px;
  border-bottom: 1px solid #ddd;

  div {
    display: flex;
    position:relative;

    p {
      width: 15%;
      font-size: 0.9rem;
      color: #111;
      line-height:30px;
    }

    div {
      display: flex;
      gap: 10px;
      width: 100%;
      align-items:center;

      input {
        border: 1px solid #ddd;
        width: 100%;
        height:30px;
        font-size:.8rem;
        padding:0 10px;
        background:#fff;
      }

      .direct-input {
        position:absolute;
        width:calc(50% - 40px);
        right: 20px;
        border-right:0;
      }
    }

    input[type="number"] {
      border: 1px solid #ddd;
    }

    input[type="number"]::-webkit-outer-spin-button,
    input[type="number"]::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
  }

  .address-form {
    position:static;

    .address-search {
      display: flex;
      flex-direction: column;

      .address-num {
        display: flex;

        input {
          width: 100px;
        }

        button {
          width:80px;
          height:30px;
          line-height:30px;
          border: 1px solid #ddd;
          background: #ddd;
          color: #111;
          font-size:.8rem;
          cursor:pointer;
        }
      }
    }
  }

  select {
    width:100%;
    height:30px;
    border:1px solid #ddd;
    padding-left:10px;
    
    &:focus {
      outline: none;
    }
  }
`;

export { OrderPage };
