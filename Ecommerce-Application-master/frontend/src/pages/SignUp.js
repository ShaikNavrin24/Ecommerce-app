import React from 'react'
import loginIcons from '../assest/signin.gif'
import { FaEye } from "react-icons/fa";
import { useState } from 'react';
import { FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import SummaryApi from '../common';
import {toast} from 'react-toastify'
const SignUp = () => {
    const [showPassword,setshowPassword]=useState(false)
    const [showConfirmPassword,setShowConfirmPassword]=useState(false)
    const [data,setData]=useState({
        username:"",
        password:"",
        email:"",
        confirmPassword:""
    })

    const navigate=useNavigate()
    const handleOnChange=(e)=>{
        const {name,value}=e.target
        setData((preve)=>{
            return{
                ...preve,
                [name]:value
            }
        })
    }
    const handleSubmit=async(e)=>{
        e.preventDefault()
      //  console.log(e)

        if(data.password===data.confirmPassword){
            const dataResponse=await fetch(SummaryApi.signUp.url,{
                method:SummaryApi.signUp.method,
                headers:{
                   "content-type":"application/json"
                },
                body:JSON.stringify(data)
            })
    
           
            const dataApi= await dataResponse.json()
            console.log(dataApi)
           if(dataApi.message==="User created successfully"){
            toast.success(dataApi.message)
            navigate("/login")
           }
           if(dataApi.error){
            toast.error(dataApi.message)
           }
           
        }else{
            toast.error("Please Recheck the Password")
            
        }
       

        
    }
    console.log(data)
  return (
    <section id='signup'>
        <div className='mx-auto container p-4'></div>
          <div className='bg-white p-5 py-5 w-full max-w-sm mx-auto'>
            <div className='w-20 h-10 mx-auto'>
                <img src={loginIcons} alt='login icons'/>
            </div>
            <form className='pt-7 flex flex-col gap-2' onSubmit={handleSubmit}>
                
            <div className='grid'>
                    <label>Email:</label>
                    <div  className='bg-slate-100 p-2 ' >
                    <input type='email' 
                    placeholder='Enter Email'
                    name='email'
                    value={data.email}
                    onChange={handleOnChange}
                    required
                    className='w-full h-full outline-none bg-transparent'/>
                    </div>
                </div>
                <div className='grid'>
                    <label>Username:</label>
                    <div  className='bg-slate-100 p-2 ' >
                    <input type='text' 
                    placeholder='Create Username'
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
                   
                </div>
                <div>
                    <label>Confirm Password:</label>
                    <div className='bg-slate-100 p-2 flex'>
                    <input type={showConfirmPassword ? "text" : "password"} 
                    placeholder='Confirm Password'
                    value={data.confirmPassword}
                    name='confirmPassword'
                    
                    onChange={handleOnChange}
                    required
                    className='w-full h-full outline-none bg-transparent'/>
                    <div className='cursor-pointer text-xl' onClick={()=>setShowConfirmPassword((preve)=>!preve)}>
                        <span>
                            {
                                showConfirmPassword ? (
                                    <FaEyeSlash/>
                                ):
                                (
                                    <FaEye/>
                                )
                            }
                            
                        </span>
                    </div>
                    </div>
                    
                </div>

                <button className='bg-sky-300 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:bg-sky-400 hover:scale:110 mx-auto block mt-6'>SignUp</button>
            </form>

            <p className='my-3 '>Already have an Account? <Link to={"/login"} className='hover:text-sky-400 hover:underline text-sky-300'>Login</Link> </p>
          </div>
     </section>
  )
}

export default SignUp