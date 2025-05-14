import React, { useEffect } from 'react'
import UploadProduct from '../components/UploadProduct'
import { useState } from 'react'
import SummaryApi from '../common'
import AdminProductCard from '../components/AdminProductCard'
const AllProducts = () => {

  const [openUploadProduct,setOpenUploadProduct]=useState(false)
  const [allProducts,getAllProducts]=useState([])

  const fetchAllProducts=async()=>{
    const response=await fetch(SummaryApi.allProducts.url)
    const dataResponse=await response.json()

    getAllProducts(dataResponse?.data||[])
  }

  useEffect(()=>{
    fetchAllProducts()
  },[])
  
  return (
    <div className=''>
      <div className='bg-white py-2 px-4 flex justify-between items-center'>
        <h2 className='font-semibold text-lg'>All Products</h2>
        <button className='border-2 text-white bg-sky-300 hover:scale-105 hover:bg-sky-400 py-2 px-4 rounded-full transition-all' onClick={()=>setOpenUploadProduct(true)}>Upload New Product</button>
      </div>
       <div className='flex items-center flex-wrap h-[calc(100vh-190px)] overflow-y-scroll gap-4 py-4'>
        {
          allProducts.map((product,index)=>{
            return(
              <AdminProductCard data={product} key={index+"allProducts"} fetchData={fetchAllProducts}/>
                
            )
          })
        }
       </div>







         {
          openUploadProduct&&(
            <UploadProduct onClose={()=>setOpenUploadProduct(false)} fetchData={fetchAllProducts}/>
          )
         }
     
    </div>
  )
}

export default AllProducts