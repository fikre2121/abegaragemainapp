import { useState, } from 'react'
import { Route,Routes } from "react-router-dom"
import Home from "./markup/pages/home/Home"
import Login from "./markup/pages/login/Login"
import Addemployee from "./markup/pages/admin/addemployee/Addemployee"
// importing the css files
import "./assets/templateassets/css/bootstrap.css"
import "./assets/templateassets/css/style.css";
import "./assets/templateassets/css/responsive.css";
import "./assets/templateassets/css/color.css";
// custom css
import "./assets/styles/custom.css"

// components
import Header from './markup/components/header/Header'
import Foter from './markup/components/footer/Foter'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Header/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/admin/add-employee" element={<Addemployee/>} />
      </Routes>
      <Foter/>
    </>
  );
}

export default App
