import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./Pages/Home"
import Navbar from "./components/Navbar"
import About from "./Pages/About"
import PageNotFound from "./Pages/PageNotFound"
import Profile from "./Pages/Profile"
import SignIn from "./Pages/SignIn"
import SignUp from "./Pages/SignUp"

const App = () => {
  return (
    <BrowserRouter>
    <Navbar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  </BrowserRouter>
  )
}

export default App
