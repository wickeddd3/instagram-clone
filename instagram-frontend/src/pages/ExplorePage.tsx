import { ExploreFeed } from "@/widgets/explore-feed";
import { usePostNavigationModal } from "@/widgets/post-modal";

const ExplorePage = () => {
  const { openPostDetailsNavigationModal } = usePostNavigationModal();

  return <ExploreFeed onOpenPost={openPostDetailsNavigationModal} />;
};

export default ExplorePage;
