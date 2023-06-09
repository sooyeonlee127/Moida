import "./App.css";
import styled from "styled-components";
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
import ReviewUpdatePage from "./pages/ReviewUpdatePage";
import AuthCordPage from "./pages/Admin/AuthCodePage";
import AdminPage from "./pages/Admin";
import PublicRoute from "./routes/PublicRoute";
import PrivateRoute from "./routes/PrivateRoute";
import HjooPage from "./pages/ethers/HjooPage";
import ReviewCreatePage from "./pages/ReviewCreatePage";
import VolunteerCodePage from "./pages/Admin/VolunteerCodePage";
import NftPage from "./pages/NftPage/nftPage";
import NftTestPage from "./pages/NftPage/NftTestPage";
import BlockChain from "./context/BlockChain";
import NotFoundPage from "./components/NotFoundPage"
// import { useBeforeunload } from "react-beforeunload";
import Footer from "./components/Footer/Index";
import MetamaskCheck from "./components/MetamaskCheck";
import AnimationPage from "./pages/AnimationPage";

export default function App() {
  // useBeforeunload((event) => event.preventDefault()); // 새로고침 막기 보류

  return (
    <Auth>
      <BlockChain>
        <div className="App">
          <NavBar />
          <Body>
            <Routes>
              <Route element={<PublicRoute />}>
                <Route path={"/login"} element={<LoginPage />} />
                <Route path={"/signup"} element={<SignupPage />} />
                <Route path={"/password"} element={<PasswordPage />} />
              </Route>
              <Route element={<PrivateRoute />}>
                <Route
                  path={"/admin/project/create"}
                  element={<ProjectCreatePage />}
                />
                <Route
                  path={"/admin/notice/:projectid"}
                  element={<NoticeCreatePage />}
                />
                <Route
                  path={"/admin/notice/update/:boardid"}
                  element={<NoticeUpdatePage />}
                />
                <Route
                  path={"/review/update/:reviewid"}
                  element={<ReviewUpdatePage />}
                />
                <Route path={"/admin/authcord"} element={<AuthCordPage />} />
                <Route
                  path={"/admin/volunteer"}
                  element={<VolunteerCodePage />}
                />
                <Route path={"/admin"} element={<AdminPage />} />
                <Route path={"/payresult"} element={<PayResult />} />
                <Route path={"/review/create"} element={<ReviewCreatePage />} />
                <Route path={"/profile"} element={<ProfilePage />} />
              </Route>
              <Route path={"/"} element={<MainPage />} />
              <Route path={"/donation"} element={<DonationPage />} />
              <Route
                path={"/donation/:projectId"}
                element={<DonationDetailPage />}
              />
              <Route path={"/gatcha"} element={<GatchaPage />} />
              <Route path={"/point"} element={<PointPage />} />

              <Route path={"/review"} element={<ReviewPage />} />
              <Route
                path={"/review/:reviewid"}
                element={<ReviewDetailPage />}
              />
              <Route
                path={"/notice/:category"}
                element={<NoticeDetailPage />}
              />
              <Route path={"/hjooo"} element={<HjooPage />} />
              <Route path={"/sun"} element={<NftPage />} />
              <Route path={"/sunny"} element={<NftTestPage />} />
              <Route path={"/check"} element={<MetamaskCheck />} />
              <Route path={"/event"} element={<AnimationPage />} />
              <Route path={"/*"} element={<NotFoundPage/>}/>
            </Routes>
          </Body>
          <Footer/>
        </div>
      </BlockChain>
    </Auth>
  );
}
// nav와 content 분리용 - 이은혁
const Body = styled.div`
  width: 100%;
  min-height: 100vh;
  padding-top: 100px;
  position: relative;
`;
