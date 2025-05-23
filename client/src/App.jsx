import { Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import MovieDetail from "./pages/MovieDetail";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MovieListPage from "./pages/MovieListPage";
import Favorite from "./pages/Favorite";
import OtpPage from "./pages/OtpPage";
import PrivateRoute from "./components/PrivateRoute";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage></HomePage>}></Route>
        <Route path="/login" element={<Login></Login>}></Route>
        <Route path="/sign-up" element={<SignUp></SignUp>}></Route>
        <Route path="/profile" element={<PrivateRoute> <UserProfile/></PrivateRoute>} ></Route>
        <Route path="/verify-otp" element={<OtpPage></OtpPage>}></Route>
        <Route path="/phim/:slug" element={<MovieDetail></MovieDetail>}></Route>
        <Route
          path="/danh-sach/phim-moi-cap-nhat"
          element={
            <MovieListPage title="New Updates" fetchType="phim-moi-cap-nhat" />
          }
        />
        <Route
          path="/danh-sach/phim-le"
          element={<MovieListPage title="Single Movies" fetchType="phim-le" />}
        />
        <Route
          path="/danh-sach/phim-bo"
          element={<MovieListPage title="Series Movies" fetchType="phim-bo" />}
        />
        <Route
          path="/danh-sach/tv-shows"
          element={<MovieListPage title="TV Shows" fetchType="tv-shows" />}
        />
        <Route
          path="/danh-sach/hoat-hinh"
          element={<MovieListPage title="Anime" fetchType="hoat-hinh" />}
        />
        <Route
          path="/danh-sach-uu-thich"
          element={
            <PrivateRoute>
              <Favorite />
            </PrivateRoute>
          }
        ></Route>
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
