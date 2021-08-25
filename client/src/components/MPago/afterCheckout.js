import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getUser } from '../../redux/actions/user/index';
import { getOrdersFromUser, updateOrderStatus, clearOrder } from '../../redux/actions/order/index';
import { sendOrderStatusEmail } from '../../redux/actions/mail/index';
import Swal from 'sweetalert2';



export default function AfterCheckout(props) {
    const dispatch = useDispatch();
    const storeUser = useSelector(state => state.userReducer.user);
    const storeOrder = useSelector(state => state.orderReducer.order);
    const localUserId = localStorage.getItem("pg_merceria")
    const [loading, setLoading] = useState(true)

    //aqui capturo y filtro para conocer el status de pago de MP
    var query = props.location.search;
    var mp_response_detail = query.split("&")
    var order_status_fromMP = mp_response_detail[3].split('=')[1]


    useEffect(() => {
        if (localUserId !== 'guest') {
            dispatch(getUser(localUserId))
            dispatch(getOrdersFromUser(localUserId, 'checkout'))
        }
    }, [])

    useEffect(() => {
        if (storeOrder.length > 0) {

            if (storeOrder[0].status === 'checkout') {
                dispatch(updateOrderStatus(storeOrder[0].id, "approved"))
                setTimeout(function () {
                    dispatch(sendOrderStatusEmail(storeUser.id, storeOrder[0].id))
                    dispatch(clearOrder())
                }, 1000)
            }
            setLoading(false)
            alerterror()
            localStorage.setItem("cart", "[]")
        }

    }, [storeOrder])



    const alerterror = () => {
        let nom = storeUser.user_name;
        let email = storeUser.email
        let dir = storeOrder[0].home_address;
        let dir2 = storeOrder[0].location;
        Swal.fire({
            icon: 'success',
            title: 'Gracias por elegirnos ' + nom,
            confirmButtonText: 'Ok',
            confirmButtonColor: "#212529",
            allowOutsideClick: false
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    text: "tu orden fue confirmada será enviada a: " + dir + " - " + dir2 + " - revisa tu casilla de correo "
                        + email + " para seguir el estado de tu envío",
                    confirmButtonText: 'Ok',
                    confirmButtonColor: "#212529",
                    allowOutsideClick: false
                }).then((result) => {
                    if (result.isConfirmed) {
                        props.history.push('/');
                    }
                })
            }
        })
    }

    return (<div>
        {loading ?
            <div>{ }</div>
            : <p>loading</p>}
    </div>)


}