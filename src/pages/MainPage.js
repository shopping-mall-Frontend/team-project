import Header from "../components/Header";
import Footer from "../components/Footer";
import Product from "../components/Product";
import { auth } from "../utils/useAPI";
import { getAllProduct } from "../utils/useAPI";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { Swiper, SwiperSlide } from "swiper/react"; // basic
import { Navigation, Pagination, A11y, Autoplay, EffectFade } from "swiper";
import "swiper/css/bundle";

const MainPage = ({ products, setProducts }) => {
  const [user, setUser] = useState(false);

  const [gucci, setGucci] = useState([]);
  const [bottega, setBottega] = useState([]);
  const [louis, setLouis] = useState([]);
  const [chanel, setChanel] = useState([]);
  const [allItems, setAllItems] = useState([]);
  const brand = [gucci, louis, bottega, chanel];
  const sliceBrand = []; // 제품 10개 초과 브랜드 배열 분류.

  useEffect(() => {
    const authUser = async () => {
      const userInfo = await auth();
      const products = await getAllProduct(true);
      setUser(userInfo);

      setGucci(products.filter((item) => item.tags[0] === "GUCCI"));
      setBottega(products.filter((item) => item.tags[0].includes("BOTTEGA")));
      setLouis(products.filter((item) => item.tags[0].includes("LOUIS")));
      setChanel(products.filter((item) => item.tags[0].includes("CHANEL")));

      setProducts(products.filter((item) => item.tags[0] === "GUCCI"));
      setAllItems(products.slice(0, 10));
    };
    authUser();
  }, [setProducts]);

  const chunk = (products) => {
    for (let i = 0; i < products.length; i += 10) {
      sliceBrand.push(products.slice(i, i + 10));
    }

    return;
  };
  chunk(products);

  return (
    <>
      <Header user={user} />
      <Container>
        <BannerWrap>
          <Swiper
            modules={[Pagination, A11y, Autoplay]}
            spaceBetween={10}
            slidesPerView={2}
            pagination={{ clickable: true }}
            centeredSlides={true}
            loop={true}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            speed={1500}
            loopFillGroupWithBlank={true}
            touchRatio={0}
            onSlideChange={(swiper) => {
              let item = document.querySelector(".items-swiper");
              if (item) item.classList.remove("fade");

              if (swiper.activeIndex - 2 < 0) setProducts(brand[3]);
              else if (swiper.activeIndex - 2 === 4) setProducts(brand[0]);
              else setProducts(brand[swiper.activeIndex - 2]);

              if (item)
                setTimeout(() => {
                  item.classList.add("fade");
                }, 10);
            }}
          >
            <SwiperSlide>
              <Banner
                style={{ background: 'url("/images/banner/gucci_banner.jpg") center center / cover no-repeat' }}
              />
            </SwiperSlide>
            <SwiperSlide>
              <Banner
                style={{ background: 'url("/images/banner/louis_banner.jpg") center center / cover no-repeat' }}
              />
            </SwiperSlide>
            <SwiperSlide>
              <Banner
                style={{ background: 'url("images/banner/bottega_banner.jpg") center center / cover no-repeat' }}
              />
            </SwiperSlide>
            <SwiperSlide>
              <Banner
                style={{ background: 'url("images/banner/chanel_banner.jpg") center center / cover no-repeat' }}
              />
            </SwiperSlide>
          </Swiper>
        </BannerWrap>

        <ItemsContainer className="items-wrap">
          <Swiper
            modules={[Navigation, A11y]}
            slidesPerView={1}
            speed={700}
          >
            {sliceBrand.map((items, index) => {
              return (
                <SwiperSlide key={index}>
                  <ul className="items-swiper fade">
                    {items.map((item) => {
                      return <Product key={item.id} id={item.id} product={item} />;
                    })}
                  </ul>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </ItemsContainer>

        <ItemsContainer>
          <ItemsSwiperTitle>New Products</ItemsSwiperTitle>
          <Swiper
            modules={[A11y, Autoplay]}
            spaceBetween={30}
            slidesPerView={5}
            speed={1000}
            loop={true}
            loopFillGroupWithBlank={true}
            autoplay={{
              delay: 1000,
            }}
          >
            {allItems.map((item) => {
              return (
                <SwiperSlide className="new-product-wrap" key={item.id}>
                  <div>
                    <Link
                      className="item-image"
                      to={`/product/${item.id}`}
                      style={{ backgroundImage: `url(${item.thumbnail})` }}
                    />
                    <div className="item-info-wrap">
                      <p className="item-brand">[{item.tags[0]}]</p>
                      <p className="item-title">{item.title}</p>
                      <p className="item-price">{`$${item.price.toLocaleString()}`}</p>
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </ItemsContainer>

        <BrandInfo>
          <Swiper
            direction={"vertical"}
            modules={[Pagination, Navigation, Autoplay, EffectFade]}
            slidesPerView={1}
            pagination={{
              clickable: true,
            }}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            touchRatio={0}
            speed={1500}
            loopFillGroupWithBlank={true}
            loop={true}
            effect={"fade"}
            style={{ height: "500px" }}
          >
            <SwiperSlide>
              <div
                className="info-wrap"
                style={{ background: 'url("/images/info_bg/gucci_info_bg.jpg") center center / cover no-repeat' }}
              >
                <p>
                  구찌는 혁신적이고 진취적인 자세로 패션의 현대적 감성을 극대화하는 영향력 있는 브랜드입니다. 하우스는
                  세련된 21세기식 럭셔리 아이템을 선보이며, 전 세계 최고 수준의 패션 브랜드로 브랜드의 입지를 한층 더
                  강화하고 있습니다. 다채로우면서도 현대적인 로맨티시즘이 반영되어 있는 구찌의 상품은 이탈리아의 장인
                  정신을 대표하며 정교한 디테일로 상품에 우수성을 더합니다.
                  <br />
                  <br />
                  구찌는 케어링 그룹 산하 브랜드입니다. 글로벌 럭셔리 그룹인 케어링은 패션, 가죽 제품, 주얼리 및 시계
                  분야의 여러 유명 하우스들을 관리하고 있습니다.
                </p>
                <Link to="/category/all/GUCCI">브랜드 바로가기</Link>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div
                className="info-wrap"
                style={{ background: 'url("/images/info_bg/louis_info_bg.jpg") center center / cover no-repeat' }}
              >
                <p>
                  루이비통은 제품 출하 전 여러 테스트를 거쳐 통해 품질을 유지 관리합니다. 루이비통은 세컨 라인 확장을
                  금지하고 브랜드 라인을 차별화하고 있습니다. 1993년부터 루이비통은 '루이비통 클래식 자동차 경주대회'를
                  개최했고, 2005년부터는 2년마다 '루이비통 클래식 어워드'를 통해 경주대회 최고상 수상 차량과 기대되는
                  올해의 컨셉카에게 각각 '루이 비통 콩쿠르 어워드', '루이 비통 컨셉트 어워드'를 수여하고 있습니다.
                  루이비통은 산하에 루이비통 출판사를 두고 자체적인 브랜드 기획 도서를 발간하고 있으면, 세계적인
                  출판사들과 협력하여 미셀 투르니에, 마르셀 푸르스트, 버지니아 울프 등 여러 유명 작가들의 여행기 뿐만
                  아니라 세계 100여 개 도시를 망라한 '시티 가이드 컬렉션',아티스트 컬래버 레이션 서적 등을 꾸준히
                  출판하고 있습니다.
                  <br />
                  <br />이 처럼 루이비통은 단순한 제품 홍보가 아닌 브랜드 핵심가치에 부합하는 다양하고 확장적인 마케팅
                  활동을 전개함으로서 소비자에게 일관된 브랜드 아이덴티티를 전달합니다.
                </p>
                <Link to="/category/all/LOUIS">브랜드 바로가기</Link>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div
                className="info-wrap"
                style={{ background: 'url("/images/info_bg/bottega_info_bg.jpg") center center / cover no-repeat' }}
              >
                <p>
                  보테가 베네타(Bottega Veneta)는 전 세계적으로 판매되고 있는 가죽 제품으로 잘 알려진 이탈리아의 명품
                  브랜드이다. 1966년 북부 이탈리아의 베네토 지역에서 설립되었으며, 브랜드의 아틀리에는 몬테벨로
                  비첸티노(Montebello Vicentino)의 18세기 빌라에 위치하고 있으며, 이탈리아 밀라노와 비첸자에 있는
                  오피스와 함께 스위스 루가노에 본사를 두고 있다.
                  <br />
                  <br />
                  2001년, 보테가 베네타는 구찌 그룹에 인수되었고, 지금의 프랑스 다국적 그룹 케어링에 속해있습니다.
                </p>
                <Link to="/category/all/BOTTEGA">브랜드 바로가기</Link>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div
                className="info-wrap"
                style={{ background: 'url("/images/info_bg/chanel_info_bg.jpg") center center / cover no-repeat' }}
              >
                <p>
                  가브리엘 샤넬은 자신의 삶을 스스로 개척해나갔습니다. 고아원에서 유년 시절을 보내고 성공한 사업가로
                  성장한 그녀는 단연코 자유롭고 대범하면서도 시대를 앞서가는 아이콘이었습니다. 진실한 우정과 열정적인
                  사랑, 문화와 새로운 발견 그리고 여행을 향한 갈증은 가브리엘 샤넬의 원동력이었으며, 그녀는 제약과
                  과잉에서 벗어나 그 누구보다 먼저 성별의 경계를 허물고, 시간을 초월해 많은 인기를 누리게 될 모던한
                  작품들을 탄생시켰습니다. 진주와 다이아몬드를 아이코닉 향수에 가볍게 매치한 시그니처 스타일 또한 빠트릴
                  수 없습니다. 아방가르드한 여성이었던 가브리엘 샤넬은 자신의 라이프 스타일과 다양한 매력으로 샤넬
                  하우스의 가치를 형성한 선구자였으며, 오늘날까지 모든 여성들에게 풍부한 영감을 선사하고 있습니다.
                  <br />
                  <br />
                  "내 손끝에서 피어난 전설이 더 발전하고 번성하기를 꿈꾸며, 샤넬이 오랫동안 행복한 브랜드로 남기를
                  바란다."
                </p>
                <Link to="/category/all/CHANEL">브랜드 바로가기</Link>
              </div>
            </SwiperSlide>
          </Swiper>
        </BrandInfo>
      </Container>
      <Footer />
    </>
  );
};

export { MainPage };

const Container = styled.main`
  margin: 0 auto;
  overflow: hidden;

  * {
    text-decoration: none;
    box-sizing: border-box;
  }
`;

const BannerWrap = styled.div`
  position: relative;

  .swiper-slide {
    opacity: 0.5;
    pointer-events:none;
  }

  .swiper-slide-active {
    opacity: 1;
  }

  .swiper {
    overflow: inherit;
    width: 140%;
    left: -20%;
    min-width:1200px;
  }

  .swiper-pagination {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    bottom: -80px;
    left: 50%;
    transform: translateX(-50%);
    height: 50px;
    overflow: hidden;

    .swiper-pagination-bullet {
      width: 150px;
      height: 200px;
      background-position: center;
      background-size: contain;
      background-repeat: no-repeat;
      border-radius: 0;
      background-color: rgba(0, 0, 0, 0);
    }
    .swiper-pagination-bullet:nth-child(1) {
      background-image: url("/images/logo/gucci_logo.png");
    }
    .swiper-pagination-bullet:nth-child(2) {
      background-image: url("/images/logo/louis_logo.png");
      width: 200px;
    }
    .swiper-pagination-bullet:nth-child(3) {
      background-image: url("/images/logo/bottega_logo.png");
      width: 200px;
    }
    .swiper-pagination-bullet:nth-child(4) {
      background-image: url("/images/logo/chanel_logo.png");
    }
  }
`;

const Banner = styled.div`
  height: 500px;
`;

const ItemsContainer = styled.div`
  width: 1200px;
  margin: 110px auto;
  position: relative;

  @keyframes fade {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  .items-category-link {
    margin: 50px auto;
    text-align: center;
  }

  .items-swiper {
    display: flex;
    width: 100%;
    height: 650px;
    gap: 15px;
    opacity: 0;
    flex-wrap: wrap;
    transition: 2s all;
  }

  .items-swiper.fade {
    animation: fade 1.5s forwards;
  }

  // 신상 슬라이더 스타일
  .new-product-wrap {
    position: relative;

    .item-image {
      display: block;
      width: 100%;
      height: 216px;
      background-position: center;
      background-size: contain;
      background-repeat: no-repeat;
    }

    &:hover::before {
      content: "";
      display: block;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.5);
      border-radius: 5px;
      position: absolute;
      top: 0;
      left: 0;
      pointer-events: none;
    }

    .item-info-wrap {
      display: none;
    }

    &:hover .item-info-wrap {
      display: block;
      width: 100%;
      padding: 10px;
      position: absolute;
      top: 50%;
      left: 0;
      transform: translateY(-50%);
      color: #fff;
      pointer-events: none;

      .item-brand {
        margin: 10px 0 5px;
      }

      .item-title {
        display: block;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        font-size: 1.02rem;
      }

      .item-price {
        font-size: 0.9rem;
      }
    }
  }
`;

const ItemsSwiperTitle = styled.p`
  font-size: 2rem;
  text-align: center;
  position: relative;
  margin: 50px 0 20px;

  &::before {
    content: "";
    display: block;
    position: absolute;
    top: 50%;
    left: 0;
    width: 40%;
    height: 2px;
    background: #ddd;
    z-index: -1;
  }

  &::after {
    content: "";
    display: block;
    position: absolute;
    top: 50%;
    right: 0;
    width: 40%;
    height: 2px;
    background: #ddd;
  }
`;

const BrandInfo = styled.div`
  width: 1200px;
  margin: 200px auto;
  position: relative;

  .swiper-pagination {
    position: absolute;
    top: 0;
    left: 0;
    transform: translate(0);

    .swiper-pagination-bullet {
      width: 200px;
      height: 80px;
      border-radius: 0;
      margin: 0;
      background-size: 80%;
      background-position: center;
      background-repeat: no-repeat;
      background-color: #ddd;
    }

    .swiper-pagination-bullet:nth-child(1) {
      background-image: url("/images/logo/gucci_logo.png");
    }
    .swiper-pagination-bullet:nth-child(2) {
      background-image: url("/images/logo/louis_logo.png");
    }
    .swiper-pagination-bullet:nth-child(3) {
      background-image: url("/images/logo/bottega_logo.png");
    }
    .swiper-pagination-bullet:nth-child(4) {
      background-image: url("/images/logo/chanel_logo.png");
    }
  }

  .swiper-slide {
    pointer-events:none;

    a{ 
      pointer-events:auto;
    }
  }

  .info-wrap {
    display: flex;
    height: 100%;
    flex-direction: column;
    justify-content: center;
    align-items: flex-end;
    margin-left: 200px;

    p {
      width: 600px;
      margin-right: 20px;
      padding: 30px;
      background: #000;
      color: #fff;
      line-height: 1.5;
      background-color: rgba(0, 0, 0, 0.7);
    }

    a {
      display: block;
      width: 180px;
      margin: 30px 20px 0 0;
      padding: 15px;
      text-align: center;
      background: #111;
      color: #eee;
    }
  }
`;
