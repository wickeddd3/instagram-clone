export const EmptyComments = () => {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center py-12">
      <span className="text-md md:text-xl font-semibold text-neutral-100">
        No comments yet.
      </span>
      <span className="text-xs md:text-sm font-normal text-neutral-200">
        Start the conversation.
      </span>
    </div>
  );
};
