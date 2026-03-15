import { memo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { FeedCardImage } from "./FeedCardImage";
import type { Post } from "@/entities/post";

const carouselStyles = `
  .swiper-pagination-bullet { background: white !important; opacity: 0.5; }
  .swiper-pagination-bullet-active { opacity: 1; }
  .swiper-button-next, .swiper-button-prev {
    visibility: hidden;
  }
`;

export const FeedImageCarousel = memo(({ post }: { post: Post }) => {
  return (
    <div className="relative w-full h-full overflow-hidden aspect-square">
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={0}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true, dynamicBullets: true }}
        className="w-full h-full"
      >
        {post.media.map((image) => (
          <SwiperSlide
            key={image.id}
            className="bg-black flex items-center justify-center"
          >
            <FeedCardImage post={post} imageUrl={image.url} />
          </SwiperSlide>
        ))}
      </Swiper>
      <style>{carouselStyles}</style>
    </div>
  );
});

FeedImageCarousel.displayName = "FeedImageCarousel";
