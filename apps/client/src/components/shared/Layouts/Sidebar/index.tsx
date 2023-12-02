import { Logo } from '@client/components/shared';
import { CurrentInteractions } from './CurrentInteractions';
import { Genre } from './Genre';
import { ProfileCard } from './ProfileCard';
import Searchbar from './Searchbar';

export const Sidebar = () => {
  return (
    <div className="flex flex-col py-8 h-full relative">
      <div className="flex space-x-3">
        <Logo withName={false} />
        <Searchbar />
      </div>
      <div className="mt-6 space-y-10">
        <ProfileCard />
        <Genre />
        <CurrentInteractions />
      </div>
      {/* <ProfilePopper /> */}
    </div>
  );
};
