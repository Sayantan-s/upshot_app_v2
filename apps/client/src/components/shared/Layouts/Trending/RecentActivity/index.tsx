import { ChatListWidget } from './ChatListWidget';
import { Copyright } from './Copyright';

export const RecentActivity = () => {
  return (
    <div className="h-screen">
      <ChatListWidget />
      <Copyright />
    </div>
  );
};
