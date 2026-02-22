export const Avatar = ({ imageUrl }: { imageUrl?: string }) => {
  return (
    <div className="w-9 h-9 md:w-15 md:h-15 shrink-0">
      <img
        src={imageUrl || "/ig-default.jpg"}
        className="rounded-full w-full h-full object-cover"
      />
    </div>
  );
};
