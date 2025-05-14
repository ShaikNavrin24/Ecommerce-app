import React, { useEffect } from 'react'
import SummaryApi from '../common'
import { useState } from 'react'
import { toast } from 'react-toastify'
import moment from 'moment'
import { MdEdit } from "react-icons/md";
import ChangeUserRole from '../components/ChangeUserRole'
const AllUsers = () => {
    const [allUsers,setAllUsers]=useState([])
    const [openUpdateRole,setOpenUpdateRole]=useState(false)
    
    const [updateUserDetails,setUpdateUserDetails]=useState({
      email:"",
      username:"",
      role:"",
      _id:""
    })
    
    const fetchAllUsers=async()=>{
        const fetchData=await fetch(SummaryApi.allUsers.url,{
            method:SummaryApi.allUsers.method,
            credentials:'include'
        })
        const dataResponse=await fetchData.json()
        console.log(dataResponse)

         if(dataResponse.success){
          setAllUsers(dataResponse.data)
         }
         if(dataResponse.error){
          toast.error(dataResponse.message)
         }
       console.log(dataResponse)
    }

    useEffect(()=>{
fetchAllUsers()
    },[])

  return (
    <div className='bg-white pb-4'>
      <table className='w-full userTable'>
        <thead className='bg-black text-white'>
          <tr>
          <th>Sr.</th>
          <th>Username</th>
          <th>Email</th>
          <th>Role</th>
          <th>Date of Creation</th>
          <th>Action</th>
          </tr>
        </thead>
        <tbody >
          {
           allUsers.map((e1,index)=>{
            return(
              <tr>
                <td>
                   {index+1}

                </td>
                <td>
                  {e1?.username}
                </td>
                <td>
                  {e1?.email}
                </td>
                <td>
                  {e1?.role}
                </td>
                <td>
                {moment(e1?.createdAt).format('LL')}
                </td>
                <td>
                  <button className='bg-sky-300 p-2 rounded-full hover:scale-110 hover:bg-sky-400 cursor-pointer hover:text-white' onClick={()=>{
                   setUpdateUserDetails(e1)
                   setOpenUpdateRole(true)}}>
                    <MdEdit /></button>
                </td>

              </tr>
            )
           })
          }
        </tbody>
      </table>

      {
        openUpdateRole&&(
            <ChangeUserRole onClose={()=>setOpenUpdateRole(false) }
            username={updateUserDetails.username}
            email={updateUserDetails.email}
            userId={updateUserDetails._id}
            role={updateUserDetails.role}
            callFunc={fetchAllUsers}
            />
        )
      }

      
      
    </div>
  )
}

export default AllUsers