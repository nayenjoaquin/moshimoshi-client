import { useEffect } from "react";
import CarritoForm from "./carrito-form";
import CarritoList from "./carrito-list";

const CarritoPage = (props) => {

    const {carrito,setCarrito,setLoading} = {...props}

    return(
        <div className="page">
            <div className="carrito-page">
                <CarritoList carrito={carrito} setCarrito={setCarrito}></CarritoList>
                <CarritoForm carrito={carrito} setLoading={setLoading}/>
            </div>
        </div>
    )

}

export default CarritoPage;