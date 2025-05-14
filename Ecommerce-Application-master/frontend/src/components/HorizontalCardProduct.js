import React, { useEffect, useRef } from 'react'
import { useState } from 'react'
import fetchCategoryWiseProduct from '../helpers/fetchCategoryWiseProduct'
import { categoryProduct } from '../common'
import addToCart from '../helpers/addToCart'
import {useContext} from 'react'
import Context from '../context'
import { Link } from 'react-router-dom';
import displayINRCurrency from '../helpers/displayCurrency'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6'
const HorizontalCardProduct = ({category,heading}) => {
 
 const [data,setData]=useState([])
 const [loading,setLoading]=useState(false)
 const loadingList=new Array(13).fill(null)

 const [scroll,setScroll]=useState(0)
 const scrollElement=useRef()
 const { fetchUserAddToCart } = useContext(Context)

 const handleAddToCart = async(e,id)=>{
    await addToCart(e,id)
    fetchUserAddToCart()
 }
  const fetchData=async()=>{
    setLoading(true)
    const categoryProduct=await fetchCategoryWiseProduct(category)
    setLoading(false)
    setData(categoryProduct?.data)
  }
 useEffect(()=>{
       fetchData()
 },[])

 const scrollRight=()=>{
  scrollElement.current.scrollLeft+=300
 }

 const scrollLeft=()=>{
  scrollElement.current.scrollLeft-=300
 }
 console.log(data)
 return (
    <div className='container mx-auto px-8 my-6 relative duration-700'>
        <h2 className='text-2xl py-4 font-semibold'>
          {heading}
        </h2>

         <div className='flex items-center gap-4 md:gap-6 overflow-scroll scrollbar-none' ref={scrollElement }>
         <button  className='bg-white  absolute left-3 shadow-md rounded-full p-2 hidden md:block text-lg transition-all ' onClick={scrollLeft}><FaAngleLeft /></button>
         <button  className='bg-white shadow-md absolute right-3 rounded-full p-2 hidden md:block text-lg transition-all' onClick={scrollRight}><FaAngleRight /></button>
         {
          loading?(
            loadingList.map((product,index)=>{
              //console.log(product)
              return(
                <div className='duration-700'>
                <div className='w-full max-w-[280px] md:max-w-[320px] min-w-[280px] md:min-w-[320px] h-36 bg-white rounded-sm shadow-md flex '>
                <div className=' min-w-[120px] md:min-w-[145px]  bg-slate-200 p-4 h-full animate-pulse'> 
                   <img src={''} className='object-scale-down h-full hover:scale-110 transition-all'/>
                </div>
                <div className='p-2 grid w-full gap-2'>
                     <h2 className='font-medium md:text-md text-base text-ellipsis line-clamp-2 text-black animate-pulse'>
                      {}
                      </h2>
                      <p className='capitalize text-slate-500 bg-slate-200 animate-pulse rounded-full'>
                        {}
                      </p>
                      
                      <div className='flex gap-2 w-full'>
                        
                        <p className='text-red-600 font-medium p-1 bg-slate-200 w-full animate-pulse rounded-full'>{}</p>
                        <p className='text-slate-500 line-through'>{}</p>
                      </div>
                      <button className=' hover:bg-sky-400 px-3 py-0.5 font-semibold hover:scale-105 text-sm  bg-slate-200 w-full animate-pulse '></button>
                     
                </div>
           </div>
           </div>
              )
            })
          ):(
            data.map((product,index)=>{
              console.log(product)
              return(
                <Link to={"product/"+product?._id} className='duration-700 shadow-md rounded-lg'>
                <div className='w-full max-w-[280px] md:max-w-[320px] min-w-[280px] md:min-w-[320px] h-36 bg-white rounded-sm shadow-md flex '>
                <div className=' min-w-[120px] md:min-w-[145px]  bg-slate-200 p-4 h-full'> 
                   <img src={product?.productImage[0]} className='object-scale-down h-full hover:scale-110 transition-all'/>
                </div>
                <div className='p-2 grid'>
                     <h2 className='font-medium md:text-md text-base text-ellipsis line-clamp-2 text-black'>
                      {product?.productName}
                      </h2>
                      <p className='capitalize text-slate-500'>
                        {product?.category}
                      </p>
                      
                      <div className='flex gap-2'>
                        
                        <p className='text-red-600 font-medium'>{displayINRCurrency(product?.sellingprice) }</p>
                        <p className='text-slate-500 line-through'>{displayINRCurrency(product?.price)}</p>
                      </div>
                      <button className='bg-sky-300 hover:bg-sky-400 px-3 py-0.5 font-semibold hover:scale-105 text-sm text-white rounded-full' onClick={(e)=>addToCart(e,product?._id)}>Add to Cart</button>
                     
                </div>
           </div>
           </Link>
              )
            })
          )
         
        }
         </div>
      
    </div>
  )
}

export default HorizontalCardProduct