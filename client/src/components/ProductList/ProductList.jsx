import { useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getAllProduct } from "../../redux/actions/product/index.js";
import { SetCategoriesFiltradas } from "../../redux/actions/category/index.js";
import { getAllCategory } from "../../redux/actions/category/index.js";
import { getCart } from "../../redux/actions/cart/index"
import { getAllOrder } from "../../redux/actions/order/index"
import "./ProductList.css";
import CardProduct from "./CardProduct.jsx";
import { getWishlist } from "../../redux/actions/wishlist/index.js";
import Scroll from "../Scroll/Scroll.jsx";

function ProductList() {
  const dispatch = useDispatch();

  const list = useSelector((state) => state.productReducer.products);
  const categorias = useSelector((state) => state.categoryReducer.categories);
  const id = useSelector((state) => state.userReducer.user.id);
  const user = useSelector((state) => state.userReducer.user);
  var categoryFiltrada = useSelector(
    (state) => state.categoryReducer.categoryFiltrada
  );
  const [stock, setStock] = useState([]); //en que viene para la tabla
  const [Minimo, setMinimo] = useState("");
  const [Maximo, setMaximo] = useState("");
  const [orden, setOrden] = useState("A-Z");
  useEffect(() => {
    console.log('useEffect list productlist: ',list)
    !list.length && dispatch(getAllProduct());
    dispatch(getAllCategory());
    dispatch(getWishlist(id))
    if(user.id)
      dispatch(getAllOrder(user.id, "cart"))
    else
      dispatch(getCart())
  }, []);

  var lista_filtrada = [];
  if (categoryFiltrada != "Todas") {
    list.map((e) =>
      e.categories.map((a) => {
        if (a.name === categoryFiltrada) lista_filtrada.push(e);
      })
    );
  } else lista_filtrada = list;
  //console.log(list);
  //console.log("CATEGORY" + categoryFiltrada);
  //console.log("lISTA_FILTRADA" + lista_filtrada);
  //console.log(Minimo);
  // console.log(Maximo);

  if (Minimo != "" && Maximo != "") {
    lista_filtrada = lista_filtrada.filter((val) => {
      if (val.price > Minimo && val.price < Maximo) {
        return val;
      }
    });
  }
  if (Minimo != "" && Maximo == "") {
    lista_filtrada = lista_filtrada.filter((val) => {
      if (val.price > Minimo) {
        return val;
      }
    });
  }
  if (Minimo == "" && Maximo != "") {
    lista_filtrada = lista_filtrada.filter((val) => {
      if (val.price < Maximo) {
        return val;
      }
    });
  }
  if (Minimo == "" && Maximo == "" && orden == "A-Z") {
    if (lista_filtrada)
      lista_filtrada.sort(function (a, b) {
        if (a.title < b.title) {
          return -1;
        }
        if (a.title > b.title) {
          return 1;
        }
        return 0;
      });
  }

  if (Minimo == "" && Maximo == "" && orden == "Z-A") {
    lista_filtrada.sort(function (a, b) {
      if (a.title > b.title) {
        return -1;
      }
      if (a.title < b.title) {
        return 1;
      }
      return 0;
    });
  }
  //-------------------------Paginado de Tablas------------------//
  const [currentPage, setCurrentPage] = useState(1);
  const [cardPerPage, setCardsPerPage] = useState(10); //cuantas cards queremos mostrar
  const [pageNumberLimit, setPageNumberLimit] = useState(5);
  const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(5);
  const [minPageNumberLmit, setMinPageNumberLmit] = useState(0);
  const handleClick = (event) => {
    setCurrentPage(Number(event.target.id));
  };
  const handleNextbtn = () => {
    setCurrentPage(currentPage + 1);
    if (currentPage + 1 > maxPageNumberLimit) {
      setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setMinPageNumberLmit(minPageNumberLmit + pageNumberLimit);
    }
  };
  const handlePrevbtn = () => {
    setCurrentPage(currentPage - 1);
    if ((currentPage - 1) % pageNumberLimit === 0) {
      setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
      setMinPageNumberLmit(minPageNumberLmit - pageNumberLimit);
    }
  };

  const pages = [];
  for (let i = 1; i <= Math.ceil(lista_filtrada.length / cardPerPage); i++) {
    pages.push(i);
  }
  const indexOfLastItem = currentPage * cardPerPage;
  const indexOfFirstItem = indexOfLastItem - cardPerPage;
  const currentItems = lista_filtrada.slice(indexOfFirstItem, indexOfLastItem);
  const renderPageNumbers = pages.map((number) => {
    if (number < maxPageNumberLimit + 1 && number > minPageNumberLmit) {
      return (
        <li
          key={number}
          id={number}
          onClick={handleClick}
          className={currentPage === number ? "activo" : null}
        >
          {number}
        </li>
      );
    } else {
      return null;
    }
  });
  
  useEffect(() => {
    //console.log("esto es lista filtrada",lista_filtrada)
    //console.log("pages*10",pages)
    if(lista_filtrada.length<((pages.length)*10)){
      setCurrentPage(1)
    }
  }, [lista_filtrada])
  // console.log(lista_filtrada)

  return list.length > 0 ? (
    <div className="container-fluid main">
      <div className="row">
        <div id="tableleft" className="col-md-3 mt-5">
          <div className="justify-content-start mx-5">
            <label htmlFor="categories">Filtrar por categorias</label>
            <select
              className="form-select"
              aria-label=".form-select-lg "
              id="categories"
              onChange={(e) => {
                dispatch(SetCategoriesFiltradas(e.target.value));
              }}
            >
              <option value={categoryFiltrada}>{categoryFiltrada}</option>
              {categoryFiltrada != "Todas" && (
                <option value="Todas">Todas</option>
              )}

              {categorias &&
                categorias.length > 0 &&
                categorias.map(
                  (lista) =>
                    lista.name != categoryFiltrada && (
                      <option value={lista.name}>{lista.name}</option>
                    )
                )}
            </select>
            <br />
            <br />
            <label>Precio </label>
            <div className="input-group  mb-3">
              <span class="input-group-text">$</span>
              <input
                className="form-control"
                type="text"
                name="Minimo"
                id="Minimo"
                placeholder="Minimo"
                onChange={(e) => {
                  setMinimo(e.target.value);
                }}
              />
            </div>
            <div className="input-group">
              <span class="input-group-text">$</span>
              <input
                className="form-control"
                type="text"
                name="Maximo"
                id="Maximo"
                placeholder="Maximo"
                onChange={(e) => {
                  setMaximo(e.target.value);
                }}
              />
            </div>
            <br />
            <br />
            <label htmlFor="categories">Ordenar </label>
            <br />
            <select
              className="form-select"
              id="categories"
              onChange={(e) => {
                setOrden(e.target.value);
              }}
            >
              <option value="A-Z">"A-Z"</option>
              <option value="Z-A">"Z-A"</option>
            </select>
          </div>
        </div>
        <div className="col-md-9">
          {currentItems && currentItems.length > 0 ? (
            currentItems.map((e) => {
              return (
                <>
                  <span key={e.id} className="card-deck   mx-1">
                    <CardProduct
                      title={e.title}
                      price={e.price}
                      url={e.productimages[0].image_url}
                      id={e.id}
                      stock={
                        e.stocks.length > 0 ? e.stocks[0].quantity : undefined
                      }
                    />
                  </span>
                  <Scroll />
                </>
              );
            })
          ) : (
            <h3 className="text-center mt-4">No hay productos</h3>
          )}
        </div>
      </div>
      <ul className="pageNumbers">
        <li>
          <button
            onClick={handlePrevbtn}
            disabled={currentPage === pages[0] ? true : false}
          >
            prev
          </button>
        </li>
        {renderPageNumbers}
        <li>
          <button
            onClick={handleNextbtn}
            disabled={currentPage === pages[pages.length - 1] ? true : false}
          >
            next
          </button>
        </li>
      </ul>
    </div>
  ) : (
    <h1 className="text-center mt-5">
      No hay productos que coincidan con ese nombre
    </h1>
  );
}

export default ProductList;
