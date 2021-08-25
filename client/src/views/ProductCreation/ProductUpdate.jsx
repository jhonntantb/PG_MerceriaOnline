import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategory } from "../../redux/actions/category";
import { updateProduct, getAllProduct } from "../../redux/actions/product";
import { getAllOffice } from "../../redux/actions/office";
import ReactFirebaseFileUpload from "../../components/FileUploader/FileUploader";
import "./ProductUpdate.css";
import Swal from "sweetalert2";

// Cambio Henry Goyret: render de catalog_id comentado, porque el catalogo_id esta asociado al id del producto y no debe poder cambiarse,
// pues puede haber informacion (ordenes, etc) que ya tienen el dato del catalog id dle producto.
// 

function ProductUpdate(props) {
  const admin = localStorage.getItem("admin");

  const product = useSelector((state) => state.productReducer.product);


  const dispatch = useDispatch();

  const storeCategories = useSelector(
    (state) => state.categoryReducer.categories
  );
  const storeOffices = useSelector((state) => state.officeReducer.offices);

  const [inputCategories, setInputCategories] = useState([]);
  const [inputOffice, setInputOffice] = useState([]);
  const [storeImages, setStoreImages] = useState([]);


  var stockQuantity = 0;
  var stockOfficeId = "0";
  if (product.stocks.length > 0) {
    stockQuantity = product.stocks[0].quantity;
    stockOfficeId = product.stocks[0].officeId;
  }

  const local_initial_state = {
    id: product.id,
    title: product.title,
    resume: product.resume,
    detail: product.detail,
    price: product.price,
    catalog_id: product.catalog_id,
    image: product.productimages,
    category: product.categories,
    quantity: stockQuantity,
    office: stockOfficeId,
  };

  const [addProduct, setaddProduct] = useState(local_initial_state);

  const handleAlert = () => {
    Swal.fire({
      icon: "success",
      title: "¡Enhorabuena!",
      text: "El producto se actualizo correctamente",
      showConfirmButton: true,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      addProduct.title !== "" &&
      addProduct.resume !== "" &&
      addProduct.detail !== "" &&
      addProduct.price !== "" &&
      addProduct.catalog_id !== null &&
      addProduct.image.length > 0 &&
      addProduct.quantity >= 0 &&
      addProduct.office !== ""
    ) {
      dispatch(updateProduct(addProduct));
      dispatch(getAllProduct());
      handleAlert();
      props.history.push("/productlist");
    } else {

      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Debe completar todos los campos',
      })
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
        Categorias
        {storeCategories.map((c, i) => {
          let preCat = product.categories.find(e => e.id === c.id)
          if (preCat !== undefined) {
            return (
              <div>
                <input
                  type="checkbox"
                  id={i}
                  name={c.name}
                  value={c.id}
                  checked="true"
                  onChange={(e) => selectCategory(e)}
                />
                <label for={i}>{c.name}</label>
                <br />
              </div>
            );
          } else {
            return (
              <div>
                <input
                  type="checkbox"
                  id={i}
                  name={c.name}
                  value={c.id}
                  onChange={(e) => selectCategory(e)}
                />
                <label for={i}>{c.name}</label>
                <br />
              </div>
            );
          }
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
        Sucursal
        {
          <select onChange={(e) => selectOffice(e)}>
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

  useEffect(() => {

    let auxStoreImages = []
    product.productimages.forEach(pi => auxStoreImages.push(pi.image_url))
    setStoreImages(auxStoreImages)
  }, [product])

  return admin !== "null" ? (
    <div className="container">
      <h1 className="text-center mt-3">Modificación de productos</h1>
      <form>

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
          <label className="form-label">Resumen del Producto</label>
          <input
            name="resume"
            value={addProduct.resume}
            onChange={handleChange}
            className="form-control"
            autoComplete="off"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Detalles</label>
          <textarea
            name="detail"
            className="form-control"
            value={addProduct.detail}
            onChange={handleChange}
            rows="10"
            autoComplete="off"
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
        <div>
          <p>{`Catalogo:  ${addProduct.catalog_id}`}</p>
        </div>
        {renderOffices()}
        {product.categories ? renderCategories() : <p>...loading</p>}
        <ReactFirebaseFileUpload
          storeImages={storeImages}
          setStoreImages={setStoreImages}
        />
        <button
          disabled={storeImages.length > 0 ? false : true}
          className="buttonupdate"
          onClick={(e) => {
            handleSubmit(e);
          }}
        >
          Actualizar Producto
        </button>
      </form>
    </div>
  ) : null;
}

export default ProductUpdate;
