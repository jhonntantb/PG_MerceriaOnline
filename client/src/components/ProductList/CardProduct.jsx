import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { getCart } from "../../redux/actions/cart/index";
import { NavLink } from "react-router-dom";
import { deleteWishlist } from "../../redux/actions/wishlist/index";
import { createWishlist } from "../../redux/actions/wishlist/index";
import { getWishlist } from "../../redux/actions/wishlist/index";
import { updateOrder, createOrder } from "../../redux/actions/order/index";
import "./CardProduct.css";
import Swal from "sweetalert2";

function CardProduct(props) {
  const history = useHistory();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cartReducer.cart);
  const user = useSelector((state) => state.userReducer.user);
  const wishlist = useSelector((state) => state.wishlistReducer.wishlist);
  const [Fav, addFav] = useState(false);
  const [add, setAdd] = useState(false);

  useEffect(() => {
    if(cart.order)
      setAdd(cart.cartProducts.find((prod) => props.id == prod.id) ? true : false)
    else
        setAdd(cart.cartProducts.find((prod) => props.id == prod.id) ? true : false)
  }, [cart])

  const sweetAlert = () => {
    Swal.fire({
      icon: "success",
      title: "¡Enhorabuena!",
      text: "El producto se agrego correctamente",
      showConfirmButton: false,
      timer: 1000,
    });
  };

  const productAlert = () => {
    Swal.fire({
      icon: "error",
      title: "Opss...",
      text: "El producto ya se encuentra en el carrito",
      showConfirmButton: false,
      timer: 1000,
    });
  };

  const addWishList = () => {
    Swal.fire({
      icon: "success",
      title: "Perfecto!",
      text: "El producto se agrego correctamente a tu wishlist",
      showConfirmButton: false,
      timer: 1000,
    });
  };

  useEffect(() => {
    if (
      typeof wishlist.find != undefined &&
      typeof wishlist.find == "function" &&
      typeof wishlist.map == "function"
    ) {
      if (wishlist.find((wish) => wish.productId == props.id)) addFav(true);
      else addFav(false);
    }
  }, [wishlist]);

  const handleAddCart = () => {
    if (user.id) {
      const prod = [
        {
          productId: props.id,
          unitprice: parseInt(props.price),
          quantity: 1,
        },
      ];
      console.log("este es el producto que voy a mandar ", prod);

      if (cart.order != null) {
        if (cart.cartProducts.find((e) => e.id == prod[0].productId)) {
          productAlert();
        } else {
          console.log("entro al update");
          const orderProducts = cart.cartProducts.map((e) => {
            return {
              productId: e.id,
              unitprice: parseInt(e.price),
              quantity: parseInt(e.Order_Product.quantity),
            };
          });
          dispatch(
            updateOrder(cart.order.id, {
              ...cart.order,
              products: orderProducts.concat(prod),
            })
          ).then(() => {
            setTimeout(() => {
              dispatch(getCart(user.id));
              setAdd(true);
              sweetAlert();
            }, 600);
          });
        }
      } else {
        console.log("con este producto se creara la orden, ", prod);
        dispatch(
          createOrder({
            status: "cart",
            home_address: "",
            location: "",
            total_price: 0,
            province: "",
            country: "Argentina",
            postal_code: "0000",
            phone_number: "0000000000",
            userId: user.id,
            products: [prod],
          })
        ).then(() => {
          setTimeout(() => {
            dispatch(getCart(user.id));
            setAdd(true);
            sweetAlert();
          }, 600);
        });
      }
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops",
        text: "Debes estar logueado para añadir al carrito",
        confirmButtonColor: "#ee8589",
        confirmButtonText: `Iniciar sesión`,
        allowOutsideClick: true,
      }).then((result) => {
        if (result.isConfirmed) {
          history.push("/signin");
        }
      });
    }
  };

  const handleSubmit = (e) => {
    console.log(typeof e.target.value);
    if (e.target.value == "true") {
      console.log("aca a punto de entrar al dispatch para deletearlo");

      if (user.id != undefined && props.id != undefined) {
        dispatch(deleteWishlist({ userId: user.id, productId: props.id })).then(
          () => {
            if (document.getElementById("wishlist") != undefined) {
              console.log("magia de jacobo");
              console.log(document.getElementById("wishlist"));
              dispatch(getWishlist(user.id));
            }
          }
        );
        addFav(false);
      }
    }

    if (e.target.value == "false") {
      console.log("aca a punto de entrar al dispatch para crearlo");
      addWishList();
      if (user.id != undefined && props.id != undefined) {
        dispatch(createWishlist({ productId: props.id, userId: user.id })).then(
          () => {
            if (document.getElementById("wishlist") != undefined)
              dispatch(getWishlist(user.id));
          }
        );
        addFav(true);
      }
    }
  };

  return (
    <div className="card mt-5">
      <div className="text-center">
        <div className="about">
          <NavLink
            style={{ textDecoration: "none", color: "black" }}
            to={`/product/${props.id}`}
          >
            <div className="text-center imagen-container">
              <img className="nail" id="main-image" src={props.url} />
            </div>
            <div className="titulo text-center">
              <h6>{props.title}</h6>
            </div>
          </NavLink>
        </div>
        <div className="descri-price text-center">
          <h3>${props.price}</h3>
          {props.stock > 0 && <h6>Stock Disponible </h6>}
        </div>
      </div>

      <div className="botones-center cart-button mt-3 px-2 d-flex justify-content-around align-items-center">
        <button
          className="carrito-button btn btn-dark text-uppercase "
          disabled={add || props.stock == 0}
          onClick={handleAddCart}
        >
          Añadir al carrito
        </button>
        {user.id ? (
          <div class="add">
            <span class="product_fav">
              {
                <button
                  class={Fav === true ? "fa fa-heart" : "fa fa-heart-o"}
                  value={Fav}
                  onClick={handleSubmit}
                ></button>
              }
            </span>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default CardProduct;
