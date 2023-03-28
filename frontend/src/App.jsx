import "./App.css";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/MainPage";
import DonationPage from "./pages/DonationPage";
import DonationDetailPage from "./pages/DonationDetailPage";
import GatchaPage from "./pages/GatchaPage";
import PointPage from "./pages/PointPage";
import ProfilePage from "./pages/ProfilePage";
import ReviewPage from "./pages/ReviewPage";
import ReviewDetailPage from "./pages/ReviewDetailPage";
import NoticeDetailPage from "./pages/NoticeDetailPage";
import SignupPage from "./pages/SignupPage";
import PayResult from "./pages/PointPage/components/PayResult";
import Auth from "./context/Auth";
import NavBar from "./components/NavBar/index.jsx";
import PasswordPage from "./pages/PasswordPage";
import ProjectCreatePage from "./pages/Admin/ProjectCreatePage";
import NoticeUpdatePage from "./pages/Admin/NoticeUpdatePage";
import NoticeCreatePage from "./pages/Admin/NoticeCreatePage";

export default function App() {
  return (
    <Auth>
      <div className="App">
        <NavBar />
        <Routes>
          <Route path={"/login"} element={<LoginPage />} />
          <Route path={"/"} element={<MainPage />} />
          <Route path={"/donation"} element={<DonationPage />} />
          <Route
            path={"/donation/:donationid"}
            element={<DonationDetailPage />}
          />
          <Route path={"/gatcha"} element={<GatchaPage />} />
          <Route path={"/point"} element={<PointPage />} />
          <Route path={"/profile"} element={<ProfilePage />} />
          <Route path={"/review"} element={<ReviewPage />} />
          <Route path={"/review/:reviewid"} element={<ReviewDetailPage />} />
          <Route path={"/notice/:noticeid"} element={<NoticeDetailPage />} />
          <Route path={"/signup"} element={<SignupPage />} />
          <Route path={"/payresult"} element={<PayResult />} />
          <Route
            path={"/admin/project/create"}
            element={<ProjectCreatePage />}
          />
          <Route path={"/password"} element={<PasswordPage />} />
          <Route
            path={"/admin/notice/:projectid"}
            element={<NoticeCreatePage />}
          />
          <Route
            path={"/admin/notice/update/:boardid"}
            element={<NoticeUpdatePage />}
          />
        </Routes>
      </div>
    </Auth>
  );
}
