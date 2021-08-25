import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import CardProduct from "../../components/ProductList/CardProduct";
import { getWishlist } from "../../redux/actions/wishlist";
import Swal from "sweetalert2";
import { useHistory } from "react-router";
import Scroll from "../../components/Scroll/Scroll";

export default function Wishlist() {
  const dispatch = useDispatch();
  const id = useSelector((state) => state.userReducer.user.id);

  const wishlist = useSelector((state) => state.wishlistReducer.wishlist);
  const [Ready, setReady] = useState(false);
  const history = useHistory();
  useEffect(() => {
    dispatch(getWishlist(id)).then(() => {
      setReady(true);
    });
  }, []);

  const noproducts = () => {
    Swal.fire({
      icon: "error",
      title: "Oops",
      text: "Parece que todavia no tenes favoritos",
      confirmButtonText: `Ir a productos`,
      allowOutsideClick: false,
    }).then((result) => {
      if (result.isConfirmed) {
        history.push("/productlist");
      }
    });
  };

  return (
    Ready && (
      <div className="container" style={{marginTop: "5%"}}>
        <h2 className="text-dark text-center mt-5">Lista de favoritos</h2>
      <div id="wishlist">
        <div className="text-center">
          {wishlist.length > 0 && typeof wishlist.map == "function" ? (
            wishlist.map((wish) => {
              return (
                <>
                  <CardProduct
                    title={wish.product?.title}
                    price={wish.product?.price}
                    url={wish.product?.productimages[0].image_url}
                    id={wish.product?.id}
                    stock={wish.product?.stocks[0].quantity}
                  />
                  <Scroll />
                </>
              );
            })
          ) : (
            <h1>{noproducts()}</h1>
          )}
        </div>
      </div>
      </div>
    )
  );
}
