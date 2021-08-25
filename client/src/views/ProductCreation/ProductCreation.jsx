import React, { useState, useEffect } from "react";
import {useHistory} from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { getAllCategory } from "../../redux/actions/category";
import {createProduct,getAllProduct,} from "../../redux/actions/product";
import { getAllOffice } from "../../redux/actions/office";
import ReactFirebaseFileUpload from "../../components/FileUploader/FileUploader";
import "./ProductCreation.css";
import NotFound from "../NotFound/NotFound";
import Swal from "sweetalert2";

const ProductCreation = (props) => {
  const admin = localStorage.getItem("admin");

  const dispatch = useDispatch();
  const { push } = useHistory() ;

  const storeCategories = useSelector(
    (state) => state.categoryReducer.categories
  );
  const storeOffices = useSelector((state) => state.officeReducer.offices);
  const products = useSelector((state) => state.productReducer.products);

  const [inputCategories, setInputCategories] = useState([]);
  const [inputOffice, setInputOffice] = useState([]);
  const [storeImages, setStoreImages] = useState([]);

  const local_initial_state = {
    title: "",
    resume: "",
    detail: "",
    price: "",
    catalog_id: null,
    image: [],
    category: [],
    quantity: 0,
    office: "",
  };

  const [addProduct, setaddProduct] = useState(local_initial_state);

  const handleAlert = () => {
    Swal.fire({
      icon: "success",
      title: "¡Enhorabuena!",
      text: "El producto se creó correctamente",
      showConfirmButton: true,
      
    });
  };

  

  useEffect(() => {
    dispatch(getAllProduct());
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    var exist = false;
    for(let i=0; i<products.length; i++){
      if(products[i].catalog_id === addProduct.catalog_id) {
      exist = true
      break
      } 
    }

    if (
      addProduct.title !== "" &&
      addProduct.resume !== "" &&
      addProduct.detail !== "" &&
      addProduct.price !== "" &&
      addProduct.catalog_id !== null &&
      addProduct.image.length > 0 &&
      addProduct.quantity > 0 &&
      addProduct.office !== "" &&
      !exist 
    ) {
      dispatch(createProduct(addProduct));
      dispatch(getAllProduct());
      handleAlert();
      push("/productlist");
    } else {
      if (exist) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Numero de catalogo ya existe, producto no creado',
        })
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Debe completar todos los campos',
        })
      }
    }
   
  };

  const handleChange = (e) => {
    setaddProduct({
      ...addProduct,
      [e.target.name]: e.target.value,
    });
  };

  function selectCategory(e) {
    var categorySelected = e.target.value;
    var aux = [categorySelected];

    if (!e.target.checked) {
      let filtered = inputCategories.filter((e) => e !== categorySelected);
      setInputCategories(filtered);
    } else {
      setInputCategories(inputCategories.concat(aux));
    }
  }

  function renderCategories() {
    return (
      <div>
       <span className="fs-5">Categorias</span> 
       <br />
        {storeCategories.map((c, i) => {
          return (
            <div className="fs-6">
              <br />
              <input
                type="checkbox"
                id={i}
                name={c.name}
                value={c.id}
                onChange={(e) => selectCategory(e)}
              />
              <label key={i}>{c.name}</label>
              <br />
            </div>
          );
        })}
      </div>
    );
  }

  function selectOffice(e) {
    var officeSelected = e.target.value;
    setInputOffice(officeSelected);
  }

  function renderOffices() {
    return (
      <div>
        <span className="fs-5 mr-2">Sucursal</span>
        {
          <select className=" mx-5 " onChange={(e) => selectOffice(e)}>
            {storeOffices.map((o, i) => (
              <option value={o.id}>{o.name}</option>
            ))}
          </select>
        }
      </div>
    );
  }
  useEffect(() => {
    dispatch(getAllCategory());
    dispatch(getAllOffice());
  }, []);

  useEffect(() => {
    setaddProduct({ ...addProduct, image: storeImages });
  }, [storeImages]);

  useEffect(() => {
    setaddProduct({ ...addProduct, category: inputCategories });
  }, [inputCategories]);

  useEffect(() => {
    setaddProduct({ ...addProduct, office: inputOffice });
  }, [inputOffice]);

  useEffect(() => {
    if (storeOffices.length > 0) setInputOffice(storeOffices[0].id);
  }, [storeOffices]);


  return admin !== "null" ? (
    <div className="container">
      <h1 className="text-center mt-3">Creación de productos</h1>
      <form>
        <p>Order: 123</p>
        <div className="mb-3">
          <label className="form-label">Nombre del Producto</label>
          <input
            name="title"
            value={addProduct.title}
            onChange={handleChange}
            className="form-control"
            autoComplete="off"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Características del Producto</label>
          <input
            name="resume"
            value={addProduct.resume}
            onChange={handleChange}
            className="form-control"
            autoComplete="off"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Detalle</label>
          <textarea
            name="detail"
            className="form-control"
            value={addProduct.detail}
            onChange={handleChange}
            autoComplete="off"
            rows="7"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Precio</label>
          <input
            type="number"
            name="price"
            min="0"
            value={addProduct.price}
            onChange={handleChange}
            className="form-control"
            placeholder="$"
            autoComplete="off"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">numero de catalogo</label>
          <input
            type="number"
            min="0"
            name="catalog_id"
            value={addProduct.catalog_id}
            onChange={handleChange}
            class="form-control"
            autoComplete="off"
            required
          />
          <div class="invalid-feedback">Se debe completar el campo</div>
        </div>
        <div className="mb-3">
          <label className="form-label">cantidad</label>
          <input
            type="number"
            name="quantity"
            min="0"
            value={addProduct.quantity}
            onChange={handleChange}
            className="form-control"
            placeholder="stock"
            autoComplete="off"
          />
        </div>
        {renderOffices()}
        <br />
        {renderCategories()}
        <ReactFirebaseFileUpload
          storeImages={storeImages}
          setStoreImages={setStoreImages}
        />
        <button
          disabled={storeImages.length > 0 ? false : true}
          id="buttonproduct"
          onClick={(e) => {
            handleSubmit(e);
          }}
        >
          Crear Producto
        </button>
      </form>
    </div>
  ) : (
    <NotFound />
  );
};

export default ProductCreation;