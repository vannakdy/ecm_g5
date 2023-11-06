import {BrowserRouter,Routes,Route} from "react-router-dom"
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'; // from bootstrap
import HomePage from "./page/home/HomePage";
import AboutPage from "./page/about/AboutPage";
import LoginPage from "./page/auth/LoginPage";
import RegisterPage from "./page/auth/RegisterPage"
import CategoryPage from "./page/category/CategoryPage";
import CustomerPage from "./page/customer/CustomerPage";
import EmplyeePage from "./page/employee/EmployeePage";
import Layout from "./component/layout/Layout";
import LayoutLogin from "./component/layout/LayoutLogin";
import { useEffect } from "react";

function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route path="" element={<HomePage />}/>
          <Route path="category" element={<CategoryPage />}/>
          <Route path="customer" element={<CustomerPage/>} />
          <Route path="employee" element={<EmplyeePage />} />
          <Route path="about" element={<AboutPage/>} />
          <Route path="*" element={<h1>Route Not Found</h1>} />
        </Route>

        <Route path="/" element={<LayoutLogin/>}>
          <Route path="login" element={<LoginPage/>} />
          <Route path="register" element={<RegisterPage/>} />
        </Route>

      </Routes>
    </BrowserRouter>
  )
}

export default App;