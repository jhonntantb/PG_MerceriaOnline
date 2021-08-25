import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SignUpLink } from '../SignUp/index';
import { PasswordForgetLink } from '../PasswordForget/index';
import { withFirebase } from '../../FireBase';
import { LogInUser } from '../../../redux/actions/login/index'
import { getUser, clearUser } from '../../../redux/actions/user/index';
import { GoogleButton } from './GoogleSignIn';
import { getWishlist } from '../../../redux/actions/wishlist';



const SignInPage = () => (
  <div className="container">
    <SignInForm />
  </div>
);

const initial_state = {
  email: '',
  password: '',
  error: null,
};

function SignInFormBase(props) {
  const user = useSelector(state => state.userReducer.user)
  var [state, setState] = useState(initial_state)
  const dispatch = useDispatch();

  const onSubmit = async event => {
    const { email, password } = state;
    //modificar para que checkee el state del usuario en esta instancia
    props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        dispatch(getUser(userCredentials.user.uid))
        setState({ ...initial_state });
      })
      .catch(error => {
        setState({ ...state, error: error });
        alert(error)
      });
    event.preventDefault();
  };

  const onChange = event => {
    setState({
      ...state,
      [event.target.name]: event.target.value
    });
  };

  useEffect(() => {
    if (user.active !== undefined) {
      //verifica el estado active del usuario
      if (user.active === true) {
        //verifica si es admin
        if (user.isAdmin === true) {
          localStorage.setItem("pg_merceria", (user.id))
          localStorage.setItem("admin", user.email)
          dispatch(getWishlist(user.id))
          props.history.push("/");
        } else {
          //setea el id del usuario al sessionStorage
          localStorage.setItem("pg_merceria", user.id)
          dispatch(getWishlist(user.id))
          props.history.push("/");

        }
        dispatch(LogInUser(user.email))
      } else {
        //si esta inactivo arroja un mensaje
        dispatch(clearUser())
        alert('El usuario ha sido inhabilitado por el administrador')
        props.history.push('/')
      }
    } else {
      //si user es guest, setea la session a guest
      localStorage.setItem("pg_merceria", 'guest')
    }

  }, [user])


  const { email, password, error } = state;

  const isInvalid = (password === '' || email === '');

  return (
    <div className="container" style={{ marginTop: "18%" }}>
      <div className="row content d-flex justify-content-center">
        <div className="col-md-5">
          <div className="box shadow bg-white p-4">
            <h3 className="mb-4 text-center fs-1">Ingresar</h3>
            <form className="mb-3" onSubmit={onSubmit}>
              <div className=" mb-3">
                <label>E-mail</label>
                <input
                  name="email"
                  className="form-control rounded-0"
                  id="floatingInput"
                  value={email}
                  onChange={onChange}
                  type="text"
                  placeholder="nombre@ejemplo"
                />
              </div>
              <div className="mb-3">
                <label>Contraseña</label>
                <input
                  name="password"
                  value={password}
                  onChange={onChange}
                  type="password"
                  placeholder="Contraseña"
                  className="form-control rounded-0"
                  id="floatingPassword"
                />
              </div>
              <div className="d-grip gap-2 mb-3 text-center">
                <button className="btn btn-dark btn-lg border-0 rounded-0" disabled={isInvalid} type="submit">
                  Enviar
                </button>
              </div>

              {error && <p className="text-danger text-center">{error.message}</p>}
              <div className="d-grip gap-2">
                <PasswordForgetLink />
                <SignUpLink />
                <GoogleButton props={props} />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );

}

const SignInForm = compose(
  withRouter,
  withFirebase,
)(SignInFormBase);

export default SignInPage;
export { SignInForm };