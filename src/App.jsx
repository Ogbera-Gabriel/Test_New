import "./App.css";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import HomePage from "./pages/Home/homePage";
import SignUpPage from "./pages/SignUp/signUpPage";
import SignInPage from "./pages/SignIn/signInPage";
import ThemeContextProvider from "./components/theme/ThemeContexeProvider";

function App() {
  return (
    <Router>
      <ThemeContextProvider>
      <div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/signin" element={<SignInPage />} />
        </Routes>
      </div>
    </ThemeContextProvider>
    </Router>
    
  );
}

export default App;
