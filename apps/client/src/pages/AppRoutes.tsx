import RootLayout from '@client/components/shared/Layouts/Rootlayout';
import { SidebarLayout } from '@client/components/shared/Layouts/Sidebar';
import { TrendingLayout } from '@client/components/shared/Layouts/Trending';
import { FeedLayout } from '@client/components/shared/Layouts/WrapperLayout';
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
import { ProfileLayout } from './profile';
import { Shots } from './shots';
import { ManualEdits } from './shots/manualedits';

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
            <Route element={<TrendingLayout />}>
              <Route element={<SidebarLayout />}>
                <Route element={<FeedLayout />}>
                  <Route index element={<Home />} />
                  <Route path="chat" element={<Messages />} />
                </Route>
              </Route>
              <Route element={<ProfileLayout />}>
                <Route element={<Products />} path="/products" />
                <Route element={<Shots />} path="/shots" />
              </Route>
            </Route>
          </Route>
          <Route path="product/onboard" element={<ProductUpload />} />
          <Route path="product/:productId/edit" element={<ManualEdits />} />
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
