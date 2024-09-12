import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MetaData from '../../layout/MetaData.jsx';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DropdownMenu from '../Dashboard/DropdownMenu.jsx';
import { clearErrors, updateProduct, getProductDetails, updateProductReset } from '../../../features/productSlice.js';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams(); // Get product id from URL
  const { loading, error, success, product,isUpdated } = useSelector((state) => state.product);

  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [stock, setStock] = useState(0);
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const categories = ['laptop', 'footwear', 'bottom', 'tops', 'attire', 'camera', 'smartPhone'];

  useEffect(() => {
    if (!product || product._id !== id) {
      dispatch(getProductDetails(id));
    } else if (product._id === id) {
      setName(product.name || '');
      setDescription(product.description || '');
      setPrice(product.price || 0);
      setCategory(product.category || '');
      setStock(product.stock || 0);
      // setOldImages(product.images || []);
    }
  }, [dispatch, id, product?._id]);

  // Handle Errors and Success
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      toast.success("Product Updated Successfully");
      dispatch(updateProductReset());
      navigate("/admin/products");
    }
  }, [dispatch, error, isUpdated, navigate]);


  // Handle form submission
  const updateProductSubmitHandler = (e) => {
    e.preventDefault();
  
    const myForm = new FormData();
    myForm.set('name', name);
    myForm.set('price', price);
    myForm.set('description', description);
    myForm.set('category', category);
    myForm.set('stock', stock);
  
    // Append each image file
    images.forEach((image) => {
      myForm.append('images', image);
    });
   
    // Dispatch the action to update the product
    dispatch(updateProduct(id, myForm));
  };

  // Handle image selection and preview
  const updateProductImagesChange = (e) => {
    const files = Array.from(e.target.files);
  
    setImages([]);         // For backend (base64)
    setImagesPreview([]);   // For UI preview
  
    files.forEach((file) => {
      const reader = new FileReader();
  
      reader.onload = () => {
        if (reader.readyState === 2) {
          // Store the base64 string for backend
          setImages((old) => [...old, reader.result]);
  
          // Store base64 string for preview as well
          setImagesPreview((old) => [...old, reader.result]);
        }
      };
  
      // Convert file to base64 string
      reader.readAsDataURL(file);
    });
  };

  return (
    <>
      <MetaData title="Update Product" />
      <div className="flex">
        <div className="flex-1 p-6 lg:p-8 mx-auto max-w-6xl">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold">Update Product</h1>
            <DropdownMenu />
          </div>

          <form
            className="space-y-6"
            encType="multipart/form-data"
            onSubmit={updateProductSubmitHandler}
          >
            <div className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="Product Name"
                required
                className="p-2 border border-gray-300 rounded"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type="number"
                placeholder="Price"
                required
                className="p-2 border border-gray-300 rounded"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
              <textarea
                placeholder="Product Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                cols="30"
                rows="4"
                className="p-2 border border-gray-300 rounded"
              ></textarea>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="p-2 border border-gray-300 rounded"
              >
                <option value="">Choose Category</option>
                {categories.map((cate) => (
                  <option key={cate} value={cate}>
                    {cate}
                  </option>
                ))}
              </select>
              <input
                type="number"
                placeholder="Stock"
                required
                className="p-2 border border-gray-300 rounded"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
              />
              <input
                type="file"
                name="images"
                accept="image/*"
                onChange={updateProductImagesChange}
                multiple
                className="p-2 border border-gray-300 rounded"
              />
              <div className="flex gap-2">
                {imagesPreview.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt="Product Preview"
                    className="w-24 h-24 object-cover border border-gray-300 rounded"
                  />
                ))}
              </div>
              <button
                id="updateProductBtn"
                type="submit"
                disabled={loading}
                className="bg-black text-white py-2 px-4 rounded-lg shadow-md hover:bg-gray-800 transition"
              >
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default UpdateProduct;
