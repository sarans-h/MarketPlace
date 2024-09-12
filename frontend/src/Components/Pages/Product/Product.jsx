import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useParams } from 'react-router-dom';
import { getProducts, clearErrors } from '../../../features/productSlice';
import Loader from '../../Loader/Loader';
import Item from '../../Item/Item';
import MetaData from '../../layout/MetaData';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Pagination } from "@nextui-org/pagination";
import cross from '../../../assets/x.png'
import {Slider} from "@nextui-org/react";

const categories=[
  "laptop",
  "footwear",
  "bottom",
  "tops",
  "attire",
  "camera",
  "smartPhone"
]

function Product() {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);

  const { products, loading, error, productscount, resultPerPage, filteredProductsCount } = useSelector(state => state.product);
  const { keyword } = useParams();
const [price, setprice] = useState([0,25000]);
const [ratings, setRatings] = useState([0,5]);

const pricehandler=(newPrice)=>{setprice(newPrice)}
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState("")
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProducts(keyword, currentPage,price,category,ratings));
  }, [dispatch, error, keyword, currentPage,price,category,ratings]); 
 
  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  return (
    <>
      <MetaData title="Products" />
      {loading ? (
        <Loader />
      ) : (
        < div >
          <div className={`mt-8 text-black text-center py-6`}>
            <h1 className="text-4xl font-bold font-red">Products </h1>
            <div className="m-auto w-1/2 h-1 bg-black mt-2"></div>
            <h3 className="text-sm font-light italic text-gray-800">
              {keyword ? `Result for ${keyword}` : ""}<br/>
              {category ? `Category ${category}` : ""}

            </h3>
          </div>

          <div className="flex">
            <div className={`fixed top-0 left-0 h-screen  bg-gray-50 pt-8 z-50 ${open ? 'w-72' : 'w-0'} duration-300`}>
              <button
               
                className={`absolute cursor-pointer  top-[5rem] border-black border-1 p-2 rounded-md ml-3   ${open && 'hidden'}`}
                onClick={() => setOpen(!open)}
              >
                Filters
              </button>
              <div className="flex gap-x-4 items-center">
                <img
                alt='img'
                  src={cross}
                  className={`cursor-pointer duration-500 ${open && 'rotate-[360deg]'} ml-4`}
                  onClick={() => setOpen(!open)}
                />
                <h1 className={`text-black origin-left font-medium text-xl duration-200 ${!open && 'scale-0'}`}>
                  Filters
                </h1>
              </div>
              <ul className={`pt-6 ${!open&&"hidden"}`}>
                
                  <li
                    
                    className={`flex rounded-md p-3 cursor-pointer hover:bg-light-white text-black text-sm items-center gap-x-4 ml-4 `}
                    
                  >
                         <div className={`flex flex-col gap-2 w-full h-full max-w-md items-start justify-center ${!open&&"hidden"}`}>
      <Slider 
        label="Select a budget"
        formatOptions={{style: "currency", currency: "INR"}}
        step={1}
        maxValue={25000}
        minValue={0}
        value={price} 
        onChange={pricehandler}
        size='sm'
        className="max-w-md"
      />
      <p className="text-default-500 font-medium text-small">
        Selected budget: {Array.isArray(price) && price.map((b) => `₹${b}`).join(" - ")}
      </p>
    </div>
                    

                  </li>
                <li className='p-3 ml-4 text-lg text-gray-400 '>
                  <h1>Categories</h1>
                  <ul className=' text-black p-4'>
                    {categories.map((category)=>(
                      <li key={category}
                      onClick={()=>setCategory(category)}
                      >{category}</li>
                    ))}

                  </ul>
                </li>
                <li    className={`flex rounded-md p-3 cursor-pointer hover:bg-light-white text-black text-sm items-center gap-x-4 ml-4 `}
                    >
                <Slider 
                size='sm'
      label="Rating Range"
      step={1} 
      maxValue={5} 
      minValue={0} 
      defaultValue={[0, 5]}
      showSteps={true}
      showTooltip={true}
      showOutline={true}
      disableThumbScale={true}
      formatOptions={{style:"decimal"}}
      value={ratings} 
      onChange={(newRating)=>{setRatings(newRating)}}
      // tooltipValueFormatOptions={{style: "currency", currency: "USD", maximumFractionDigits: 0}}
      classNames={{
        base: "max-w-md",
        filler: "bg-gradient-to-r from-primary-500 to-secondary-400",
        labelWrapper: "mb-2",
        label: "font-medium text-default-700 text-medium",
        value: "font-medium text-default-500 text-small",
        thumb: [
          "transition-size",
          "bg-gradient-to-r from-secondary-400 to-primary-500",
          "data-[dragging=true]:shadow-lg data-[dragging=true]:shadow-black/20",
          "data-[dragging=true]:w-7 data-[dragging=true]:h-7 data-[dragging=true]:after:h-6 data-[dragging=true]:after:w-6"
        ],
        step: "data-[in-range=true]:bg-black/30 dark:data-[in-range=true]:bg-white/50"
      }}
      tooltipProps={{
        offset: 10,
        placement: "bottom",
        classNames: {
          base: [
            // arrow color
            "before:bg-gradient-to-r before:from-secondary-400 before:to-primary-500",
          ],
          content: [
            "py-2 shadow-xl",
            "text-white bg-gradient-to-r from-secondary-400 to-primary-500",
          ],
        },
      }}
    />
                </li>
              </ul>
            </div>

            <div className={`ml-auto w-full ${open ? 'ml-72' : 'ml-20'} transition-all duration-300 overflow-y-auto`}>
              <div className="m-auto grid sm:grid-cols-1 md:grid-cols-2 gap-4 mt-10 lg:gap-4 lg:grid-cols-4 place-items-center w-5/6">
                {products && products.map((product) => (
                  <Item key={product._id} product={product} />
                ))}
              </div>

              <div className="flex flex-wrap gap-4 items-center justify-center m-12">
                <Pagination key="bordered" total={Math.ceil(filteredProductsCount / resultPerPage) || 1}
                  initialPage={1} variant="bordered" onChange={setCurrentPageNo} page={currentPage}/>
              </div>
            </div>
          </div>
        </div>
      )}
      <ToastContainer />
    </>
  );
}

export default Product;
