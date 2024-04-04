import "./App.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ContentPage from "./page/ContentPage/ContentPage";
import Header from "./components/Header/Header";
import SignUpPage from "./page/SignUpPage/SignUpPage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<ContentPage />} />
          <Route path="/signup" element={<SignUpPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
