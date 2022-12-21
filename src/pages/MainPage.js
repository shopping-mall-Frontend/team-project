import Header from '../components/Header';
import styled from 'styled-components';
import { auth } from '../utils/useAPI';
import { useEffect, useState } from 'react';
import { getAllProduct } from '../utils/useAPI'
import { Swiper, SwiperSlide } from "swiper/react"; // basic
import { Navigation, Pagination, A11y } from "swiper";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Link } from 'react-router-dom';

const Container = styled.main`
  margin:0 auto;

  .swiper-slide {
    opacity:.6;
  }
  .swiper-slide-active {
    opacity: 1;
  }

  * { 
    text-decoration:none; 
    box-sizing:border-box;
  }

`;

const BannerWrap = styled.div`
  
`

const Banner = styled.div`
    height:400px;
    overflow:hidden;
    margin-top:50px;
  `;

const ItemsContainer = styled.div`
  max-width:1080px;
  margin:50px auto;
  position:relative;

  .items-swiper {
    position:absolute;
    transition:1s all;
    width:100%;
    opacity:0;
    display:none
  }

  ul {
    display:flex;
    gap: 10px;

    .item-container {
      width:calc(20% - 15px);
      height:360px;
      overflow:hidden;
      position:relative;
      display:inline-block;

      .item-img {
        width:100%;

        img{
          width:100%;
        }
      }
      
      .item-title {
        font-weight:600;
        color:#000;
      }

      .item-price {
        color:#000;
      }
    }

  }
`

const MainPage = () => {
  const [user, setUser] = useState(false);

  const [gucci, setGucci] = useState([]);
  const [bottega, setBottega] = useState([]);
  const [louis, setLouis] = useState([]);
  const brand = [gucci, bottega, louis]

  useEffect(() => {
    const authUser = async () => {
      const userInfo = await auth();
      const products = await getAllProduct(true);
      setUser(userInfo);

      setGucci (products.filter((item) => item.title.includes('GUCCI')));
      setBottega (products.filter((item) => item.title.includes('BOTTEGA')));
      setLouis (products.filter((item) => item.title.includes('LOUIS')));
    };
    authUser();
  }, []);

  return (
    <>
      <Header user={user} />
      <Container>
        <BannerWrap>
          <Swiper
            modules={[Navigation, Pagination, A11y]}
            spaceBetween={10}
            slidesPerView={2}
            pagination={{ clickable: true }}
            centeredSlides={true}
            loop={true} 
            loopFillGroupWithBlank={true}
            onSwiper={() => {
                const item = document.querySelector('.items-swiper-0')
                item.style.display = 'block'
                item.style.opacity = 1
              }
            }
            onSlideChange={(swiper) => {
                console.log(swiper)
                let index = `.items-swiper-${swiper.activeIndex - 2}`
                let item = document.querySelector(index)
                document.querySelectorAll('.items-wrap .swiper').forEach(e => {
                  e.style.opacity = 0;
                  e.style.dispay = 0;
                })
                item.style.opacity = 1
                item.style.display = 'block'
              }
            }
          >
            <SwiperSlide>
              <Banner style={{'background':'url("https://live.staticflickr.com/65535/51216932186_a89e171193_o.jpg") center center / cover no-repeat'} }></Banner>
            </SwiperSlide>
            <SwiperSlide>
              <Banner style={{'background':'url("http://the-edit.co.kr/wp-content/uploads/2021/02/1400_5_BOTTEGA-VENETA_FALL20-CAMPAIGN-5.jpg") center center / cover no-repeat'} }></Banner>
            </SwiperSlide>
            <SwiperSlide>
              <Banner style={{'background':'url("https://www.noblesse.com/shop/data/m/editor_new/2019/10/02/19e8151a86f3a75d0930_style_02.jpg") center center / cover no-repeat'} }></Banner>
            </SwiperSlide>
          </Swiper>
        </BannerWrap>

        <ItemsContainer className='items-wrap'>
          {
            brand.map((brand, index) => {
              return(
                  <Swiper
                    modules={[Navigation, Pagination, A11y]}
                    slidesPerView={1}
                    className={'items-swiper items-swiper-' + index} 
                    key={index}
                  >
                    <SwiperSlide>
                      <ul>
                        {
                          brand.map(item => {
                            return (
                              <Link to={'/product/' + item.id} className='item-container' key={item.id}>
                                <div>
                                  <img src={item.thumbnail} alt={item.title + '이미지'} className='item-img' />
                                  <p className='item-title'>{item.title}</p>
                                  <p className='item-price'>{item.price}</p>
                                </div>
                              </Link>
                            )
                          })
                        }
                      </ul>
                    </SwiperSlide>
                  </Swiper>
              )
            })
          }
          {/* <Swiper
            modules={[Navigation, Pagination, A11y]}
            slidesPerView={1}
            className='items-swiper items-swiper-0'
          >
            <SwiperSlide>
              <ul>
                {
                  gucci.map(item => {
                    return (
                      <Link to={'/product/' + item.id} className='item-container' key={item.id}>
                        <div>
                          <img src={item.thumbnail} alt={item.title + '이미지'} className='item-img' />
                          <p className='item-title'>{item.title}</p>
                          <p className='item-price'>{item.price}</p>
                        </div>
                      </Link>
                    )
                  })
                }
              </ul>
            </SwiperSlide>
          </Swiper>

          <Swiper
            modules={[Navigation, Pagination, A11y]}
            slidesPerView={1}
            className='items-swiper items-swiper-1'
          >
            <SwiperSlide>
              <ul>
                {
                  bottega.map(item => {
                    return (
                      <Link to={'/product/' + item.id} className='item-container' key={item.id}>
                        <div>
                          <img src={item.thumbnail} alt={item.title + '이미지'} className='item-img' />
                          <p className='item-title'>{item.title}</p>
                          <p className='item-price'>{item.price}</p>
                        </div>
                      </Link>
                    )
                  })
                }
              </ul>
            </SwiperSlide>
          </Swiper>
           */}
        </ItemsContainer>
      </Container>
    </>
  );
};

export { MainPage };
