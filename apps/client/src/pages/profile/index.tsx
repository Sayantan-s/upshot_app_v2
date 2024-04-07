import { ProfileTabs } from '@client/components/ui/Tabs';
import { Outlet } from 'react-router-dom';

export const ProfileLayout = () => {
  return (
    <div className="flex-1 bg-red-100">
      <div>Profile</div>
      <ProfileTabs />
      <Outlet />
    </div>
  );
};
