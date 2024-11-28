import { BrowserRouter, Routes , Route } from "react-router-dom";
import Home from "./pages/Home";
import SignIn from "./pages/Signin";
import About from "./pages/about";
import Profile from "./pages/Profile";
import SignUp from "./pages/SignUp";
import Header from "./components/Header";

export default function App() {
  return(
  <BrowserRouter>
   <Header />
   <Routes>
     <Route path="/" element={<Home/>} />
     <Route path="Sign-in" element={<SignIn/>} />
     <Route path="/Sign-up" element={<SignUp/>} />
     <Route path="/about" element={<About/>} />
     <Route path="/profile" element={<Profile/>} />

   </Routes>
    </BrowserRouter>
  )
}
