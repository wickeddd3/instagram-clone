import { SuggestedProfiles } from "@/widgets/suggested-profiles";

const ExplorePeoplePage = () => {
  return (
    <div className="flex w-full max-w-xl">
      <div className="flex-1 flex flex-col gap-6 mt-6 md:mt-18 p-4">
        <h1 className="text-md font-bold text-gray-100">Suggested</h1>
        <SuggestedProfiles limit={15} />
      </div>
    </div>
  );
};

export default ExplorePeoplePage;
