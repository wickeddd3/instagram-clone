export const NoViewers = ({ text = "No viewers yet" }: { text?: string }) => {
  return <p className="text-subtle text-center mt-10">{text}</p>;
};
