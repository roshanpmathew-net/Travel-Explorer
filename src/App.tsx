import "./App.css";
import { Routes, Route } from "react-router-dom";
import Explore from "./pages/Explore";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Country from "./pages/Country";
import Compare from "./pages/Compare";
import Favorites from "./pages/Favorites";
import Home from "./pages/Home";
import Layout from "./layouts/Layout";
import Plans from "./pages/Plans";
import AdminPage from "./pages/AdminPage";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useEffect } from "react";
import i18n from "./i18n";

function App() {
  const lang = useSelector((state: any) => state.language.language);

  useEffect(() => {
    i18n.changeLanguage(lang);
  }, [lang]);

  return (
    <>
      <>
        <ToastContainer
          position="bottom-right"
          autoClose={3000}
          newestOnTop
          pauseOnHover
          draggable
          theme="dark"
        />
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/country/:name" element={<Country />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/compare" element={<Compare />} />
            <Route path="/plans" element={<Plans />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </>
    </>
  );
}

export default App;
