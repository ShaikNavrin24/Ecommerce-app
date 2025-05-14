import React, { useState } from 'react';
import { IoIosCloseCircle } from "react-icons/io";
import { toast } from 'react-toastify';
import SummaryApi from '../common';
import ROLE from '../common/role';

const ChangeUserRole = ({ username, email, role, userId, onClose, callFunc }) => {
    const [userRole, setUserRole] = useState(role);

    const handleOnChangeSelect = (e) => {
        setUserRole(e.target.value);
    };

    const updateUserRole = async () => {
        try {
            const fetchresponse = await fetch(SummaryApi.updateUser.url, {
                method: SummaryApi.updateUser.method,
                credentials: 'include',
                headers: {
                    'Content-Type': "application/json" // Corrected header name
                },
                body: JSON.stringify({
                    role: userRole,
                    userId: userId
                })
            });
            const responseData = await fetchresponse.json();
            if (responseData.success) {
                toast.success(responseData.message);
                onClose();
                callFunc();
            } else {
                toast.error(responseData.message);
            }
            console.log(responseData);
        } catch (error) {
            toast.error("An error occurred while updating the user role.");
            console.error("Error updating user role:", error);
        }
    };

    return (
        <div className='fixed top-0 left-0 right-0 bottom-0 w-full h-full z-10 flex justify-between items-center bg-slate-200 bg-opacity-50'>
            <div className='mx-auto bg-white shadow-md p-4 max-sm'>
                <button className='block ml-auto hover:scale-110 hover: text-sky-300' onClick={onClose}>
                    <IoIosCloseCircle />
                </button>
                <h1 className='pb-4 text-lg font-medium text-center'>Change User Role</h1>
                <p className='m-1'>
                    Name: {username}
                </p>
                <p className='m-1 mt-3'>
                    Email: {email}
                </p>
                <div className='flex items-center justify-between my-4'>
                    <p className='mr-8 ml-1 mb-2'>Role</p>
                    <select className='border px-4 py-1' value={userRole} onChange={handleOnChangeSelect}>
                        {Object.values(ROLE).map(e1 => (
                            <option value={e1} key={e1}>{e1}</option>
                        ))}
                    </select>
                </div>
                <button className='w-fit mx-auto block border py-1 px-3 rounded-full bg-sky-300 hover:bg-sky-400 hover:scale-105' onClick={updateUserRole}>Change Role</button>
            </div>
        </div>
    );
}

export default ChangeUserRole;
