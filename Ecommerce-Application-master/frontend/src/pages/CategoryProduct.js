import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import productCategory from '../helpers/productCategory';
import VerticalCard from '../components/VerticalCard';
import SummaryApi from '../common';

const CategoryProduct = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const urlSearch = new URLSearchParams(location.search);
  const urlCategoryListInArray = urlSearch.getAll("category");

  const urlCategoryListObject = urlCategoryListInArray.reduce((acc, category) => {
    acc[category] = true;
    return acc;
  }, {});

  const [selectCategory, setSelectCategory] = useState(urlCategoryListObject);
  const [filterCategoryList, setFilterCategoryList] = useState(urlCategoryListInArray);
  const [sortBy, setSortBy] = useState(""); // State to track sorting option

  const fetchData = async () => {
    setLoading(true);
    try {
      console.log('Fetching data with categories:', filterCategoryList);
      const response = await fetch(SummaryApi.filterProduct.url, {
        method: SummaryApi.filterProduct.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ category: filterCategoryList })
      });
      const dataResponse = await response.json();
      console.log('Data fetched:', dataResponse);
      setData(dataResponse?.data || []);
    } catch (error) {
      console.error('Error fetching data:', error);
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectCategory = (e) => {
    const { value, checked } = e.target;
    setSelectCategory((prev) => ({ ...prev, [value]: checked }));
  };

  useEffect(() => {
    fetchData();
  }, [filterCategoryList]);

  useEffect(() => {
    // Sort data whenever sortBy or data changes
    if (sortBy === 'asc') {
      setData((prev) => [...prev].sort((a, b) => a.sellingPrice - b.sellingPrice));
    } else if (sortBy === 'dsc') {
      setData((prev) => [...prev].sort((a, b) => b.sellingPrice - a.sellingPrice));
    }
  }, [sortBy, data]); // Dependencies: sortBy and data

  useEffect(() => {
    const arrayOfCategory = Object.keys(selectCategory).filter(categoryKey => selectCategory[categoryKey]);
    setFilterCategoryList(arrayOfCategory);

    const urlFormat = arrayOfCategory.map((el, index) => `category=${el}`).join("&&");
    navigate("/product-category?" + urlFormat);
  }, [selectCategory, navigate]);

  const handleOnChangeSortBy = (e) => {
    const { value } = e.target;
    setSortBy(value); // Update sortBy state

    // Sorting logic will be handled in the useEffect for sortBy
  };

  return (
    <div className='container mx-auto p-4'>
      <div className='hidden lg:grid grid-cols-[200px,1fr]'>
        <div className='bg-white p-2 min-h-[calc(100vh-120px)] overflow-y-scroll'>
          <div>
            <h3 className='text-base uppercase font-medium text-slate-500 border-b pb-1 border-slate-300'>Sort by</h3>
            <form className='text-sm flex flex-col gap-2 py-2'>
              <div className='flex items-center gap-2'>
                <input type='radio' name='sortBy' checked={sortBy === 'asc'} onChange={handleOnChangeSortBy} value={"asc"} />
                <label>Price - Low to High</label>
              </div>
              <div className='flex items-center gap-3'>
                <input type='radio' name='sortBy' checked={sortBy === 'dsc'} onChange={handleOnChangeSortBy} value={"dsc"} />
                <label>Price - High to Low</label>
              </div>
            </form>
          </div>
          <div>
            <h3 className='text-base uppercase font-medium text-slate-500 border-b pb-1 border-slate-300'>Category</h3>
            <form className='text-sm flex flex-col gap-2 py-2'>
              {productCategory.map((categoryName) => (
                <div className='flex items-center gap-3' key={categoryName.value}>
                  <input
                    type='checkbox'
                    name={"category"}
                    checked={selectCategory[categoryName.value] || false}
                    value={categoryName.value}
                    id={categoryName.value}
                    onChange={handleSelectCategory}
                  />
                  <label htmlFor={categoryName.value}>{categoryName.label}</label>
                </div>
              ))}
            </form>
          </div>
        </div>
        <div className='px-4'>
          <p className='font-medium text-slate-800 text-lg my-2'>Search Results: {data.length}</p>
          <div className='min-h-[calc(100vh-120px)] overflow-y-scroll max-h-[calc(100vh-120px)]'>
            {loading && <p>Loading...</p>}
            {!loading && data.length > 0 && <VerticalCard data={data} />}
            {!loading && data.length === 0 && <p>No results found.</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryProduct;
