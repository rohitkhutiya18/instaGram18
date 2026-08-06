import { createBrowserRouter } from "react-router-dom";

import { lazy } from "react";
import FeedSection from "../pages/FeedSection";
import CreatePost from "../pages/CreatePost";
import UpdatePost from "../pages/UpdatePost";
import EditProfileForm from "../pages/EditProfileForm";
import CreaterProfile from "../pages/CreaterProfile";
import ProtectedRoutes from "../layout/ProtectedRoutes";
import EmailVerifyForPassword from "../features/auth/forgetPassword/EmailVerifyForPassword";
import ForgetPasswordPage from "../features/auth/forgetPassword/ForgetPasswordPage";

const Profile = lazy(() => import("../pages/Profile"));
const Login = lazy(() => import("../features/auth/login/page/Login"));
const Register = lazy(() => import("../features/auth/register/page/Register"));
const EmailVerification = lazy(
  () => import("../features/auth/verify-email/EmailVerification"),
);
const Home = lazy(() => import("../pages/Home"));
const Chat = lazy(() => import("../features/chat/Chat"));

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    children: [
      { element: <FeedSection />, path: "/" },
      {
        element: (
          <ProtectedRoutes>
            <CreatePost />
          </ProtectedRoutes>
        ),

        path: "create-post",
      },
      {
        element: (
          <ProtectedRoutes>
            <Profile />
          </ProtectedRoutes>
        ),
        path: "profile",
      },
      { element: (<ProtectedRoutes>
        <UpdatePost />
      </ProtectedRoutes>
      ), path: "update-post/:id" },
      {
        element: (
          <ProtectedRoutes>
            <EditProfileForm />
          </ProtectedRoutes>
        ),
        path: "update-profile",
      },
      {
        element: (
          <ProtectedRoutes>
            <Chat />
          </ProtectedRoutes>
        ),
        path: "chat",
      },
      { element: <CreaterProfile />, path: "/profile/:userName" },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/verify-email",
    element: <EmailVerification />,
  },
  {
    path:"/verify-email-forget-password",
    element:<EmailVerifyForPassword/>
  },
  {
    path:'/forget-password',
    element:<ForgetPasswordPage/>
  }
]);
