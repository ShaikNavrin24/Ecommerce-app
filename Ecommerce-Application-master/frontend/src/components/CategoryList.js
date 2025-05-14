import React, { useState, useEffect } from 'react';
import SummaryApi from '../common';
import { Link } from 'react-router-dom';

const CategoryList = () => {
    const [categoryProduct, setCategoryProduct] = useState([]);
    const [loading, setLoading] = useState(true);

    const categoryLoading = new Array(13).fill(null);

    const fetchCategoryProduct = async () => {
        const response = await fetch(SummaryApi.categoryProduct.url);
        const dataResponse = await response.json();
        setCategoryProduct(dataResponse.data);
        setLoading(false);
    };

    useEffect(() => {
        fetchCategoryProduct();
    }, []);

    return (
        <div className="container mx-auto  p-4">
            <div className="flex items-center gap-1 justify-between overflow-x-scroll scrollbar-none">
                {loading ? (
                    categoryLoading.map((_, index) => (
                        <div
                            className="h-12 w-12 md:h-14 md:w-14 rounded bg-white shadow-md overflow-hidden animate-pulse"
                            key={'categoryLoading' + index}
                        ></div>
                    ))
                ) : (
                    categoryProduct.map((product) => (
                        <Link
                            to={'product-category?category=' + product.category}
                            className="cursor-pointer flex flex-col items-center"
                            key={product.category}
                        >
                            <div className="w-16  h-16 md:w-18 md:h-18 bg-slate-200 rounded-full shadow-md p-4 overflow-hidden flex  items-center justify-center">
                                <img
                                    src={product?.productImage[0]}
                                    alt={product?.category}
                                    className="h-full object-scale-down hover:scale-125 mix-blend-multiply transition-all"
                                />
                            </div>
                            <p className="text-center text-sm md:text-base font-semibold m-1 capitalize">
                                {product.category}
                            </p>
                        </Link>
                    ))
                )}
            </div>
        </div>
    );
};

export default CategoryList;
