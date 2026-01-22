import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { useEffect, useState } from "react";
import { StoriesSkeleton } from "./loaders/StoriesSkeleton";

export const Stories = () => {
  const stories = Array.from({ length: 15 }).map((_, i) => ({
    id: i,
    username: `user_${i}`,
    avatar: `https://i.pravatar.cc/150?img=${i + 10}`,
  }));

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timeoutId);
  }, []);

  if (loading) {
    return <StoriesSkeleton />;
  }

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
            <div className="flex flex-col items-center gap-1 cursor-pointer">
              {/* Gradient Ring */}
              <div className="w-21 h-21 rounded-full bg-linear-to-tr from-yellow-400 to-fuchsia-600 p-[3px]">
                <div className="bg-[#0d1015] p-1 rounded-full w-full h-full">
                  <img
                    src={story.avatar}
                    alt={story.username}
                    className="w-full h-full rounded-full object-cover"
                  />
                </div>
              </div>
              <span className="text-xs text-gray-200 truncate w-[74px] text-center">
                {story.username}
              </span>
            </div>
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
