import React from 'react'
import {Link} from 'react-router-dom'
import ReactStars from 'react-rating-stars-component'

const Item = ({product}) => {
    const options={
        edit:false,
        color:"rgba(20,20,20,0.1)",
        activeColor:"#ffd700",
        value:product.ratings,
        size:window.innerWidth<600?20:25,
        isHalf:true
    }
  return (
    <Link to={`/product/${product._id}`}>
<div>
        <hr />
        <div > 
    <div className="w-64 border-1 border-black shadow-2xl rounded-xl">

    <div className="relative group p-4">
    <div className="overflow-hidden aspect-w-1 aspect-h-1">
        <img className="object-cover w-52 h-72 transition-all duration-300 group-hover:scale-110" src={product.images[0].url} alt="" />
    </div>
    <div className="absolute left-3 top-3">
        <p className="sm:px-3 sm:py-1.5 px-1.5 py-1 text-[8px] sm:text-xs font-bold tracking-wide text-gray-900 uppercase bg-white rounded-full">New</p>
    </div>
    <div className="flex items-start justify-between mt-4 space-x-4">
        <div>
        
              <h3 className="text-xs font-bold text-gray-900 sm:text-sm md:text-base">
                {product.name}
              </h3>
           
            <div className="flex items-center mt-2.5 space-x-px">
                <ReactStars {...options}/>
                <span>({product.numberOfReviews})</span>
            </div>
        </div>

        <div className="text-right">
            <p className="text-xs font-bold text-gray-900 sm:text-sm md:text-base">${product.price}</p>
            <br />
            <p className="text-xs text-gray-500 sm:text-sm md:text-base line-through	" >$99.00</p>

        </div>
    </div>
</div>

</div>
</div>
</div>

   </Link>
  )
}

export default Item
