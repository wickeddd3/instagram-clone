import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

export const StoriesSkeleton = () => {
  const stories = Array.from({ length: 15 }).map((_, i) => ({
    id: i,
    username: `user_${i}`,
    avatar: `https://i.pravatar.cc/150?img=${i + 10}`,
  }));

  return (
    <div className="w-full mx-auto py-4 relative group">
      <Swiper
        modules={[Navigation]}
        spaceBetween={4}
        slidesPerView="auto"
        navigation={true}
        className="mySwiper px-2!"
      >
        {stories.map((story) => (
          <SwiperSlide key={story.id} className="w-auto!">
            <div className="w-22 h-22 rounded-full bg-neutral-800 animate-pulse shrink-0" />
          </SwiperSlide>
        ))}
      </Swiper>

      <style>{`
        .swiper-button-next, .swiper-button-prev {
          background-color: white;
          width: 22px !important;
          height: 22px !important;
          border-radius: 50%;
          color: black !important;
          opacity: 0;
          transition: opacity 0.2s ease;
        }
        .swiper-button-next::after, .swiper-button-prev::after {
          font-size: 12px !important;
          font-weight: bold;
        }
        .group:hover .swiper-button-next, 
        .group:hover .swiper-button-prev {
          opacity: 1;
        }
        .swiper-button-disabled {
          display: none !important;
        }
        .swiper-navigation-icon {
          width: 12px !important;
          height: 12px !important;
        }
      `}</style>
    </div>
  );
};
