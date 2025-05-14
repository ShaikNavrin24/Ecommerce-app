
import { Outlet } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Context from './context';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';
import SummaryApi from './common';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { setUserDetails } from './store/userSlice';
function App() {
  const dispatch=useDispatch()
  const [cartProductCount,setCardProductCount]=useState(0)
const fetchUserDetails=async()=>{
  const dataResponse=await fetch(SummaryApi.current_user.url,{
    method:SummaryApi.current_user.method,
    credentials:'include'
  })

  const dataApi=await dataResponse.json()

  if(dataApi.success){
     dispatch(setUserDetails(dataApi.data))
  }
 
}
const fetchUserAddToCart=async()=>{
  const dataResponse=await fetch(SummaryApi.addToCartProductCount.url,{
    method:SummaryApi.addToCartProductCount.method,
    credentials:'include'
  })

  const dataApi=await dataResponse.json()

   console.log("dataApi",dataApi)
   setCardProductCount(dataApi?.data?.count)
}
  useEffect(()=>{
    //userdetails
    fetchUserDetails()
    fetchUserAddToCart()

  },[])
  return (
    <>
    <Context.Provider value={{  
        fetchUserDetails,
        cartProductCount,
        fetchUserAddToCart
    }}>
    <ToastContainer position='top-center'/>
    <Header/>
    <main className='min-h-[calc(100vh-120px)]  p-1'>
   <Outlet/>
   </main>
   <Footer/>
   </Context.Provider>
   </>
  );
}

export default App;
