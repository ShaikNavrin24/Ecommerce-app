import React, { useContext } from 'react'
import loginIcons from '../assest/signin.gif'
import { FaEye } from "react-icons/fa";
import { useState } from 'react';
import { FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import Context from '../context';
const Login = () => {
    const [showPassword,setshowPassword]=useState(false)
    const [data,setData]=useState({
        username:"",
        password:""
    })

    const navigate=useNavigate()
     const {fetchUserDetails,fetchUserAddToCart}=useContext(Context)
    const handleOnChange=(e)=>{
        const {name,value}=e.target
        setData((preve)=>{
            return{
                ...preve,
                [name]:value
            }
        })
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
      
        const dataResponse = await fetch(SummaryApi.signIn.url, {
          method: SummaryApi.signIn.method, // Specify the method separately
          credentials: 'include',
          headers: {
            "content-type": "application/json"
          },
          body: JSON.stringify(data)
        });
      
        const dataApi = await dataResponse.json();
      
        if (dataApi.success) {
          toast.success(dataApi.message);
          
          navigate('/')
          fetchUserDetails()
          fetchUserAddToCart()
        } else {
          toast.error(dataApi.message);
        }
      }
      
    console.log(data)
  return (
     <section id='login'>
        <div className='mx-auto container p-4'></div>
          <div className='bg-white p-5 py-5 w-full max-w-sm mx-auto'>
            <div className='w-20 h-10 mx-auto'>
                <img src={loginIcons} alt='login icons'/>
            </div>
            <form className='pt-7 flex flex-col gap-2' onSubmit={handleSubmit}>
                <div className='grid'>
                    <label>Username:</label>
                    <div  className='bg-slate-100 p-2 ' >
                    <input type='username' 
                    placeholder='Enter Username'
                    name='username'
                    value={data.username}
                    onChange={handleOnChange}
                    required
                    className='w-full h-full outline-none bg-transparent'/>
                    </div>
                </div>
                <div>
                    <label>Password:</label>
                    <div className='bg-slate-100 p-2 flex'>
                    <input type={showPassword ? "text" : "password"} 
                    placeholder='Enter Password'
                    value={data.password}
                    name='password'
                    
                    onChange={handleOnChange}
                    required
                    className='w-full h-full outline-none bg-transparent'/>
                    <div className='cursor-pointer text-xl' onClick={()=>setshowPassword((preve)=>!preve)}>
                        <span>
                            {
                                showPassword ? (
                                    <FaEyeSlash/>
                                ):
                                (
                                    <FaEye/>
                                )
                            }
                            
                        </span>
                    </div>
                    </div>
                    <Link to={"/forgot-password"} className='block w-fit ml-auto hover:underline hover:text-sky-400'>
                        Forgot Password?
                    </Link>
                </div>

                <button className='bg-sky-300 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:bg-sky-400 hover:scale:110 mx-auto block mt-6'>Login</button>
            </form>

            <p className='my-3 fle'>Don't have an Account? <Link to={"/sign-up"} className='hover:text-sky-400 hover:underline text-sky-300'>Sign Up</Link> </p>
          </div>
     </section>

  )
}

export default Login