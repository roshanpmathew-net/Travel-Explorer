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

function App() {
  return (
    <>
      <>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/country/:id" element={<Country />} />
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
