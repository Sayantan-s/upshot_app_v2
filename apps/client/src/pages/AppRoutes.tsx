import { ManualEditing } from '@client/components/pages/product/manulediting';
import RootLayout from '@client/components/shared/Layouts/Rootlayout';
import { Sidebar } from '@client/components/shared/Layouts/Sidebar';
import Trending from '@client/components/shared/Layouts/Trending';
import { WrapperLayout } from '@client/components/shared/Layouts/WrapperLayout';
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
import { Products } from './product';
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
            <Route element={<Trending />}>
              <Route element={<Sidebar />}>
                <Route element={<WrapperLayout />}>
                  <Route index element={<Home />} />
                  <Route path="chat" element={<Messages />} />
                </Route>
              </Route>
              <Route path="profile" element={<Profile />} />
              <Route element={<Products />} path="profile/product" />
              <Route element={<Products />} path="profile/product/:productId" />
            </Route>
          </Route>
          <Route path="product/onboard" element={<ProductUpload />} />
          <Route path="product/edit/:productId" element={<ManualEditing />} />
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
