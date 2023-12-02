import { Loader } from '@client/components/ui';
import { useAuth, useToggle } from '@client/hooks';
import { authApi } from '@client/store/services/auth';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import {
  ArrowDown2,
  Drop,
  Logout,
  MessageCircle,
  UserSquare,
} from 'iconsax-react';
import { Link } from 'react-router-dom';

const navigations = [
  {
    icon: UserSquare,
    to: '/profile',
    displayValue: 'Profile',
  },
  {
    icon: Drop,
    to: '/products',
    displayValue: 'My products',
  },
  {
    icon: MessageCircle,
    to: '/chat',
    displayValue: 'Interactions',
  },
];

export const ProfilePopper = () => {
  const { user } = useAuth();
  const [isOpen, { off, setState }] = useToggle();

  const [logout, { isLoading }] = authApi.useLogoutMutation();

  const handleLogout = async () => {
    await logout(null).unwrap();
    off();
  };

  return (
    <DropdownMenu.Root open={isOpen} onOpenChange={setState}>
      <DropdownMenu.Trigger className="bg-neutral-50 w-10/12 px-4 py-2 flex items-center justify-between truncate focus:outline-none rounded-2xl relative left-full transform -translate-x-full">
        <div className="flex items-center space-x-2">
          <div className="w-7 h-7 rounded-full overflow-hidden relative border-white border-2">
            <img
              src={user?.profilePic}
              className="absolute top-0 left-0 object-cover object-center"
              alt="user display pic"
            />
          </div>
          <p className="text-neutral-900">
            {user?.firstName} {user?.lastName}
          </p>
        </div>
        <button>
          <ArrowDown2 size={16} color="rgb(23,23,23)" />
        </button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          align="end"
          sideOffset={10}
          className="bg-white space-y-4 w-60 h-full shadow-lg shadow-slate-600/5 flex flex-col rounded-xl p-3"
        >
          {navigations.map((navigation) => (
            <LinkDropDown key={navigation.to} {...navigation} />
          ))}
          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 outline-none"
          >
            {isLoading ? (
              <Loader size={'md'} variant={'danger.ghost'} />
            ) : (
              <Logout size={20} color="rgb(244,63,94)" variant="Outline" />
            )}
            <span className="font-[600] text-rose-500">Logout</span>
          </button>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

const LinkDropDown = ({
  to,
  displayValue,
  icon: Icon,
}: (typeof navigations)[number]) => {
  const [isHovered, { on, off }] = useToggle();

  return (
    <DropdownMenu.Item
      role="link"
      className="outline-none group"
      key={to}
      onMouseOver={on}
      onMouseOut={off}
    >
      <Link to={to} className="flex items-center space-x-2">
        <Icon
          size={20}
          variant="Bulk"
          color={isHovered ? 'rgb(52,211,153)' : 'rgb(148,163,184)'}
        />
        <span className="text-slate-400 font-[600] group-hover:text-emerald-400">
          {displayValue}
        </span>
      </Link>
    </DropdownMenu.Item>
  );
};
