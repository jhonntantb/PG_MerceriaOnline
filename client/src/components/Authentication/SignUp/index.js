import React from 'react';
import { withRouter } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { compose } from 'recompose';
import { createUser, clearUser } from '../../../redux/actions/user/index';
import { sendEmailConfirmation } from '../../../redux/actions/mail/index';
import { withFirebase } from '../../FireBase';
import * as ROUTES from '../../../routes';
import { validateUserName, validateUserEmail } from "./errorsControl"
import { callCity, callRegion } from './locationCall';
import { Input } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import './index.css';


const SignUpPage = () => (
  <div>
    <SignUpForm />
  </div>
);

const initial_state = {
  user_name: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  error: null
};

function SignUpFormBase(props) {

  const storeUser = useSelector(state => state.userReducer.user)
  const dispatch = useDispatch();
  const [region, setRegion] = useState([])
  const [apiCity, setApiCity] = useState([])


  var [state, setState] = useState(initial_state)
  var [loading, setLoading] = useState(true)
  var [userError, setUserError] = useState(false)
  var [emailError, setEmailError] = useState(false)

  const onSubmitHandler = async (e) => {

    const { user_name, first_name, last_name, email, passwordOne, province, city, street } = state;
    e.preventDefault();

    try {
      var authUser = await props.firebase.doCreateUserWithEmailAndPassword(email, passwordOne);
      var userOk = {
        id: authUser.user.uid,
        user_name,
        first_name,
        last_name,
        email,
        address: street,
        province: province,
        location: city,
        active: false
      }
      if (authUser.user.uid !== undefined) {
        dispatch(createUser(userOk))
        setState({ ...initial_state })
      } else {
        throw new Error("Se produjo un Error, por favor contactar al administrador")
      }
    } catch (error) {
      setState({ ...state, error: error })
    }
  }

  const onChangeHandler = async (e) => {
    e.preventDefault();
    setState({
      ...state,
      [e.target.name]: e.target.value
    })
    if (e.target.name === "user_name") {
      if (e.target.value.length > 3) {
        var validated = await validateUserName(e.target.value)
        setUserError(validated)

      } else { setUserError(false) }
    }
    if (e.target.name === "email") {
      if (e.target.value.includes("@") && e.target.value.includes(".com")) {
        var validated = await validateUserEmail(e.target.value)
        setEmailError(validated)
      } else {
        if (e.target.value.length > 0) {
          setEmailError(true)
        } else { setEmailError(false) }
      }
    }
  }

  const { user_name, first_name, last_name, email, passwordOne, passwordTwo, province, city, street, error,
  } = state;

  const isInvalid =
    (passwordOne !== passwordTwo ||
      passwordOne === '' ||
      email === '' ||
      user_name === '');

  useEffect(() => {
    if (storeUser.email) {
      alert("verifica tu correo electronico para continuar con el proceso")
      dispatch(sendEmailConfirmation(storeUser))
      dispatch(clearUser())
      props.history.push(ROUTES.LANDING)
    }
  }, [storeUser])



  useEffect(async () => {
    var loadedRegion = await callRegion()
    setRegion(loadedRegion)
    setLoading(false)
  }, [])

  useEffect(async () => {
    if (state.province !== "") {
      var loadedCity = await callCity(state.province)
      setApiCity(loadedCity)
    }
  }, [state.province])


  return !loading ? (
    <div className="container mt-5">
      <h3 className="mb-4 text-center fs-1">Registrarse</h3>
      <form onSubmit={onSubmitHandler}>
        <div className="row">
          <div className="col-md-6">
            <div className="mb-3 mt-3">
              <label style={{ marginLeft: "3px" }}>Nombre de usuario</label>
              <input
                name="user_name"
                value={user_name}
                onChange={onChangeHandler}
                type="text"
                placeholder="Nombre de Usuario"
                className="form-control"
              />
            </div>
            <div hidden={user_name.length > 3 || user_name.length === 0}
              className="alert alert-primary" role="alert">
              El Nombre de usuario debe contar con al menos 4 caracteres
            </div>
            <div hidden={!(userError)}
              class="alert alert-danger" role="alert">
              El nombre de usuario ya esta en uso
            </div>
            <div className="mb-3 mt-3">
              <label style={{ marginLeft: "3px" }}>Nombre</label>
              <input
                name="first_name"
                value={first_name}
                onChange={onChangeHandler}
                type="text"
                placeholder="Nombre"
                className="form-control"
              />
            </div>
            <div className="mb-3 mt-3">
              <label style={{ marginLeft: "3px" }}>Apellido</label>
              <input
                name="last_name"
                value={last_name}
                onChange={onChangeHandler}
                type="text"
                placeholder="Apellido"
                className="form-control"
              />
            </div>
            <div className="mb-3 mt-3">
              <label style={{ marginLeft: "3px" }}>Email</label>
              <input
                name="email"
                value={email}
                onChange={onChangeHandler}
                type="text"
                placeholder="Email"
                className="form-control"
              />
            </div>
            <div hidden={!emailError} className="alert alert-danger" role="alert">
              El email no tiene el formato adecuado o ya se encuentra registrado
            </div>
            <div className="mb-3 mt-3">
              <label style={{ marginLeft: "3px" }}>Contraseña</label>
              <input
                name="passwordOne"
                value={passwordOne}
                onChange={onChangeHandler}
                type="password"
                placeholder="Contraseña"
                className="form-control"
              />
            </div>
            <div className="mb-3 mt-3">
              <label style={{ marginLeft: "3px" }}>Confirmar contraseña</label>
              <input
                name="passwordTwo"
                value={passwordTwo}
                onChange={onChangeHandler}
                type="password"
                placeholder="Confirmar Contraseña"
                className="form-control"
              />
            </div>
            <div hidden={passwordOne === passwordTwo} className="alert alert-danger" role="alert">
              Las contraseñas deben coincidir
            </div>
          </div>
          <div className="col-md-6">
            <div className="mb-3 mt-3 separador">
              <label style={{ marginLeft: "3px" }}>Provincia</label>
              <Input
                name="province"
                value={province}
                onChange={onChangeHandler}
                type="select"
                placeholder="provincia"
                className="form-control"
              >
                <option key='region' value='seleccionarRegion'>--Seleccionar--</option>
                {region.map((r, index) => <option key={r.nombre + index} value={r.nombre}>{r.nombre}</option>)}
              </Input>
            </div>
            <div className="mb-3 mt-3 separador">
              <label style={{ marginLeft: "3px" }}>Ciudad</label>
              <Input
                name="city"
                value={city}
                onChange={onChangeHandler}
                type="select"
                placeholder="ciudad"
                className="form-control"
              >
                <option key='city' value='seleccionarCiudad'>--Seleccionar--</option>
                {apiCity.map((c, index) => <option key={index} value={c.nombre}>{c.nombre}</option>)}
              </Input>
            </div>
            <div className="mb-3 mt-3 separador">
              <label style={{ marginLeft: "3px" }}>Calle y Numero</label>
              <input
                name="street"
                value={street}
                onChange={onChangeHandler}
                type="text"
                placeholder="calle y numero"
                className="form-control"
              />
            </div>
          </div>
        </div>
        <div className="d-grip gap-2 mb-3 text-center mt-4">
          <button className="btn btn-dark btn-lg border-0 rounded-0" disabled={isInvalid || userError || emailError} type="submit">Registrarse</button>
        </div>
        {error && <p className='text-danger text-center'>{error.message}</p>}
      </form>
    </div>
  ) : (<h2 className="text-center text-dark mt-5">Cargando...</h2>);
}

const SignUpLink = () => {
  return (<p>
    <hr />
    <NavLink className="text-dark" to={ROUTES.SIGN_UP}>crear cuenta</NavLink>
  </p>)
}

const SignUpForm = compose(
  withRouter,
  withFirebase,
)(SignUpFormBase);

export default SignUpPage;
export { SignUpForm, SignUpLink };