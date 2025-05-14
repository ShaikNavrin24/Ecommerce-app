import React, { useState } from 'react';
import { IoMdCloudUpload } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import productCategory from "../helpers/productCategory";
import uploadImage from '../helpers/uploadImage';
import DisplayImage from './DisplayImage';
import { MdDelete } from "react-icons/md";
import SummaryApi from '../common';
import { toast } from 'react-toastify';

const AdminEditProduct = ({
    onClose,
    productData,
    fetchData
}) => {
    const [data, setData] = useState({
        ...productData,
        productName: productData?.productName || "",
        brandName: productData?.brandName || "",
        category: productData?.category || "",
        productImage: productData?.productImage || [],
        description: productData?.description || "",
        price: productData?.price || "",
        sellingprice: productData?.sellingprice || ""
    });

    const [openFullScreenImage, setOpenFullScreenImage] = useState(false);
    const [fullScreenImage, setFullScreenImage] = useState("");

    const handleUploadProduct = async (e) => {
        const file = e.target.files[0];
        const uploadImageCloudinary = await uploadImage(file);
        setData((prev) => ({
            ...prev,
            productImage: [...prev.productImage, uploadImageCloudinary.url]
        }));
    };

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleDeleteProductImage = (index) => {
        const newProductImage = [...data.productImage];
        newProductImage.splice(index, 1);
        setData((prev) => ({
            ...prev,
            productImage: newProductImage
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch(SummaryApi.updateProduct.url, {
            method: SummaryApi.updateProduct.method,
            credentials: 'include',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        const responseData = await response.json();

        if (responseData.success) {
            toast.success(responseData.message);
            onClose();
            fetchData(); // Correctly call fetchData as a function
        } else {
            toast.error(responseData.message);
        }
    };

    return (
        <div className='fixed w-full h-full bg-slate-200 bg-opacity-35 top-0 left-0 right-0 bottom-0 flex justify-center items-center'>
            <div className='bg-white p-4 shadow-md rounded w-full max-w-2xl h-full max-h-[80%] overflow-hidden'>
                <div className='flex justify-between items-center pb-3'>
                    <h2 className='font-bold'>Edit Product</h2>
                    <div className='w-fit ml-auto text-2xl hover:text-red-600 cursor-pointer' onClick={onClose}>
                        <IoClose />
                    </div>
                </div>
                <form className='grid p-4 gap-2 overflow-y-scroll h-full pb-5' onSubmit={handleSubmit}>
                    <label htmlFor='productName'>Product Name:</label>
                    <input
                        type='text'
                        id='productName'
                        name='productName'
                        placeholder='Enter Name of the Product'
                        value={data.productName}
                        onChange={handleOnChange}
                        className='p-2 bg-slate-100 border rounded'
                        required
                    />

                    <label htmlFor='brandName' className='mt-2'>Brand Name:</label>
                    <input
                        type='text'
                        id='brandName'
                        name='brandName'
                        placeholder='Enter the Brand'
                        value={data.brandName}
                        onChange={handleOnChange}
                        className='p-2 bg-slate-100 border rounded'
                        required
                    />

                    <label htmlFor='category' className='mt-2'>Category:</label>
                    <select
                        value={data.category}
                        name='category'
                        onChange={handleOnChange}
                        required
                        className='p-2 bg-slate-100 border rounded'>
                        <option value={""}>Select Category</option>
                        {
                            productCategory.map((e1, index) => (
                                <option value={e1.value} key={e1.value + index}>{e1.value}</option>
                            ))
                        }
                    </select>

                    <label htmlFor='productImage' className='mt-2'>Product Image:</label>
                    <label htmlFor='uploadImageInput'>
                        <div className='p-2 bg-slate-100 flex justify-center items-center cursor-pointer border rounded h-32 w-full'>
                            <div className='text-sky-400 flex justify-center items-center flex-col gap-2'>
                                <span className='text-4xl'><IoMdCloudUpload /></span>
                                <p className='text-sm'>Upload Image</p>
                                <input type='file' id='uploadImageInput' className='hidden' onChange={handleUploadProduct}></input>
                            </div>
                        </div>
                    </label>
                    <div>
                        {
                            data?.productImage.length ? (
                                <div className='flex items-center gap-2'>
                                    {
                                        data.productImage.map((e1, index) => (
                                            <div className='relative group' key={index}>
                                                <img
                                                    src={e1}
                                                    width={80}
                                                    height={80}
                                                    className='bg-slate-100 border cursor-pointer'
                                                    alt=''
                                                    onClick={() => {
                                                        setOpenFullScreenImage(true);
                                                        setFullScreenImage(e1);
                                                    }}
                                                />
                                                <div
                                                    className='absolute bottom-0 right-0 p-1 text-red-600 rounded-full hidden group-hover:block cursor-pointer'
                                                    onClick={() => handleDeleteProductImage(index)}
                                                >
                                                    <MdDelete />
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                            ) : (
                                <p className='text-red-600 text-xs'>Please Upload Image</p>
                            )
                        }
                    </div>

                    <label htmlFor='price' className='mt-2'>Price:</label>
                    <input
                        type='number'
                        id='price'
                        name='price'
                        placeholder='Enter the price'
                        value={data.price}
                        onChange={handleOnChange}
                        className='p-2 bg-slate-100 border rounded'
                        required
                    />

                    <label htmlFor='sellingprice' className='mt-2'>Selling Price:</label>
                    <input
                        type='number'
                        id='sellingprice'
                        name='sellingprice'
                        placeholder='Enter the Selling price'
                        value={data.sellingprice}
                        onChange={handleOnChange}
                        className='p-2 bg-slate-100 border rounded'
                        required
                    />

                    <label htmlFor='description' className='mt-2'>Description:</label>
                    <textarea
                        className='h-28 p-1 bg-slate-100 border'
                        placeholder='Enter product Description'
                        rows={3}
                        onChange={handleOnChange}
                        required
                        name='description'
                        value={data.description}
                    />

                    <button
                        className='px-3 py-1 text-white bg-sky-300 mb-10 hover:bg-sky-400 hover:scale-105 rounded'
                    >
                        Update Product
                    </button>
                </form>
            </div>
            {
                openFullScreenImage && (
                    <DisplayImage onClose={() => setOpenFullScreenImage(false)} imgUrl={fullScreenImage} />
                )
            }
        </div>
    )
}

export default AdminEditProduct;
