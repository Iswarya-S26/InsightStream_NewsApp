import "./App.css";
import NavbarComponent from "./components/NavbarComponent";
import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import CategoryNews from "./pages/CategoryNews";
import SearchResults from "./pages/SearchResults";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="App">
      <NavbarComponent />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/business" element={<CategoryNews />} />
        <Route path="/entertainment" element={<CategoryNews />} />
        <Route path="/general" element={<CategoryNews />} />
        <Route path="/health" element={<CategoryNews />} />
        <Route path="/science" element={<CategoryNews />} />
        <Route path="/sports" element={<CategoryNews />} />
        <Route path="/technology" element={<CategoryNews />} />
        <Route path="/search" element={<SearchResults />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
