import { Fragment } from 'react';
import { Outlet } from 'react-router-dom';
import { ProfilePopper } from './ProfilePopper';
import { RecentActivity } from './RecentActivity';

export const Trending = () => {
  return (
    <Fragment>
      <Outlet />
      <div className="flex-[0.23] h-full relative">
        <div className="py-8 space-y-5 h-full">
          <ProfilePopper />
          <RecentActivity />
        </div>
      </div>
    </Fragment>
  );
};

export default Trending;
