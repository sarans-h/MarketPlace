import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, getProductDetails, newReview, newReviewReset } from '../../../features/productSlice';
import { useParams } from 'react-router-dom';
import ReactStars from 'react-rating-stars-component';
import { Button, Input, Badge, Textarea } from '@nextui-org/react';
import ReviewCard from './ReviewCard';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from '../../Loader/Loader';
import MetaData from '../../layout/MetaData';
import { addItemsToCart } from '../../../features/cartSlice';
import { Popover, PopoverTrigger, PopoverContent } from "@nextui-org/react";

function ProductDetails() {
  const { id } = useParams();

  const reviewSubmitHandler = () => {
    const myForm = new FormData();
    myForm.set("rating", rating);
    myForm.set("comment", comment);
    myForm.set("productId", id);
    dispatch(newReview(myForm));
  };

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const dispatch = useDispatch();
  const { product, loading, error, success } = useSelector((state) => state.product);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (error) {
      return toast.error(error);
    }
    if (success) {
      toast.success("Review Submitted");
      dispatch(newReviewReset());
    }
    dispatch(getProductDetails(id));
  }, [dispatch, id, error, success]);

  const addToCartHandler = () => {
    dispatch(addItemsToCart(id, quantity));
    toast.success("Item Added To Cart");
  };

  const increaseQuantity = () => {
    if (product.stock <= quantity) return;
    const qty = quantity + 1;
    setQuantity(qty);
  };

  const decreaseQuantity = () => {
    if (1 >= quantity) return;
    const qty = quantity - 1;
    setQuantity(qty);
  };
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };
  const options = {
    size: window.innerWidth < 600 ? 20 : 25,
    value: product.ratings,
    edit: false,
    isHalf: true,
  };

  const options1 = {
    color: "rgba(20,20,20,0.1)",
    activeColor: "#ffd700",
    value: rating,
    size: window.innerWidth < 600 ? 20 : 25,
    isHalf: true,
  };

  return (
    <>
      <MetaData title="Products Details" />

      {(loading) ? <Loader /> :
        <div className="lg:h-auto m-4 lg:mt-9">
          <div className="flex flex-col lg:flex-row p-4 lg:p-8 mx-auto max-w-6xl bg-white shadow-lg rounded-lg border-1 border-black">
            {/* Image Slider Section */}
            <div className="w-full lg:w-2/5 mb-6 lg:mb-0 bg-white rounded-lg shadow-md overflow-hidden border-1 border-black">
              <Slider {...settings}>
                {product.images && product.images.map((item, i) => (
                  <div key={i} className="flex items-center justify-center">
                    <img
                      className="w-full h-auto max-h-[400px] object-contain bg-no-repeat aspect-square"
                      src={item.url}
                      alt={`Product Image ${i}`}
                      style={{ backgroundRepeat: 'no-repeat' }} // Ensures no background image repeats
                    />
                  </div>
                ))}
              </Slider>
            </div>

            {/* Product Details Section */}
            <div className="w-full lg:w-3/5 lg:pl-8 flex flex-col justify-center">
              <h2 className="text-xl lg:text-2xl font-bold text-gray-800 mb-4">{product.name}</h2>
              <p className="text-xs lg:text-sm text-gray-600 mb-6">Product ID: {product._id}</p>

              {/* Rating */}
              <div className="flex items-center mb-6">
                <ReactStars {...options} />
                <span className="ml-2 text-xs lg:text-sm text-gray-600">({product.noOfReviews} Reviews)</span>
              </div>

              {/* Price */}
              <h1 className="text-2xl lg:text-3xl font-semibold text-gray-900 mb-6">${product.price}</h1>

              {/* Quantity and Cart */}
              <div className="flex items-center mb-6 flex-col lg:flex-row">
                <div className="flex items-center mb-4 lg:mb-0 flex-col lg:flex-row gap-2 mr-4">
                  <Button auto light onClick={decreaseQuantity} className="w-full lg:w-auto text-xs lg:text-sm py-3 px-4">-</Button>
                  <Input
                    type="number"
                    value={product.stock === 0 ? 0 : quantity}
                    className="text-center w-12 lg:w-16 text-xs lg:text-sm mx-2"
                    bordered
                    readOnly
                  />
                  <Button auto light onClick={increaseQuantity} className="w-full lg:w-auto text-xs lg:text-sm py-3 px-4">+</Button>
                </div>
                <Button auto shadow className={`w-full lg:w-auto ${product.stock === 0 ? "bg-gray-500" : "bg-black"} text-white text-xs lg:text-sm py-3`} onClick={addToCartHandler} disabled={product.stock === 0}>
                  Add to Cart
                </Button>
              </div>

              {/* Stock Status */}
              <p className={`text-xs lg:text-sm ${product.stock === 0 ? "text-red-600" : "text-green-600"} mb-6`}>
                Status: &nbsp;
                <Badge color={product.stock === 0 ? "error" : "success"} variant="flat" className="ml-2">
                  {product.stock === 0 ? "Out of Stock" : "In Stock"}
                </Badge>
              </p>

              {/* Description */}
              <div className="mb-6">
                <h3 className="text-base lg:text-lg font-semibold text-gray-800 mb-2">Description:</h3>
                <p className="text-xs lg:text-sm text-gray-600">{product.description}</p>
              </div>

              {/* Submit Review Button */}
              <Popover offset={10} placement="bottom" backdrop="blur" shadow='lg'>
                <PopoverTrigger>
                  <Button auto shadow light className="text-xs lg:text-sm py-2 px-4">
                    Submit Review
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[240px]">
                  <div className="px-1 py-2 w-full">
                    <p className="text-small font-bold text-foreground">Review</p>
                    <div className="mt-2 flex flex-col gap-2 w-full">
                      <ReactStars {...options1} onChange={(newRating) => setRating(newRating)} />
                      <Textarea label="Comment" cols={30} rows={5} value={comment} onChange={(e) => setComment(e.target.value)} variant="bordered"></Textarea>
                      <Button onClick={reviewSubmitHandler}>Done</Button>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </div>

          {/* Reviews Section */}
          <div className="mt-12 flex flex-col p-4 lg:p-8 mx-auto max-w-6xl bg-white shadow-lg rounded-lg border-1 border-black items-center">
            {product.reviews && product.reviews[0] ? (
              <section id="testimonials" aria-label="What our customers are saying" className="bg-slate-50 py-10 sm:py-16 lg:py-20 w-full h-96 overflow-scroll no-scrollbar">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                  <div className="mx-auto max-w-2xl md:text-center">
                    <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl tracking-tight text-slate-900">
                      What Our Customers Are Saying
                    </h2>
                  </div>
                  <ul role="list" className="mx-auto mt-8 sm:mt-12 lg:mt-16 flex flex-wrap justify-center gap-6 sm:gap-8">
                    {product.reviews.map((review) => (
                      <ReviewCard key={review._id} review={review} />
                    ))}
                  </ul>
                </div>
              </section>
            ) : (
              <div>NO REVIEWS YET</div>
            )}
          </div>
        </div>
      }

      <ToastContainer />
    </>
  );
}

export default ProductDetails;
