import { useAppActions, useAppSelector } from "@src/store/useRedux.hook";
import { UserRole } from "@src/types/models/UserDTO";

export const useIsAuth = () => {
  const { token, user } = useAppSelector((state) => state.auth);
  const { logout } = useAppActions();

  const isAuth = !!(token?.access_token && user?.userRole && user?.username);
  const isAdmin = isAuth && user?.userRole && user.userRole === UserRole.ADMIN;

  return { isAuth, user, logout, token, isAdmin };
};
