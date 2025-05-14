import React, { useCallback, useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import SummaryApi from '../common';
import Context from '../context';
import addToCart from '../helpers/addToCart';
import { FaStarHalf, FaStar } from "react-icons/fa";
import displayINRCurrency from '../helpers/displayCurrency';
import CategoryWiseProductDisplay from '../components/CategoryWiseProductDisplay';
import VerticalCardProduct from '../components/VerticalCardProduct';

const ProductDetails = () => {
  const [data, setData] = useState({
    productName: "",
    brandName: "",
    category: "",
    productImage: [], 
    description: "",
    price: 0,
    sellingprice: 0
  });

  const params = useParams();
  const [loading, setLoading] = useState(false);
  const productImagelistLoading = new Array(4).fill(null);
  const [activeImage, setActiveImage] = useState("");
  const [zoomImageCoordinate, setZoomImageCoordinate] = useState({ x: 0, y: 0 });
  const [zoomImage, setZoomImage] = useState(false);
  const { fetchUserAddToCart } = useContext(Context);
  const categories = ['airpodes', 'camera', 'earphones', 'mobiles', 'mouse', 'printers', 'processor', 'refrigerators', 'trimmers', 'speakers', 'televisions', 'watches']; 

  const fetchProductDetails = async () => {
    setLoading(true);
    try {
      const response = await fetch(SummaryApi.productDetails.url, {
        method: SummaryApi.productDetails.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId: params?.id })
      });
      const dataResponse = await response.json();
      setData(dataResponse?.data);
      setActiveImage(dataResponse?.data.productImage[0]);
    } catch (error) {
      console.error('Error fetching product details:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProductDetails();
  }, []);

  const handleMouseEnterProduct = (imgURL) => {
    setActiveImage(imgURL);
  };

  const handleZoomImage = useCallback((e) => {
    setZoomImage(true);
    const { left, top, width, height } = e.target.getBoundingClientRect();
    const x = (e.clientX - left) / width;
    const y = (e.clientY - top) / height;
    setZoomImageCoordinate({ x, y });
  }, []);

  const handleLeaveImageZoom = () => {
    setZoomImage(false);
  };

  const handleAddToCart = async(e, id) =>{
    await addToCart(e, id);
    fetchUserAddToCart();
  };

  const navigate = useNavigate();
  const handleBuyProduct = async(e, id) => {
    await addToCart(e, id);
    fetchUserAddToCart();
    navigate("/cart");
  };

  const getRandomCategory = () => {
    const randomIndex = Math.floor(Math.random() * categories.length);
    return categories[randomIndex];
  };

  const randomCategory = getRandomCategory();

  return (
    <div className='container mx-4 my-3'>
      <div className='min-h-[200px] px-8 flex flex-col lg:flex-row gap-4'>
        <div className='h-96 flex flex-col lg:flex-row-reverse gap-4'>
          <div className='lg:h-96 relative bg-slate-200 lg:w-96 w-[300px] h-[300px] p-2'>
            {activeImage ? (
              <>
                <img 
                  src={activeImage} 
                  className='h-full w-full object-scale-down mix-blend-multiply' 
                  onMouseMove={handleZoomImage} 
                  onMouseLeave={handleLeaveImageZoom}
                  alt="Product"
                />
                {zoomImage && (
                  <div className='hidden lg:block absolute min-w-[500px] min-h-[400px] overflow-hidden bg-slate-200 p-1 -right-[510px] top-0'>
                    <div 
                      className='w-full min-h-[400px] min-w-[400px] h-full mix-blend-multiply scale-125' 
                      style={{
                        backgroundImage: `url(${activeImage})`,
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: `${zoomImageCoordinate.x * 100}% ${zoomImageCoordinate.y * 100}%`
                      }}
                    />
                  </div>
                )}
              </>
            ) : (
              <div className='h-full w-full bg-slate-200 animate-pulse'></div>
            )}
          </div>
          <div className='h-full'>
            {loading ? (
              <div className='flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full'>
                {productImagelistLoading.map((_, index) => (
                  <div className='h-20 w-20 bg-slate-200 rounded animate-pulse' key={index}></div>
                ))}
              </div>
            ) : (
              <div className='flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full'>
                {data.productImage.map((imgURL, index) => (
                  <div className='h-20 w-20 bg-slate-200 rounded p-1' key={imgURL}>
                    <img 
                      src={imgURL} 
                      className='w-full h-full object-scale-down mix-blend-multiply cursor-pointer' 
                      onMouseEnter={() => handleMouseEnterProduct(imgURL)} 
                      onClick={() => handleMouseEnterProduct(imgURL)} 
                      alt={`Product ${index}`}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        {loading ? (
          <div className='grid flex-col gap-1'>
            <p className='text-white lg:h-8 bg-slate-200 animate-pulse h-4 w-full rounded-full inline-block'></p>
            <h2 className='text-2xl lg:text-4xl font-semibold bg-slate-200 animate-pulse h-4 w-full'></h2>
            <p className='capitalize lg:h-8 bg-slate-200 animate-pulse h-4 w-full text-slate-400'></p>
            <div className='flex items-center lg:h-8 bg-slate-200 animate-pulse h-4 w-full gap-1'></div>
            <div className='flex item-center lg:h-8 bg-slate-200 animate-pulse h-4 w-full text-2xl gap-2 my-2 font-medium'>
              <p className='text-red-600 lg:h-8 bg-slate-200 animate-pulse h-4 w-full'></p>
              <p className='text-red-400 lg:h-8 bg-slate-200 animate-pulse h-4 w-full line-through text-lg my-1'></p>
            </div>
            <div className='flex gap-3 lg:h-8 items-center my-1'>
              <button className='border-2 lg:h-8 bg-slate-200 animate-pulse h-4 w-full rounded font-semibold px-3 py-1 text-white min-w-[120px]'></button>
              <button className='border-2 lg:h-8 bg-slate-200 animate-pulse h-4 w-full rounded font-semibold px-3 py-1 text-white min-w-[120px]'></button>
            </div>
            <div>
              <p className='text-slate-600 lg:h-8 bg-slate-200 animate-pulse h-4 w-full font-medium my-1'></p>
              <p></p>
            </div>
          </div>
        ) : (
          <div className='flex flex-col gap-1'>
            <p className='text-white bg-sky-300 rounded-full inline-block w-fit px-2'>{data?.brandName}</p>
            <h2 className='text-2xl lg:text-4xl font-semibold'>{data?.productName}</h2>
            <p className='capitalize text-slate-400'>{data?.category}</p>
            <div className='flex items-center gap-1 text-yellow-300'>
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStarHalf />
            </div>
            <div className='flex item-center text-2xl gap-2 my-2 font-medium'>
              <p className='text-red-600'>{displayINRCurrency(data.sellingprice)}</p>
              <p className='text-red-400 line-through text-lg my-1'>{displayINRCurrency(data.price)}</p>
            </div>
            <div className='flex gap-3 items-center my-1'>
              <button className='border-2 border-sky-300 rounded font-semibold px-3 py-1 text-white bg-sky-300 min-w-[120px] hover:bg-sky-400 hover:scale-105' onClick={(e) => handleBuyProduct(e, data.id)}>Buy</button>
              <button className='border-2 border-sky-300 rounded font-semibold px-3 py-1 text-white bg-sky-300 min-w-[120px] hover:bg-sky-400 hover:scale-105' onClick={(e) => handleAddToCart(e, data.id)}>Add To Cart</button>
            </div>
            <div>
              <p className='text-slate-600 font-medium my-1'>Description</p>
              <p>{data?.description}</p>
            </div>
          </div>
        )}
      </div>
     
      <VerticalCardProduct category={data.category} heading={"Relevant Products"} />
      <VerticalCardProduct category={randomCategory} heading={"Recommended Products"} />
    </div>
  );
};

export default ProductDetails;
