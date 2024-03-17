import { ManualEditing } from '@client/components/pages/product/manulediting';
import RootLayout from '@client/components/shared/Layouts/Rootlayout';
import { useTitle } from '@client/hooks/useTitle';
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import {
  ForgotPassword,
  Login,
  Register,
  RequireAuth,
  RequireUserDetails,
  UnProtectedRoutes,
  UserDetails,
} from './auth';
import { Design } from './design';
import { ErrorPage } from './error';
import { Home } from './home';
import { Messages } from './messages';
import { ProductUpload } from './product/productupload';
import { Profile } from './profile';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route path="design" element={<Design />} />
      <Route path="details" element={<UserDetails />} />
      <Route element={<UnProtectedRoutes />}>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="forgotpwd" element={<ForgotPassword />} />
      </Route>
      <Route element={<RequireAuth />}>
        <Route element={<RequireUserDetails />}>
          <Route element={<RootLayout />}>
            <Route index element={<Home />} />
            <Route path="profile" element={<Profile />} />
            <Route path="chat" element={<Messages />} />
          </Route>
          <Route path="product/upload" element={<ProductUpload />} />
          <Route
            path="product/postmanualedits/:productId"
            element={<ManualEditing />}
          />
        </Route>
      </Route>
      <Route path="*" element={<ErrorPage />} />
    </Route>
  )
);

export const AppRoutes = () => {
  useTitle();
  return <RouterProvider router={router} />;
};
