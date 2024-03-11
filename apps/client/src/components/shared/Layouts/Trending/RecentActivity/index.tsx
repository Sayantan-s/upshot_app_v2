import { NotificationsListWidget } from './ChatListWidget';
import { Copyright } from './Copyright';

export const RecentActivity = () => {
  return (
    <div className="h-screen">
      <NotificationsListWidget />
      <Copyright />
    </div>
  );
};
