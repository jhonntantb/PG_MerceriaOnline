import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getUser } from '../../redux/actions/user/index';
import { getOrdersFromUser, updateOrderStatus } from '../../redux/actions/order/index';
import Swal from 'sweetalert2';
import {useHistory} from "react-router-dom";

export default function AfterCheckoutRejected(props) {
    const history = useHistory();
    const dispatch = useDispatch();
    var storeUser = useSelector(state => state.userReducer.user);
    var storeOrder = useSelector(state => state.orderReducer.order);
    var localUserId = localStorage.getItem("pg_merceria");
    var [loading, setLoading] = useState(true)

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
                dispatch(updateOrderStatus(storeOrder[0].id, "cart"))
            }
            setLoading(false)
        }
    }, [storeOrder])


    const alerterror = () => {
        let nom = storeUser.user_name
        Swal.fire({
            icon: 'error',
            title: 'Lo sentimos ' + nom,
            text: 'tu orden no pudo ser confirmada',
            confirmButtonText: 'Ir al carrito',
            confirmButtonColor: "#212529",
            allowOutsideClick: false
        }).then((result) => {
            if (result.isConfirmed) {
                history.push('/cart') 
            }
        })
    }

    return loading ? (
        <div>{alerterror()}</div>
    ) : <div>loading...</div>


}