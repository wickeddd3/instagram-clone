import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { StoriesSkeleton } from "./StoriesSkeleton";
import { useAuth } from "@/app/providers/AuthContext";
import { useCreateStoryModal } from "@/widgets/create-story-modal";
import { useStories } from "../model/useStories";
import { PlusCircle } from "lucide-react";
import { Avatar } from "@/shared/ui/Avatar";

export const Stories = () => {
  const { authUser } = useAuth();
  const profileId = authUser?.id;

  const { openCreateStoryModal } = useCreateStoryModal();
  const { stories, loading } = useStories({ profileId: profileId || "" });

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
        {/* Current User "Add Story" */}
        <SwiperSlide key={"add-story"} className="w-auto! pr-2">
          <button className="flex flex-col items-center gap-1 min-w-[70px]">
            <div
              onClick={openCreateStoryModal}
              className="relative w-21 h-21 rounded-full border-2 border-dashed border-zinc-700 flex items-center justify-center cursor-pointer"
            >
              <PlusCircle size={24} className="text-zinc-400" />
            </div>
            <span className="text-[11px] text-zinc-400">Your Story</span>
          </button>
        </SwiperSlide>
        {/* Other Users' Stories */}
        {stories.map((group) => (
          <SwiperSlide key={group.id} className="w-auto!">
            <button className="flex flex-col items-center gap-1 cursor-pointer">
              {/* Gradient Ring */}
              <div
                className={`w-21 h-21 p-[3px] rounded-full bg-linear-to-tr ${group.hasUnseenStories ? "from-yellow-400 to-fuchsia-600" : "from-zinc-700 to-zinc-800"}`}
              >
                <div className="bg-[#0d1015] p-1 rounded-full w-full h-full">
                  <Avatar
                    imageUrl={group.avatarUrl}
                    className="w-full h-full"
                  />
                </div>
              </div>
              <span className="text-xs text-gray-200 truncate w-[74px] text-center">
                {group.username}
              </span>
            </button>
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
