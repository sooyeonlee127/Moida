import NavBar from "./components/NavBar";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/MainPage";
import DonationPage from "./pages/DonationPage";
import DonationDetailPage from "./pages/DonationDetailPage";
import GatchaPage from "./pages/GatchaPage";
import PointPage from "./pages/PointPage";
import ProfilePage from "./pages/ProfilePage";
// import ReviewPage from "./pages/ReviewPage";
import SignupPage from "./pages/SignupPage";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path={"/login"} element={<LoginPage />} />
        <Route path={"/"} element={<MainPage />} />
        <Route path={"/donation"} element={<DonationPage />} />
        <Route path={"/donation/:donationid"} element={<DonationDetailPage />} />
        <Route path={"/gatcha"} element={<GatchaPage />} />
        <Route path={"/point"} element={<PointPage />} />
        <Route path={"/profile"} element={<ProfilePage />} />
        {/* <Route path={"/review"} element={<ReviewPage />} /> */}
        <Route path={"/signup"} element={<SignupPage />} />
      </Routes>
    </div>
  );
}

export default App;
