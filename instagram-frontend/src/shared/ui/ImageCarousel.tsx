import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { memo } from "react";

const carouselStyles = `
  .swiper-pagination-bullet { background: white !important; opacity: 0.5; }
  .swiper-pagination-bullet-active { opacity: 1; }
  .swiper-button-next, .swiper-button-prev {
    color: white !important;
    background: rgba(0, 0, 0, 0.3);
    width: 28px !important; height: 28px !important; border-radius: 50%;
  }
  .swiper-button-next:after, .swiper-button-prev:after { font-size: 12px !important; }
`;

interface ImageCarouselProps {
  media: { url: string; id?: string }[];
  onSwiper?: (swiper: SwiperType) => void;
  aspectRatio?: string;
}

export const ImageCarousel = memo(
  ({ media, onSwiper, aspectRatio = "aspect-square" }: ImageCarouselProps) => {
    return (
      <div className={`relative w-full h-full overflow-hidden ${aspectRatio}`}>
        <Swiper
          onSwiper={onSwiper}
          modules={[Navigation, Pagination]}
          spaceBetween={0}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true, dynamicBullets: true }}
          className="w-full h-full"
        >
          {media.map((item, idx) => (
            <SwiperSlide
              key={item.id || item.url || idx}
              className="bg-black flex items-center justify-center"
            >
              <img
                src={item.url}
                alt={`Slide ${idx}`}
                className="w-full h-full object-contain"
                loading="lazy"
              />
            </SwiperSlide>
          ))}
        </Swiper>
        <style>{carouselStyles}</style>
      </div>
    );
  },
);

ImageCarousel.displayName = "ImageCarousel";
