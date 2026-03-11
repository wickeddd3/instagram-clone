export const NoViewers = ({ text = "No viewers yet" }: { text?: string }) => {
  return <p className="text-neutral-500 text-center mt-10">{text}</p>;
};
