import React from 'react'
import loginIcons from '../assest/signin.gif'
import { useSelector } from 'react-redux'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import ROLE from '../common/role'
import { useEffect } from 'react'
const AdminPanel = () => {
    const user=useSelector(state=>state.user?.user)
   // console.log(user)
   const navigate=useNavigate()
     useEffect(()=>{
        if(user?.role!==ROLE.ADMIN){
            navigate("/") 
        }
     },[user])

  return (
    <div className='min-h-[calc(100vh-120px)] md:flex hidden'>
        <aside className='bg-sky-300 min-h-full w-full max-w-60 customShadow'>
            <div className='h-32 justify-center items-center flex-col'>
            <div className='w-20 h-10 mx-auto my-10'>
                <img src={loginIcons} alt='login icons'/>
                
            </div>
           <div className='flex col-s justify-center '>
           <p className='capitalize text-lg font-semibold text-white'>{user?.username}</p>
           </div>
           <div className='flex col-s justify-center'>
           <p className='capitalize text-sm text-white'>{user?.role}</p>
           </div>
            </div>
            <div>
                <nav className='grid p-4'>
                    <Link to={"all-users"} className='px-2 py-1 hover:scale-105 hover:bg-sky-400 text-white font-medium'>All Users</Link>
                    <Link to={"all-products"} className='px-2 py-1 hover:scale-105 hover:bg-sky-400  text-white font-medium'>All Products</Link>
                </nav>
            </div>
            
            
        </aside>
        <main className='w-full h-full p-2'>
          <Outlet></Outlet>
        </main>
    </div>
  )
}

export default AdminPanel