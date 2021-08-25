import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function OrderButton(){
  const loading = useSelector(state => state.cartReducer.loading)

  return (
      <Link to="/cart/order">
        <button disabled={loading} class="btn btn-primary btn-block position-relative bottom-0 start-50 translate-middle-x" >
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-credit-card mr-2 ">
            <rect x="1" y="4" width="20" height="16" rx="2" ry="2"></rect>
            <line x1="1" y1="10" x2="20" y2="10"></line>
          </svg>
          Iniciar Pedido
        </button>
      </Link>
  )
}