import { faMessage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const CarritoForm = (props) => {

    const navigate = useNavigate();
    const {carrito,setLoading}={...props}

    const handleSubmit = (e) => {

        e.preventDefault();
        const data = new FormData(e.target);
        const inputs = Object.fromEntries(data.entries())
        var send = true;

        if(send==true && carrito.length==0){
            send=false;
            alert("no hay elementos en el carrito")
            return null;
        }

        if(send===true){

            var total = 0;
            const productos = carrito.map(item=>{
                total+=item.manga[3]*item.amount;
                return '-'+item.manga[0]+'      x'+item.amount+`%0a`;
            })

            const productosMail = productos.map(producto =>{
                return producto.replace('%0a','')
            })
            const order = {
                productos: productosMail.join('\r\n'),
                carrito: carrito.map(item=>{
                    return {mangaID:item.manga[6],amount:item.amount}
                }),
                total: total,
                nombre: inputs.nombre,
                correo: inputs.correo,
                telefono: parseInt(inputs.telefono),
                direccion: inputs.direccion,
                ciudad: inputs.ciudad,
                region: inputs.region
            }

            const orderJSON = JSON.stringify(order)

            setLoading(true);
            fetch('https://moshimoshi-server.herokuapp.com/newOrder',{
                'method' : 'POST',
                headers : {
                    'Content-Type':'application/json'
                },
                body:orderJSON
            }).then(response=>response.json()).then(orderId=>{
                const msg=`*NUEVO PEDIDO N° ${orderId}*%0a%0aHola!! soy ${inputs.nombre} y me gustaría realizar el siguiente pedido:%0a%0aPRODUCTOS:%0a${productos.join('\r\n')}%0a*TOTAL: $${total}*%0a%0aDirección de envío:%0a${inputs.direccion+"%0a"+inputs.ciudad+"%0a"+inputs.region}`;
                 window.open(
                    "https://wa.me/56982172888/?text="+msg.replaceAll("#"," "),
                    '_blank' // <- This is what makes it open in a new window.
                );
                navigate('/',{replace:true})
                setLoading(false)
            })

        }
    }

    return(
        <form onSubmit={handleSubmit}>
            <div className="carrito-form">
                <p className="carrito-form-header">Información de contacto:</p>
                <div className="carrito-form-row">
                    <div>
                        <label>* Nombre:</label>
                        <input name="nombre"className="carrito-form-input" placeholder="Juan Perez..." required></input>
                    </div>
                    <div>
                        <label>* Correo:</label>
                        <input name="correo" className="carrito-form-input" type="email" placeholder="ejemplo@correo.com..." required></input>
                    </div>
                </div>
                <div className="carrito-form-row">
                    <div>
                        <label>* Teléfono:</label>
                        <input name="telefono" className="carrito-form-input" type="number" size={9} placeholder="9XXXXXXXX..." required></input>
                    </div>
                    <div>
                        <label>* Dirección:</label>
                        <input name="direccion" className="carrito-form-input" placeholder="Calle 1 #1234 depto 1..." required></input>
                    </div>
                    
                </div>
                <div className="carrito-form-row">
                    <div>
                        <label>* Ciudad:</label>
                        <input name="ciudad" className="carrito-form-input" placeholder="Maipú..." required></input>
                    </div>
                    <div>
                        <label>* Región:</label>
                        <input name="region" className="carrito-form-input" placeholder="Metropolitana..." required></input>
                    </div>
                </div>
                <button className="send-compra-btn"><FontAwesomeIcon className="message-icon" icon={faMessage}/>Enviar pedido</button>
            </div>
        </form>

    )
}

export default CarritoForm;