import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCart } from "../../redux/actions/cart/index"

export  const ShowCartCant = () => {
    const dispatch = useDispatch()
    const cart = useSelector(state => state.cartReducer.cart)
    const user =  useSelector(state => state.userReducer.user)

    useEffect(() => {
        if(user.id)
          dispatch(getCart(user.id))
        else
          dispatch(getCart())
    }, [user])
    
    if(cart.cartProducts != null) {return cart.cartProducts.length}
    else {return 0}
    
}


