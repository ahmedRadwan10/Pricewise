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
import { useTranslation, initReactI18next } from "react-i18next";
import i18n from "i18next";

i18n.use(initReactI18next).init({
  lng: "en", // Set the default language
  resources: {
    en: {
      translation: require("./locales/en.json"),
    },
    ar: {
      translation: require("./locales/ar.json"),
    },
  },
});

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
