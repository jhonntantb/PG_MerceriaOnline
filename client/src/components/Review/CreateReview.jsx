import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import React from "react";
import { createReview } from "../../redux/actions/review/index";
import ReviewSeparator from "./ReviewSeparator";
import Swal from "sweetalert2";
import { FaStar } from "react-icons/fa";

export default function CreateReview({ match }) {
  const dispatch = useDispatch();
  const id = useSelector((state) => state.userReducer.user.id);

 
  const [send, setsend] = useState("False");

  function handleSubmit(e) {
    const mostrarAlerta = () => {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "¡El campo no puede quedar vacio!",
      });
    };
  
    if (values.description.length < 1) mostrarAlerta();
    else if (parseInt(values.score) < 1 || parseInt(values.score) > 5)
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "El Valor de score esta fuera del permitido",
    })
    else {
      dispatch(createReview(values));
      setsend("true");
    }
  }

  const stars = Array(5).fill(0);
  const [values, setValues] = useState({
    description: "",
    score: 0,
    userId: id, //ACA TENGO QUE ACCEDER AL SESSION STORAGE PARA OBTENER EL USERID
    productId: match,
  });
  const [hoverValue, setHoverValue] = useState(undefined);

  const colors = {
    orange: "FFBA5A",
    grey: "a9a9a9",
  };

  const handleClick = (value) => {
    setValues({
      ...values,
      score: value,
    });
  };

  const handleMouseOver = (value) => {
    setHoverValue(value);
  };

  const handleMouseleave = () => {
    setHoverValue(undefined);
  };

  const alertSucces = () => {
    Swal.fire({
      icon: "success",
      title: "Muchas gracias",
      text: "Tu review se a enviado correctamente!",
      showConfirmButton: false,
      timer: 1400,
    });
  };

  return (
    <div className="container mt-5">
      <form className="form-horizontal" onSubmit={handleSubmit}>
        <div className="form-group mt-5">
          <label for="email" class="col-sm-3 control-label mt-5">
            <h3 className="text-dark">Dejanos tu review!</h3>
          </label>
          <div className="col-sm-5">
            <textarea
              className="form-control"
              rows="6"
              onChange={(e) => {
                setValues({ ...values, description: e.target.value });
              }}
            >
            </textarea>
          </div>
          <div className="mt-2">
            <label className="mt-2" htmlFor="score">
              Selecciona una puntuación{" "}
            </label>
            <div>
              {stars.map((_, index) => {
                return (
                  <FaStar
                    key={index}
                    id="score"
                    size={28}
                    value={index}
                    style={{
                      marginRight: 10,
                      cursor: "pointer",
                    }}
                    color={
                      (hoverValue || values.score) > index
                        ? colors.orange
                        : colors.grey
                    }
                    onClick={() => handleClick(index + 1)}
                    onMouseOver={() => handleMouseOver(index + 1)}
                    onMouseLeave={handleMouseleave}
                  />
                );
              })}
            </div>
          </div>
        </div>
        <input
          style={{ background: "#ee8585" }}
          className="btn text-white mt-3"
          type="submit"
          value="Enviar"
        />
      </form>
      {send === "true" && alertSucces()}
      <ReviewSeparator />
    </div>
  );
}
