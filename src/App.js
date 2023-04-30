import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./Components/Header/Header";
import Home from "./Routes/Home/Home";
import Alarm from "./Components/Collection/Alarm/Alarm";
import Footer from "./Components/Footer/Footer";
import Product from "./Routes/Product/Product";
import Category from "./Routes/Category/Category";
import Results from "./Routes/Results/Results";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:category" element={<Category />} />
          <Route
            path="/:subCategory/:productName/:productID"
            element={<Product />}
          />
          <Route path="/search/:searchQuery" element={<Results />} />
        </Routes>
        <Alarm />
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
