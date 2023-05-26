import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./Components/Header/Header";
import Home from "./Routes/Home/Home";
import Alarm from "./Components/Collection/Alarm/Alarm";
import Footer from "./Components/Footer/Footer";
import Product from "./Routes/Product/Product";
import Category from "./Routes/Category/Category";
import Results from "./Routes/Results/Results";
import Activate from "./Components/Auth/Activate/Activate";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:category" element={<Category />} />
          <Route
            path="/:subCategory/:productSlug"
            element={<Product />}
          />
          <Route path="/search/:searchQuery" element={<Results />} />
          <Route path="/auth/users/activation/:uid/:token" element={<Home />} />
          <Route
            path="/auth/users/password/reset/confirm/:uid/:token"
            element={<Home />}
          />
        </Routes>
        <Alarm />
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
