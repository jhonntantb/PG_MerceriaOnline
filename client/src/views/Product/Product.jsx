import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { useState, useEffect } from "react";
import { getProduct } from "../../redux/actions/product/index";
import { getReview } from "../../redux/actions/review/index";
import ShowReviews from "../../components/ShowReviews/ShowReviews";
import CreateReview from "../../components/Review/CreateReview";
import Carrousel from "../../components/Carrousel/Carrousel";
import { NavLink } from "react-router-dom";
import { getCart } from "../../redux/actions/cart/index";
import "./Product.css";
import Scroll from "../../components/Scroll/Scroll";
import { updateOrder, createOrder } from "../../redux/actions/order/index"
import Swal from "sweetalert2";


export default function Product({ match }) {
  const history= useHistory();
  const admin = localStorage.getItem("admin");
  const dispatch = useDispatch();
  const product = useSelector((state) => state.productReducer.product);
  const cart = useSelector((state) => state.cartReducer.cart);
  const user = useSelector((state) => state.userReducer.user);
  const [Loading, setLoading] = useState(true);

  const sweetAlert = () => {
    Swal.fire({
      icon: "success",
      title: "¡Enhorabuena!",
      text: "El producto se agrego correctamente",
      showConfirmButton: false,
      timer: 1000,
    });
  };

  const noUserAlert = () => {
    Swal.fire({
      icon: "error",
      title: "¡No estas registrado!",
      text: "Por favor ingresa para seguir comprando",
      showConfirmButton: false,
      timer: 1000,
    });
  }

  const productAlert = () => {
    Swal.fire({
      icon: "error",
      title: "Opss...",
      text: "El producto ya se encuentra en el carrito",
      showConfirmButton: false,
      timer: 1000,
    });
  };

  
  
  useEffect(() => {
    dispatch(getReview(match.params.id));
    dispatch(getProduct(match.params.id));
    if (user.id != undefined)  dispatch(getCart(user.id));
  }, []);

  useEffect(() => {
    if (product.id !== undefined) setLoading(false);
  }, [product]);

  const handleAddCart = () => {

    if (user.id) {
        
        const prod = [{
          productId: product.id,
          unitprice: product.price,
          quantity: 1
        }]

        if(cart.order!=null)
        {
  
                if(cart.cartProducts.find(e => e.id == prod[0].productId))
                  { productAlert()}
                else
                    { 
                      console.log("entro al update")
                      const orderProducts = cart.cartProducts.map(e => {
                        return {
                          productId: e.id,
                          unitprice: parseInt(e.price),
                          quantity: parseInt(e.Order_Product.quantity)
                        }
                      })
                      dispatch(updateOrder(cart.order.id,
                        {...cart.order, products: orderProducts.concat(prod)}
                      ))
                      .then(() => {
                        setTimeout(()=>{
                          dispatch(getCart(user.id))
                          sweetAlert();
                        }, 600)

                      })
                    }
        }
       else
        {
        dispatch(createOrder({
            status: "cart",
            home_address: "",
            location: "",
            total_price: 0,
            province: "",
            country: "Argentina",
            postal_code: "0000",
            phone_number: "0000000000",
            userId: user.id,
            products: prod
          }))
          .then(() => {
            setTimeout(()=>{
              dispatch(getCart(user.id))
              
              sweetAlert();

            }, 600)
          })
        }
        
    }else {
      noUserAlert();
      history.push("/signin")
    }

  }

  return !Loading ? (
    <div className="container" style={{marginTop:"5%"}}>
      <div className="cartas">
        <div className="container-fluid">
          <div className="wrapper row box-shadow bg-white">
            <div className="preview col-md-6">
              <div className="preview-pic tab-content">
                <Carrousel images={product.productimages || []} />
              </div>
            </div>

            <div className="details col-md-6 text-center">
              <h3 className="product-title">{product.title}</h3>
              <h5 className="text-dark">{product.detail}</h5>
              <hr />
              <p className="product-description text-dark">{product.resume}</p>

              <h4 className="price text-dark mt-3">
                Articulo:{product.catalog_id}
              </h4>
              <h4 className="price text-dark mt-3">
                Stock:
                {product.stocks.length > 0
                  ? product.stocks[0].quantity
                  : product.stock
                  ? product.stock
                  : "  0"}{" "}
                unidades
              </h4>
              <h3 className="text-dark mt-3">${product.price}</h3>

              <div >
                <button
                  className="add-to-cart btn btn-default mt-2"
                  disabled={product.stocks[0].quantity==0} 
                  onClick={handleAddCart}
                  style={{ marginLeft: "20px" }}
                >
                  Añadir al carrito
                </button>

                {admin !== "null" ? (
                  <NavLink to={`/productupdate/${product.id}`}>
                    <button className="btn btn-default mt-2 boton-modificar">
                      Modificar producto
                    </button>
                  </NavLink>
                ) : null}
              </div>
            </div>
            <CreateReview match={match.params.id} />
            <ShowReviews reviews={product.reviews} />
            <Scroll />
            
          </div>
         
        </div>
        
      </div>
  
    </div>
  ) : (
    <div></div>
  );
}
