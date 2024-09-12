import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../../../features/productSlice';
import { deleteReviews, getAllReviews } from '../../../features/manageReviewsSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProductReviews = () => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Get products and reviews from Redux store
  const { products, loading: productsLoading } = useSelector((state) => state.product);
  const { reviews, loading: reviewsLoading, isDeleted } = useSelector((state) => state.manageReviews);

  useEffect(() => {
    dispatch(getProducts()); // Fetch all products when component mounts
  }, [dispatch]);

  useEffect(() => {
    if (isDeleted) {
      toast.success('Review deleted successfully');
    }
  }, [isDeleted]);

  const handleOpenModal = (product) => {
    setSelectedProduct(product);
    dispatch(getAllReviews(product._id));
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  const handleDeleteReview = (reviewId) => {
    dispatch(deleteReviews(reviewId, selectedProduct._id));
  };

  return (
    <div className="p-6 lg:p-8 mx-auto max-w-6xl">
      {/* Product List in Card Format */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        {productsLoading ? (
          <p>Loading products...</p>
        ) : (
          products.map((product) => (
            <div
              key={product._id}
              className="p-4 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 border border-black cursor-pointer"
              onClick={() => handleOpenModal(product)}
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
            </div>
          ))
        )}
      </div>

      {/* Modal for Product Reviews */}
      {isModalOpen && selectedProduct && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50" onClick={handleCloseModal}>
          <div
            className="bg-white rounded-lg w-full max-w-3xl max-h-[90%] overflow-y-auto px-6 py-4 relative no-scrollbar"
            onClick={(e) => e.stopPropagation()} // Prevent closing the modal when clicking inside
          >
            <div className="sticky top-0 bg-white z-10 pb-4 border-b-2 border-black">
              <div className="flex justify-between items-center mb-4 pt-3">
                <h2 className="text-2xl font-semibold">Reviews for {selectedProduct.name}</h2>
                <button
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                  onClick={handleCloseModal}
                >
                  &times;
                </button>
              </div>
            </div>

            {reviewsLoading ? (
              <p>Loading reviews...</p>
            ) : reviews.length === 0 ? (
              <p>No reviews for this product</p>
            ) : (
              <div className="mb-4">
                <ul>
                  {reviews.map((review) => (
                    <li key={review._id} className="flex justify-between items-center mb-2 border-b pb-2">
                      <div>
                        <p><strong>{review.name}</strong> (ID: {review.user})</p>
                        <p><strong>Comment : </strong>{review.comment}</p>
                        <p><strong>Rating: </strong>{review.rating}</p>
                      </div>
                      <button
                        onClick={() => handleDeleteReview(review._id)}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition-colors duration-200"
                      >
                        Delete
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}

      <ToastContainer />
    </div>
  );
};

export default ProductReviews;
