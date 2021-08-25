import React,{ useState,useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux"
import DatePicker from 'react-date-picker';
import { getAllOffice } from '../../redux/actions/office/index'

function Turnero() {
    const dispatch = useDispatch()
    const [viewOffice,setViewOffice]=useState([])
    const [selectOffice,setSelectOffice]=useState(false)
    const [viewCalendary,setViewCalendary]=useState(false)
    const [selectedDate,setSelectedDate] = useState(null);
    const [officeId,setOfficeId]=useState("")
    const [quote,setQuote]=useState("")

    const allOffices = useSelector(state => state.officeReducer.offices)
    useEffect(() => {
        dispatch(getAllOffice())
    }, [])

    useEffect(() => {
        setViewOffice(allOffices)
    }, [allOffices])

    const userSelectOffice=(e)=>{
        setSelectOffice(!selectOffice)
    }
    const selectOfficeId=(e)=>{
        e.preventDefault()
        const value=e.target.value
        console.log(value)
        setOfficeId(value)
        setViewCalendary(true)
    }
    const selectQuote=(e)=>{
        setQuote(e.target.value)
    }
    return (
        <div style={{marginTop:"20px"}}>
            <br />
            <br />
            <br />
            <h3>Estamos en turnero</h3>
            <button onClick={e=>userSelectOffice(e)} >Recojer en Oficina</button>
            <div>
                {selectOffice&&allOffices.length>0&&
                allOffices.map(ofi=>
                    <div key={ofi.codesuc}>
                        <button value={ofi.id} onClick={e=>selectOfficeId(e)}>
                        <p>Nombre: {ofi.name}</p>
                        <p>Dirección: {ofi.address}</p>
                        <p>Telefono: {ofi.phone} </p>
                        </button>
                    </div>)
                }
            </div>
            <br />
            <br />
            {viewCalendary&&
                <div>
                <DatePicker
                    selected={selectedDate}
                    value={selectedDate}
                    onChange={date=>setSelectedDate(date)}
                    minDate={new Date()}
                    tileDisabled={({activeStartDate, date, view }) => date.getDay() === 0 || date.getDay() === 6 }
                    isOpen="true"
                /> 
            </div>}
            <br />
            <br />
            {selectedDate&&
                <div>
                <h4>Selecciona un turno</h4>
                <p>Los turnos tienen duración de una hora desde la hora seleccionada</p>
                {
                <div>
                    {allOffices.find(o=>o.id===officeId)?.shift?.map(q=>
                    <button value={q} onClick={e=>selectQuote(e)} >{q}</button>
                    )
                    }
                </div>
                }
            </div>}
        </div>
    )
}

export default Turnero
