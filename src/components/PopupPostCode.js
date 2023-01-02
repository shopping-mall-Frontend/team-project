import DaumPostcode from 'react-daum-postcode';
import styled from 'styled-components';

const PopupPostCode = (props) => {
  // 우편번호 검색 후 주소 클릭 시 실행될 함수, data callback 용
  const handlePostCode = (data) => {
    let fullAddress = data.address;
    let extraAddress = '';

    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddress += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddress += extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
    }

    // console.log(props)
    // console.log(props.popupNum)
    if (props.popupNum === 1) {
      document.querySelector('.address-number-01').value = data.zonecode;
      document.querySelector('.default-address-01').value = fullAddress;
    } else {
      document.querySelector('.address-number-02').value = data.zonecode;
      document.querySelector('.default-address-02').value = fullAddress;
    }

    props.onClose();
  };

  const postCodeStyle = {
    display: 'block',
    width: '600px',
    height: '600px',
    border: '2px solid #ddd',
  };

  const Box = styled.div`
    z-index: 9999;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);

    button {
      margin-bottom: 10px;
      cursor: pointer;
    }
  `;

  return (
    <Box>
      <button
        type="button"
        onClick={() => {
          props.onClose();
        }}
        className="postCode_btn"
      >
        닫기
      </button>
      <DaumPostcode style={postCodeStyle} onComplete={handlePostCode} />
    </Box>
  );
};

export default PopupPostCode;
