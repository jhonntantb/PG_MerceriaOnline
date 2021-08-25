import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCart } from "../../redux/actions/cart/index";
import { NavLink } from "react-router-dom";
import OrderButton from "./OrderButton";
import CartProduct from "./CartProduct";
import "./ShowCartProduct.css";

export default function ShowCartProduct() {
  const dispatch = useDispatch()
  const [total, setTotal] = useState(0)
  const cart = useSelector(state => state.cartReducer.cart)
  const prices = useSelector(state => state.cartReducer.prices)
  const user =  useSelector(state => state.userReducer.user)

  //get del carrito
  useEffect(() => {
    console.log(user.id) 
    if(user.id)
      dispatch(getCart(user.id))
    else
      dispatch(getCart())
  }, [user])

  //calcular el total
  useEffect(() => {
    let acum = 0;

    for(let i = 0; i < prices.length; i++) acum += prices[i].value;

    setTotal(acum);
  }, [prices]);

  console.log("length: " ,cart.cartProducts.length )
  
  return cart.cartProducts.length > 0 ?( 
    
      <div style={{marginTop: "7%"}}>
        <h2 class="h6 d-flex flex-wrap justify-content-between align-items-center px-4 py-3 bg-secondary"><span>Productos</span>
          <NavLink class="font-size-sm" to="/productlist"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-left" style={{width: "1rem", height: "1rem;"}}><polyline points="15 18 9 12 15 6"></polyline></svg>Continuar Comprando</NavLink>
        </h2>
        <div>
          {cart.cartProducts.map((prod) => (
            <CartProduct key={prod.id} content={prod}/>
          ))}
        </div>
        
        <div className="row justify-content-center">
          <div class="col align-self-center col-lg-6">
            <h2 class="h6 px-4 py-3 bg-secondary text-center">Total</h2>
            <div class="h3 font-weight-semibold text-center py-3">$ {total}</div>
          </div>
        </div>

        <OrderButton/>
      </div>
    
  ): (
    <div style={{marginTop: "100px"}} className="text-center text-dark mt-5">
      <h1 style={{marginTop: "300px"}} className="text-center ">No hay articulos en tu carrito</h1>
    </div>
  )
}
