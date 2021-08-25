import React,{ useState,useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux"
import DatePicker from 'react-date-picker';
import { getAllOffice } from '../../redux/actions/office/index'
import { postSchedule } from "../../redux/actions/schedule/index"

function Turnero() {
    const dispatch = useDispatch()
    const userid = localStorage.getItem("pg_merceria");
    const [viewOffice,setViewOffice]=useState([])
    const [selectOffice,setSelectOffice]=useState(false)
    const [viewCalendary,setViewCalendary]=useState(false)
    const [selectedDate,setSelectedDate] = useState(null);
    const [officeId,setOfficeId]=useState("")
    const [quote,setQuote]=useState("")

    const allOffices = useSelector(state => state.officeReducer.offices)
    const day=new Date()
    const month=day.getMonth()

    const scchedule=selectedDate + "-"+quote

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
        setOfficeId(value)
        setViewCalendary(true)
    }
    const selectQuote=(e)=>{
        setQuote(e.target.value)
    }
    const sendScheduleUser=(e)=>{
        dispatch(postSchedule({schedule:scchedule,officeId:officeId,userId:userid}))
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
                            Nombre: {ofi.name}
                            Dirección: {ofi.address}
                            Telefono: {ofi.phone}
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
                    tileDisabled={({activeStartDate, date, view }) => date.getDay() === 0 || date.getDay() === 6 || date.getMonth()!== month+1 && date.getMonth()!== month}
                    isOpen={true}
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
                    <button key={q} value={q} onClick={e=>selectQuote(e)} >{q}</button>
                    )
                    }
                </div>
                }
            </div>}
           <button onClick={e=>sendScheduleUser(e)}>Confirmar Fecha</button> 
        </div>
    )
}

export default Turnero
