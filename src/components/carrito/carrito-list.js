import { useCallback, useEffect, useState } from "react";
import CarritoItem from "./carrito-item";

const CarritoList = (props) => {

    const {carrito,setCarrito} = {...props}

    const [total,setTotal] = useState(0)

    useEffect(()=>{
        var aux=0;
        carrito.map(item=>{
            aux+=item.manga[3]*item.amount
        })
        setTotal(aux)
    },[carrito])

    return(
        <div className="carrito-list">
            <div className="carrito-list-header">
                <p>Productos:</p>
            </div>
            {
                carrito.length>0
                ? carrito.map((item,index)=>{
                    return <CarritoItem item={item} key={index} setCarrito={setCarrito} carrito={carrito} index={index}/>
                })
                : <div><br/>NO HAY ELEMENTOS EN EL CARRITO<br/><br/></div> //MENSAJE DE NO HAY ELEMENTOS
            }
            <div className="carrito-list-footer">
                <p className="carrito-list-total">TOTAL: ${total}</p>
            </div>
        </div>
    )

}

export default CarritoList;