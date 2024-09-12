import React, { useEffect } from 'react'
import Item from '../../Item/Item';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Item1 from '../../Item/Item1'
import { getProducts, clearErrors } from '../../../features/productSlice';
import MetaData from '../../layout/MetaData'
import {useDispatch,useSelector} from 'react-redux'
import Loader from '../../Loader/Loader';
import Banner from '../../Banner/Banner';


function Featured() {
  const dispatch=useDispatch();
  const { products, loading, error ,productscount} = useSelector((state) => state.product);
  useEffect(()=>{
    dispatch(getProducts());
    if(error){
      // alert(error);
      toast.error(error);
    }
 
  },[dispatch,error,alert]);
  return (
    
    // <>
    // {loading ? <p>Loading...</p> : products.map(product => <p key={product.id}>{product.name}</p>)}
    // </>
  <>
     <MetaData title="Home"/>

  <Banner/>
   <div class="mt-8 text-black text-center py-6">
   <h1 class="text-4xl font-bold font-red ">Featured Products</h1>
   <div class="m-auto w-1/2 h-1 bg-black mt-2"></div>

 </div>
   


     <div className="m-auto grid sm:grid-cols-1 md:grid-cols-2  gap-4 mt-10  lg:gap-4 lg:grid-cols-4 place-items-center w-5/6  ">
     
        
       
       {loading ? <Loader/> : products.map(product => <Item product={product}/>)}
                  
     
     
     </div>
     <ToastContainer/>

   </>
// {/* <div className='h-'> */}
// {/* <Loader/> */}

// </div>
)
}

export default Featured