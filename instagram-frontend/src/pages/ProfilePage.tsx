import { useParams } from "react-router-dom";
import { AccountProfile } from "@/widgets/account-profile";

const ProfilePage = () => {
  const { username } = useParams();

  return <AccountProfile username={username || ""} />;
};

export default ProfilePage;
