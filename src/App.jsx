
import './App.css'
import Navbar from './components/navbar'
import Manger from './components/manger'
import Footer from './components/Footer'
function App() {
  return (
    <>
    
    <Navbar/>
    <div className=' bg-green-100 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]'><Manger/></div>
    <Footer/>
      
    </>
  )
}

export default App
