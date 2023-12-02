import { ProfilePopper } from "./ProfilePopper";
import { RecentActivity } from "./RecentActivity";

export const Trending = () => {
  return (
    <div className="flex-[0.23] h-full relative">
      <div className="py-8 space-y-5 h-full">
        <ProfilePopper />
        <RecentActivity />
      </div>
    </div>
  );
};

export default Trending;
