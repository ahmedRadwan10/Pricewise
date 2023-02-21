import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./Components/Header/Header";
import Login from "./Components/Login/Login";
import Overlay from "./Components/Overlay/Overlay";
import Home from "./Routes/Home/Home";

function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [showOverlay, setShowOverLay] = useState(false);
  const handleShowLogin = () => {
    setShowLogin(!showLogin);
    setShowOverLay(!showOverlay);
  };
  return (
    <div className="App">
      <BrowserRouter>
        <Header handleShowLogin={handleShowLogin} />
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
        <Login showLogin={showLogin} handleShowLogin={handleShowLogin} />
        <Overlay showOverlay={showOverlay} />
      </BrowserRouter>
    </div>
  );
}

export default App;
