import { goToCheckout } from '../../redux/actions/checkout/index';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { updateOrder } from '../../redux/actions/order/index';
import "./index.css"

function CreateCheckoutButton ({products, direction}) {
  const dispatch = useDispatch()
  const user = useSelector(state => state.userReducer.user)
  const updatedOrder = useSelector(state => state.orderReducer.order)
  const order = useSelector(state => state.cartReducer.cart.order)
  const mpData = useSelector(state => state.checkoutReducer.MP_data)

  const [loading, setLoading] = useState(true)
  
  const productsToMP = products.map(p => {
    return {
      title: p.id,
      price: p.unitprice,
      discount: 0,
      quantity: p.quantity
    }
  })


  useEffect(() => {
    
      let totalPrice = 0;
      
      for(let i=0; i< products.length; i++) {
        totalPrice = totalPrice + (products[i].price * products[i].cant)
      }

      dispatch(updateOrder( order.id , 
        {
        status: "checkout",
        home_address: direction.home_address,
        location: direction.location,
        total_price: totalPrice,
        province: direction.province,
        country: user.country,
        postal_code: direction.postal_code,
        phone_number: direction.phone_number,
        })
      )
    
  }, [])

  useEffect(() => {updatedOrder.id && dispatch(goToCheckout(user.id, productsToMP))}, [updatedOrder])

  useEffect(() => {
    if(mpData && loading) {
        var script = document.createElement("script");
        script.src = "https://www.mercadopago.com.ar/integrations/v1/web-payment-checkout.js";
        script.type = "text/javascript";
        script.dataset.preferenceId = mpData;
        document.getElementById("button-checkout").innerHTML = "";
        document.querySelector("#button-checkout").appendChild(script);

        setLoading(false)
    }
  }, [mpData])
  
  return (
    <div>

      <div className="btn btn-block rm-border" id='button-checkout' hidden={loading}></div>
     <p className="btn btn-block rm-border" hidden={!loading}>...loading</p>

    </div>)
}

export default CreateCheckoutButton;