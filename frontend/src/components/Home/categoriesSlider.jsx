// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";

// Import Swiper styles

const CategoriesSlider = () => {
  return (
    <Swiper
      spaceBetween={0}
      slidesPerView={2}
      navigation={true}
      modules={[Navigation]}
      onSwiper={(swiper) => console.log(swiper)}
      breakpoints={{
        // when window width is >= 768px
        768: {
          width: 768,
          slidesPerView: 4,
        },
      }}
    >
      <SwiperSlide>
        <img
          src="/assets/pexels-pixabay-206299.jpg"
          className="categorySliderImage"
          alt=""
        />
        <h6>CHEVEUX</h6>
      </SwiperSlide>
      <SwiperSlide>
        <img
          src="/assets/pexels-chris-howard-755280.jpg"
          className="categorySliderImage"
          alt=""
        />
        <h5>VISAGE</h5>
      </SwiperSlide>
      <SwiperSlide>
        <img
          src="/assets/pexels-anastasiya-gepp-1462638.jpg"
          className="categorySliderImage"
          alt=""
        />
        <h5>PEAU</h5>
      </SwiperSlide>
      <SwiperSlide>
        <img
          src="/assets/pexels-chris-howard-755280.jpg"
          className="categorySliderImage"
          alt=""
        />
        <h5>VISAGE</h5>
      </SwiperSlide>
      <SwiperSlide>
        <img
          src="/assets/pexels-anastasiya-gepp-1462638.jpg"
          className="categorySliderImage"
          alt=""
        />
        <h5>PEAU</h5>
      </SwiperSlide>
    </Swiper>
  );
};

export default CategoriesSlider;
