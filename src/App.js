import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./Components/Header/Header";
import Home from "./Routes/Home/Home";
import Alarm from "./Components/Collection/Alarm/Alarm";
import Footer from "./Components/Footer/Footer";
import Product from "./Routes/Product/Product";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:subCategory/:productName/:productID" element={<Product />} />
        </Routes>
        <Alarm />
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
