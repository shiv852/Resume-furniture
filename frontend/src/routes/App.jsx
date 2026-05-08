import Header from '../components/Header'
import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/custom.css'; // Import custom CSS for scrollbar styles
import { ItemProvider } from '../store/Item_store';

function App() {
  return (
    <>
    <ItemProvider>
      <ToastContainer />  {/* this is the notification msg like a alt msg toastcontainer  */}
      <Header/>
      <Outlet/>
      <Footer/>
    </ItemProvider>
    </>
  )
}

export default App
