import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./Components/Header/Header";
import Home from "./Routes/Home/Home";
import Alarm from "./Components/Collection/Alarm/Alarm";
import { useSelector } from "react-redux";
<<<<<<< HEAD
import Success from "./Components/Auth/SignUp/Success/Success";
=======
import Footer from "./Components/Footer/Footer";
>>>>>>> fd124551922ae4dddf3aeda52fc4da305738f3c1

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Success />
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
        <Alarm />
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
