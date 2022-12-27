// import React from 'react';
// import styled from 'styled-components';

// const Main = () => {
//   const Main = styled.main`
//     display: flex;
//     justify-content: center;
//     flex-direction: column;
//     align-items: center;
//   `;
//   const Beaner = styled.div`
//     max-width: 1200px;
//     height: 500px;
//     margin: 0 auto;
//     overflow: hidden;
//     margin-top: 50px;
//   `;

//   const BeanerItems = styled.img`
//     width: 1200px;
//     transform: translateY(-160px);
//   `;

//   const ItemsContainer = styled.div`
//     margin: 100px 0;

//     ul {
//       display: flex;
//       flex-wrap: wrap;
//       gap: 15px;
//       width: 1200px;
//       max-width: 1200px;

//       .item-container {
//         width: calc(20% - 15px);
//         height: 360px;
//         overflow: hidden;
//         position: relative;

//         .item-img {
//           width: 100%;

//           img {
//             width: 100%;
//           }
//         }

//         .itme-info {
//           display: flex;
//           flex-direction: column;
//           gap: 10px;
//           position: absolute;
//           bottom: 0;

//           .item-name {
//           }

//           .item-brand {
//             font-weight: 600;
//           }

//           .item-place {
//             color: blue;
//           }
//         }
//       }
//     }
//   `;

//   return (
//     <Main>
//       <Beaner>
//         <BeanerItems
//           src="https://spnimage.edaily.co.kr/images/photo/files/NP/S/2021/05/PS21051900009.jpg"
//           alt="guggi"
//         />
//       </Beaner>

//       <ItemsContainer>
//         <ul>
//           <li className="item-container">
//             <div className="item-img">
//               <img
//                 src="https://www.wdrobe.com/web/upload/NNEditor/20220128/copy-1643340580-1.jpg"
//                 alt=""
//               />
//             </div>
//             <div className="itme-info">
//               <p className="item-name">
//                 22F/W 구찌 오피디아 미니 체인 장지갑&숄더백
//               </p>
//               <p className="item-brand">GUCCI</p>
//               <p className="item-place">1,298,000원</p>
//             </div>
//           </li>
//           <li className="item-container">
//             <div className="item-img">
//               <img
//                 src="https://www.wdrobe.com/web/upload/NNEditor/20220128/copy-1643340580-1.jpg"
//                 alt=""
//               />
//             </div>
//             <div className="itme-info">
//               <p className="item-name">
//                 22F/W 구찌 오피디아 미니 체인 장지갑&숄더백
//               </p>
//               <p className="item-brand">GUCCI</p>
//               <p className="item-place">1,298,000원</p>
//             </div>
//           </li>
//           <li className="item-container">
//             <div className="item-img">
//               <img
//                 src="https://www.wdrobe.com/web/upload/NNEditor/20220128/copy-1643340580-1.jpg"
//                 alt=""
//               />
//             </div>
//             <div className="itme-info">
//               <p className="item-name">
//                 22F/W 구찌 오피디아 미니 체인 장지갑&숄더백
//               </p>
//               <p className="item-brand">GUCCI</p>
//               <p className="item-place">1,298,000원</p>
//             </div>
//           </li>
//           <li className="item-container">
//             <div className="item-img">
//               <img
//                 src="https://www.wdrobe.com/web/upload/NNEditor/20220128/copy-1643340580-1.jpg"
//                 alt=""
//               />
//             </div>
//             <div className="itme-info">
//               <p className="item-name">
//                 22F/W 구찌 오피디아 미니 체인 장지갑&숄더백
//               </p>
//               <p className="item-brand">GUCCI</p>
//               <p className="item-place">1,298,000원</p>
//             </div>
//           </li>
//           <li className="item-container">
//             <div className="item-img">
//               <img
//                 src="https://www.wdrobe.com/web/upload/NNEditor/20220128/copy-1643340580-1.jpg"
//                 alt=""
//               />
//             </div>
//             <div className="itme-info">
//               <p className="item-name">
//                 22F/W 구찌 오피디아 미니 체인 장지갑&숄더백
//               </p>
//               <p className="item-brand">GUCCI</p>
//               <p className="item-place">1,298,000원</p>
//             </div>
//           </li>
//           <li className="item-container">
//             <div className="item-img">
//               <img
//                 src="https://www.wdrobe.com/web/upload/NNEditor/20220128/copy-1643340580-1.jpg"
//                 alt=""
//               />
//             </div>
//             <div className="itme-info">
//               <p className="item-name">
//                 22F/W 구찌 오피디아 미니 체인 장지갑&숄더백
//               </p>
//               <p className="item-brand">GUCCI</p>
//               <p className="item-place">1,298,000원</p>
//             </div>
//           </li>
//           <li className="item-container">
//             <div className="item-img">
//               <img
//                 src="https://www.wdrobe.com/web/upload/NNEditor/20220128/copy-1643340580-1.jpg"
//                 alt=""
//               />
//             </div>
//             <div className="itme-info">
//               <p className="item-name">
//                 22F/W 구찌 오피디아 미니 체인 장지갑&숄더백
//               </p>
//               <p className="item-brand">GUCCI</p>
//               <p className="item-place">1,298,000원</p>
//             </div>
//           </li>
//           <li className="item-container">
//             <div className="item-img">
//               <img
//                 src="https://www.wdrobe.com/web/upload/NNEditor/20220128/copy-1643340580-1.jpg"
//                 alt=""
//               />
//             </div>
//             <div className="itme-info">
//               <p className="item-name">
//                 22F/W 구찌 오피디아 미니 체인 장지갑&숄더백
//               </p>
//               <p className="item-brand">GUCCI</p>
//               <p className="item-place">1,298,000원</p>
//             </div>
//           </li>
//         </ul>
//       </ItemsContainer>
//     </Main>
//   );
// };

// export default Main;
