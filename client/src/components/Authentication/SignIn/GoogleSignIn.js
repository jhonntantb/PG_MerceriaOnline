import { withFirebase } from '../../FireBase/index'
import './google.css';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getGoogleUser, clearUser, getUser } from '../../../redux/actions/user/index';
import { LogInUser } from '../../../redux/actions/login/index';
import { useHistory } from 'react-router-dom';
import { sendEmailConfirmation } from '../../../redux/actions/mail/index';
import { getWishlist } from '../../../redux/actions/wishlist';

const GoogleButton = (props) => {
  const history = useHistory();
  return (<div className='google-btn'>
    <RenderButton props={props} history={history} />
  </div>)
}



const GoogleBase = (props) => {
  const [userok, setUserOk] = useState()
  const { history } = props
  const dispatch = useDispatch();
  const storeUser = useSelector(state => state.userReducer.user);

  function handleGoogle(e) {
    props.firebase
      .doSignInWithGoogle()
      .then(credentials => {
        //capturo datos con credentials.additionalUserInfo.profile  .email o .family_name o .given_name
        var user = {
          id: credentials.user.uid,
          email: credentials.additionalUserInfo.profile.email,
          first_name: credentials.additionalUserInfo.profile.given_name,
          last_name: credentials.additionalUserInfo.profile.family_name,
          user_name: credentials.additionalUserInfo.profile.email.split("@")[0],
        }
        //voy a tener que implementar una action especifica para esto =(
        dispatch(getGoogleUser(user))
        setUserOk(user)
      })
      .catch(err => alert(err.message))
  }

  useEffect(() => {
    if (userok) {
      dispatch(getUser(userok.id))
    }
  }, [userok])


  useEffect(() => {
    if (storeUser.active !== undefined) {
      //verifica el estado active del usuario
      if (storeUser.active === true) {
        //verifica si es admin
        if (storeUser.isAdmin === true) {
          localStorage.setItem("pg_merceria", (storeUser.id))
          localStorage.setItem("admin", storeUser.email)
          dispatch(getWishlist(storeUser.id))
          history.push('/');
        } else {
          //setea el id del usuario al sessionStorage
          localStorage.setItem("pg_merceria", storeUser.id)
          localStorage.setItem("admin", null)
          dispatch(getWishlist(storeUser.id))
          history.push('/');
        }
        dispatch(LogInUser(storeUser.email))
      } else {
        //si esta inactivo arroja un mensaje
        dispatch(sendEmailConfirmation(storeUser))
        dispatch(clearUser())
        alert('El usuario esta inhabilitado, verifique su casilla de correo para continuar con el proceso o contacte al adminsitrador')
        history.push('/')
      }

    } else {
      //si user es guest, setea la session a guest
      localStorage.setItem("pg_merceria", 'guest')
    }
  }, [storeUser])

  return (
    <div className="container text-center">
      <a
        className="btn btn-outline-dark"
        role="button"
        style={{ textTransform: "none" }}
        onClick={(e) => handleGoogle(e)}
      >
        <img
          width="20px"
          height="20px"
          style={{ marginBottom: 3, marginRight: 5 }}
          alt="Google sign-in"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png"
        />
        Ingresar con Google
      </a>
    </div>

  )
}

const RenderButton = withFirebase(GoogleBase)

export default GoogleButton;

export { RenderButton, GoogleButton };