import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom"
import { useEffect, useState } from "react";
import AddressFrom from "../../components/ShopCart/AddressForm"
import CartReceipt from "../../components/ShopCart/CartReceipt"
import CreateCheckoutButton from '../../components/MPago/index';
import { getCart } from "../../redux/actions/cart";


export default function CartForm(){
    
    const history = useHistory()
    const dispatch = useDispatch()
    const [address, setAddress] = useState("")
    const user = useSelector(state => state.userReducer.user)
    const products = useSelector(state => state.cartReducer.cart.order.Order_Products)

    useEffect(() => user.id || history.push("/signin"), [])

    useEffect(() => dispatch(getCart(user.id)), [address])

    return (
        <div style={{marginTop: "10%"}}>
            <div>
                <h2>Detalles del Pedido</h2>
                <CartReceipt/>
                {address && <CreateCheckoutButton products={products} direction={address}/>}
                {!address && <AddressFrom setAddress={setAddress}/>}
                <div className="container ">
                </div>
            </div>
        </div>
    )
} 