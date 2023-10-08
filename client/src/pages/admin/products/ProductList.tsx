import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit"
import { AppDispatch, RootState } from "app/store"
import { useDispatch, useSelector } from "react-redux"
import {useEffect} from 'react'
import { validProductTypes } from '../../../utils/Types'
import { fetchProduct } from "../../../app/actions/productActions"

const ProductList: React.FC = () => {
const dispatch: ThunkDispatch<RootState, unknown, AnyAction> = useDispatch<AppDispatch>()
const products = useSelector((state: RootState) => state.product);

console.log(products);

useEffect(()=>{
  dispatch(fetchProduct())
},[dispatch])

const handleEdit = ()=>{

}

  return(
    <div>
      {validProductTypes.map((type) => (
        <div key={type}>
          <h2>{type}</h2>
          <ul>
            {products
              .filter((product) => product.product_type === type)
              .map((product) => (
                <li key={product._id} onClick={() => handleEdit()}>
                  {product.product_name}
                </li>
              ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default ProductList