import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { updateUser, getUser } from "../../../redux/actions/user";
import Swal from 'sweetalert2'







export default function AccountConfirmation(props) {
 

  const dispatch = useDispatch()

  var search = props.location.search

  var id = search.split("&")[1].split("=")[1];

  var activateUser = [
    {
      id: id,
      changes: { active: true }
    }
  ]


  useEffect(()=>{
    dispatch(updateUser(activateUser))
    localStorage.setItem("pg_merceria", id)
    dispatch(getUser(id))
    show()
},[])

 
  function  show (props) {
    Swal.fire({
      title: '¡Gracias por registrarte!',
      showDenyButton: true,
      imageUrl: 'https://scontent.fros1-1.fna.fbcdn.net/v/t1.18169-9/10923273_406735952831411_3065322763382978546_n.jpg?_nc_cat=104&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=DE6FeJqDYvsAX8eum5v&_nc_ht=scontent.fros1-1.fna&oh=fd3584936bb85973be9fceaa54490478&oe=61435A58',
      imageWidth: 400,
      imageHeight: 400,
      confirmButtonColor: "#212529",
      denyButtonColor: "#212529 ",
      confirmButtonText: `Comprar`,
      denyButtonText: `Mi cuenta`,
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.href = "/productlist";
      } else if (result.isDenied) {
        window.location.href = "/account";
      }
    })
  }

  return (
     <div></div>
    )
}