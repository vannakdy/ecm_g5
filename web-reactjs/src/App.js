import {BrowserRouter,Routes,Route} from "react-router-dom"
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'; // from bootstrap
import HomePage from "./page/home/HomePage";
import AboutPage from "./page/about/AboutPage";
import LoginPage from "./page/auth/LoginPage";
import RegisterPage from "./page/auth/RegisterPage"
import Layout from "./component/layout/Layout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route path="" element={<HomePage />}/>
          <Route path="about" element={<AboutPage/>} />
          <Route path="login" element={<LoginPage/>} />
          <Route path="register" element={<RegisterPage/>} />
          <Route path="*" element={<h1>Route Not Found</h1>} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;