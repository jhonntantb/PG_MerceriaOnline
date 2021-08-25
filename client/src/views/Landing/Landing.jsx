import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProduct } from "../../redux/actions/product";
import Carrousel from "../../components/Carrousel/Carrousel";
import CardProduct from "../../components/ProductList/CardProduct";
//import Newsletter from "../../components/Newsletter/Newsletter";
import Footer from "./../../components/Footer/Footer";
import "./Landing.css";

export const Landing = () => {
  const items = [
    {
      image_url:
        "https://images.unsplash.com/photo-1597484662003-7cf93e97447c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=967&q=80",
      altText: "Slide 1",
      caption: "Slide 1",
    },
    {
      image_url:
        "https://images.unsplash.com/photo-1597484657134-cfa8511b913b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=967&w=1080",
      altText: "Slide 2",
      caption: "Slide 2",
    },
    {
      image_url:
        "https://images.unsplash.com/photo-1546957236-5fde4e0b25eb?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1051&q=1080&w=1080",
      altText: "Slide 3",
      caption: "Slide 3",
    },
  ];
  const dispatch = useDispatch();

  const list = useSelector((state) => state.productReducer.products);
  useEffect(() => {
    dispatch(getAllProduct());
  }, []);

  let list4 = [];


  list4.push(list[0], list[1], list[2], list[3]);
  return (
    <div style={{marginTop:"5%"}}>
      <div >
        <Carrousel images={items} />
      </div>
      <div class="container-fluid">
        <h2 className="text-center">Productos Destacados</h2>
        <div class="row">
          <div class="col-md-3">
            {/* {<Newsletter />} */}
          </div>
          <div class="col-md-9">
            <div>
              {list.length > 2 &&
                list4.map((c) => (
                  <CardProduct
                    key={c.id}
                    id={c.id}
                    url={c.productimages[0].image_url}
                    price={c.price}
                    title={c.title}
                  />
                ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Landing;
