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

import { useSelector } from "react-redux";
import { useEffect } from "react";
import i18n from "./i18n";

function App() {

    const lang = useSelector((state: any)=>state.language.language);

    useEffect(()=>{
      i18n.changeLanguage(lang)
    }, [lang])


  return (
    <>
      <>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/country/:name" element={<Country />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/compare" element={<Compare />} />
          </Route>
          <Route path="/login" element={<Login />} />
        </Routes>
      </>
    </>
  );
}

export default App;
