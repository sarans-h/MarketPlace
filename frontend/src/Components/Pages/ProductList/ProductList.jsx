import React, { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, deleteProduct, deleteProductReset, getAdminProduct } from '../../../features/productSlice';
import DropdownMenu from '../Dashboard/DropdownMenu.jsx';

const ProductList = () => {
  const dispatch = useDispatch();
  const { error, products,isDeleted } = useSelector((state) => state.product);
const navigate=useNavigate();
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    if(isDeleted){
      toast.success('Product deleted successfully');
      dispatch(deleteProductReset());
    }
    dispatch(getAdminProduct());
  }, [dispatch, error,isDeleted]);
  const deletehandler=(id)=>{
    dispatch(deleteProduct(id))
  }
  return (
    <>
      <div className="p-6 lg:p-8 mx-auto max-w-6xl">
        {/* Header with DropdownMenu, similar to the Dashboard */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Admin Product List</h1>
<div className="">
<button
      className="m-5 bg-black text-white py-2 px-4 rounded-lg shadow-md hover:bg-gray-600 transition-colors duration-300"
      onClick={()=>navigate("/admin/product")}
    >
     <p className='text-lg text-gray-100'>+</p>
    </button>
          <DropdownMenu />
</div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="p-4 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 border border-black"
            >
              <img
                src={product.images[0]?.url}
                alt={product.name}
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <h2 className="text-xl font-semibold">{product.name}</h2>
              <p className="text-gray-600">Price: {product.price}</p>
              <p className="text-gray-600">Stock: {product.stock}</p>
              <p className="text-gray-600">ID: {product._id}</p>

              <div className="flex justify-between mt-4">
                <Link to={`/admin/product/${product._id}`}>
                  <button className="bg-black text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors duration-200">
                    Edit
                  </button>
                </Link>
                <button className="bg-black text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors duration-200" onClick={()=>deletehandler(product._id)}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default ProductList;
