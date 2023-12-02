import { useSelector } from '@client/store';
import { User } from '@client/store/types/auth';

export const useUser = () => useSelector((state) => state.auth.user);

export const useAuthor = (inputUser: User) => {
  const user = useUser()!;
  return user.id === inputUser.id;
};
