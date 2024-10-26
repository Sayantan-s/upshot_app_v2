import { Outlet } from 'react-router-dom';

export const ProfileLayout = () => {
  return (
    <div className="flex-1">
      <h1 className="font-bold text-gray-800 text-lg">My Profile</h1>
      <Outlet />
    </div>
  );
};
