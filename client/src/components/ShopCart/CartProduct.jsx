import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateOrder } from "../../redux/actions/order/index"
import { getCart, addPrice, removePrice, setLoading } from "../../redux/actions/cart";
import "./CartProduct.css";
import Swal from "sweetalert2";

export default function CartProduct({ content }) {
  const maxCant = content.stock ? content.stock : content.stocks[0].quantity
  const dispatch = useDispatch();
  const [initCant, setInitCant] = useState(1);
  const [cant, setCant] = useState(1);
  const [localPrice, setLocalPrice] = useState(content.price);
  const loading = useSelector(state => state.cartReducer.loading)
  const cart = useSelector(state => state.cartReducer.cart);
  const user = useSelector(state => state.userReducer.user);
  
  //setea las cantidades iniciales
  useEffect(() => {
    if(cart.order)
    {
      setCant(content.Order_Product.quantity)
      setInitCant(content.Order_Product.quantity)
    }
    else
    {
      setCant(content.cant)
      setInitCant(content.cant)
    }
      
  }, [cart]);

  //manejo de cambio de cantidades
  useEffect(() => {
    //setea el precio local con el precio * cantidad
    setLocalPrice(content.price * cant);

    //verifica si el usuario esta logueado validando si se trae o no una orden en el carrito
    if(cart.order)
    {
      //detecta si hubo un cambio en las cantidades
      if(initCant != cant)
      {
        //se setea loading a true para evitar prosibles conflictos durante el proceso
        dispatch(setLoading(true))
        const products = cart.cartProducts.map(e => {
          return {
            productId: e.id,
            unitprice: Number(e.price),
            quantity: Number(e.id == content.id ? cant : e.Order_Product.quantity)
          }
        })
        
        dispatch(updateOrder(
          cart.order.id,
          {...cart.order, products: products}
        ))
        .then(() => {
          return dispatch(getCart(user.id))//se actualiza el carrito
        })
        .then(() => dispatch(setLoading(false)))//se habilitan los botones
      }
    }
    else
    {
      //actualiza el local storage con las nuevas cantidades
      let arr = cart.cartProducts.map((e) => (e.id == content.id ? { ...e, cant: cant } : e));
      localStorage.setItem("cart", JSON.stringify(arr));
      dispatch(getCart())
    }
  }, [cant]);

  //envia un nuevo objeto precio con el valor actualizado
  useEffect(() => dispatch(addPrice({ id: content.id, value: localPrice })), [localPrice]);
  
  const removeAlert = () => {
    Swal.fire({
      title: "Estas Seguro?",
      text: "No se prodran revertir los cambios!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ee8585",
      cancelButtonColor: "#212529",
      confirmButtonText: "Si, Borrar!",
      cancelButtonText: "Cancelar",
      allowOutsideClick: false
    }).then(result => {
      if (result.isConfirmed) {
        

        if(user.id)
        {
          //filtra el producto a borrar
          var orderProducts = cart.cartProducts.filter(e => e.id != content.id)
          orderProducts = orderProducts.map(e => {
            return {
              productId: e.id,
              unitprice: Number(e.price),
              quantity: Number(e.Order_Product.quantity)
            }
          })
          //mapea a un formato valido y envia el dispatch
          dispatch(updateOrder(cart.order.id,
            {
              ...cart.order, 
              products: orderProducts
            }
          ))
          .then(() => {
            dispatch(removePrice(content.id))
            dispatch(getCart(user.id))
          })
        }
        else
        {
          dispatch(removePrice(content.id))
          //filtra el producto a borrar y setea el local storage
          let arr = cart.cartProducts.filter((e) => e.id != content.id);
          localStorage.setItem("cart", JSON.stringify(arr))
          dispatch(getCart())
        }
      }
    });
  };
  
  //maneja elc ambio de cantidades
  const handleCant = (e) => {
    if(e.target.value > maxCant) setCant(maxCant)
    else if(e.target.value < 1) setCant(1)
    else setCant(parseInt(e.target.value))
  }

  //botones de suma y resta de cantidad
  const handleSum = () => {
    setCant(cant >= maxCant ? cant : cant + 1);
  };

  const handleRes = () => {
    setCant(cant <= 1 ? cant : cant - 1);
  };
  console.log("carrito")
  console.log(cart)
  return (
    <div class="container-fluid pb-5 mt-n2 mt-md-n3">
      <div class="row">
        <div class="col-xl-12 col-md-8 col-sm-12">
          <div class="d-sm-flex justify-content-between my-4 pb-4 border-bottom">
            <div class="media d-block d-sm-flex text-center text-sm-left">
              <a class="cart-item-thumb mx-auto mr-sm-4" href="#">
                <img src={content.productimages ? content.productimages[0].image_url : content.url} alt="Product" />
              </a>
              <div class="media-body pt-3 align-text-center">
                <h3 class="product-card-title font-weight-semibold border-0 pb-0 mx-5">
                  {content.title}
                </h3>
                <br />
                <span class="font-size-lg text-primary pt-5">
                  $ {localPrice}
                </span>
              </div>
            </div>
            <div
              class="pt-2 pt-sm-0 pl-sm-3 mx-auto mx-sm-0 text-center text-sm-left"
              style={{ width: "10rem" }}
            >
              <div class="form-group mb-2">
                <label for="quantity1">Cantidad</label>

                <input
                  class="form-control form-control-sm text-center"
                  onChange={handleCant}
                  type="number"
                  id="quantity1"
                  value={cant}
                  style={{ fontSize: "18px", fontWeight: "bold" }}
                  disabled={true}
                />
                <div className="mt-3">
                  <button
                    className="btn btn-outline-dark btnmore"
                    onClick={handleSum}
                    disabled={loading}
                  >
                    +
                  </button>
                  <button
                    className="btn btn-outline-dark btnless"
                    onClick={handleRes}
                    disabled={loading}
                  >
                    -
                  </button>
                </div>
              </div>
              <button
                class="btn btn-outline-danger btn-sm btn-block mb-2"
                type="button"
                onClick={removeAlert}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="feather feather-trash-2 mr-1"
                >
                  <polyline points="3 6 5 6 21 6"></polyline>
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                  <line x1="10" y1="11" x2="10" y2="17"></line>
                  <line x1="14" y1="11" x2="14" y2="17"></line>
                </svg>
                Borrar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}