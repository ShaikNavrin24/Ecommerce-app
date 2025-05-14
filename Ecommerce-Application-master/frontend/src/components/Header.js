import React, { useContext, useState } from 'react';
import Logo from './Logo';
import { IoMdSearch } from 'react-icons/io';
import { FaUser } from 'react-icons/fa';
import { FaCartShopping } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Context from '../context';
import { useNavigate, useLocation } from 'react-router-dom';
import { setUserDetails } from '../store/userSlice';
import SummaryApi from '../common';
import ROLE from '../common/role';

const Header = () => {
  const user = useSelector(state => state.user?.user);
  const { cartProductCount } = useContext(Context);
  const dispatch = useDispatch();
  const [menuDisplay, setMenuDisplay] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const searchInput = useLocation();
  const URLSearch = new URLSearchParams(searchInput?.search);
  const searchQuery = URLSearch.getAll("q");
  const [search, setSearch] = useState(searchQuery);

  const handleLogout = async () => {
    try {
      const response = await fetch(SummaryApi.logout_user.url, {
        method: SummaryApi.logout_user.method,
        credentials: 'include'
      });
      const data = await response.json();

      if (data.success) {
        toast.success(data.message);
        dispatch(setUserDetails(null));
        navigate("/");
      }
      if (data.error) {
        toast.error(data.message);
      }
    } catch (error) {
      console.error('Error logging out:', error);
      toast.error('Failed to logout. Please try again later.');
    }
  };

  const handleSearch = (e) => {
    const { value } = e.target;
    setSearch(value);

    if (value) {
      navigate(`/search?q=${value}`);
    } else {
      navigate("/search");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch(e);
    }
  };

  return (
    <header className='h-16 shadow-md z-10 sticky top-0 bg-white'>
      <div className='h-full container mx-auto flex items-center px-4 justify-between'>
        <div>
          <Link to={"/"}>
            <img src='https://static.vecteezy.com/system/resources/previews/006/547/168/non_2x/creative-modern-abstract-ecommerce-logo-design-colorful-gradient-online-shopping-bag-logo-design-template-free-vector.jpg' className='w-12 h-12 '></img>
          </Link>
        </div>

        <div className='hidden lg:flex items-center w-full justify-between max-w-sm border rounded-full focus-within:shadow pl-2'>
          <input
            type='text'
            placeholder='Search products...'
            className='w-full outline-none'
            value={search}
            onChange={handleSearch}
            onKeyPress={handleKeyPress}
          />
          <div
            className='text-lg min-w-[50px] h-8 flex items-center cursor-pointer justify-center rounded-r-full bg-sky-300'
            onClick={handleSearch}
          >
            <IoMdSearch />
          </div>
        </div>

        <div className='flex items-center gap-7'>
          <div className='relative group flex justify-center hover:scale-105 transition-all'>
            <div className='text-3xl cursor-pointer' onClick={() => setMenuDisplay(prev => !prev)}>
              <nav>
                {user?.role === ROLE.ADMIN && (
                  <Link to={"/admin-panel/all-products"}>
                    <FaUser />
                  </Link>
                )}
              </nav>
            </div>
          </div>

          {user?._id && (
            <div className='text-3xl relative hover:scale-105 cursor-pointer transition-all'>
              <Link to={'/cart'}> 
                <FaCartShopping />
              </Link>
              <div className='bg-sky-300 text-white w-5 h-5 rounded-full p-1 flex items-center justify-center absolute -top-2 -right-3 hover:bg-sky-400'>
                <p className='text-sm'>{cartProductCount}</p>
              </div>
            </div>
          )}

          <div>
            {user?._id ? (
              <button onClick={handleLogout} className='px-3 bg-sky-300 py-1 rounded-full text-white hover:bg-sky-400 hover:scale-105 transition-all'>Logout</button>
            ) : (
              <Link to={"/login"}>
                <button className='px-3 bg-sky-300 py-1 rounded-full text-white hover:bg-sky-400 hover:scale-105 transition-all'>Login</button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

