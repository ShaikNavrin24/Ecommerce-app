import React from 'react'
import { FaEdit } from "react-icons/fa";
import { useState } from 'react';
import AdminEditProduct from './AdminEditProduct';
import displayINRCurrency from '../helpers/displayCurrency';
const AdminProductCard = ({
  data,
  fetchData
}) => {
    console.log(data)
    const [editProduct,setEditProduct]=useState(false)
  return (
    <div className='bg-white p-4 rounded'>
              
                 <div className='w-40 '>
                    <div className='w-32 h-32 flex justify-center items-center'> 
                         <img src={data?.productImage[0]}  className='object-fill mx-auto h-full'></img>
                    </div >
              
               <h1 className='text-ellipsis line-clamp-2'>{data.productName}</h1>
               
                  
                  <div>
                   <p className='font-semibold'>
                    {
                        displayINRCurrency(data.sellingprice)
                    }
             
                   </p>
                    
                  <div className='w-fit ml-auto p-2 bg-sky-300 hover:bg-sky-400 rounded-full cursor-pointer hover:text-white' onClick={()=>setEditProduct(true)}> 
                     <FaEdit/>
                  </div>
                 </div>
                 </div>

                  {
                    editProduct&&(
                        <AdminEditProduct productData={data} onClose={()=>setEditProduct(false)} fetchData={fetchData}/>
                    )
                  }
              
                  </div>
  )
}

export default AdminProductCard