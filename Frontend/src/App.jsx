import Navbar from './Component/Navbar'
import '../src/assets/Style/Home.css'
import { BrowserRouter, Route, Routes } from "react-router-dom";
function App() {
  return (
      <>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navbar/>}/>
      </Routes>
      </BrowserRouter>
      </>
  )
}

export default App
