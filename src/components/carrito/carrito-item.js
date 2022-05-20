import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";

const CarritoItem = (props) => {
    const {item,setCarrito,carrito,index} = {...props}

    const addManga = () => {
        if(item.amount<item.manga[5]){
            var aux=[...carrito]
            aux[index].amount+=1;
            setCarrito(aux)
        }else{
            alert("Solo quedan "+item.manga[5]+" existencias")
        }
    }

    const rmvManga = () => {
        if(item.amount>1){
            var aux=[...carrito]
            aux[index].amount-=1;
            setCarrito(aux)
        }else{
            alert("Debe llevar al menos 1 existencia")
        }
    }

    const deleteItem = () => {
        var aux=[...carrito];
        aux.splice(index,1)
        setCarrito(aux,0)
    }

    return(
        <div className="carrito-item">
            <p className="carrito-item-name">{item.manga[0]}</p>
            <div className="carrito-item-info-container">
                <p className="carrito-item-price">${item.manga[3]}</p>
                <div className="full-product-amount-selector carrito-amount-selector">
                    <button className="rmv-manga" onClick={rmvManga}>-</button>
                    <p className="amount-counter">{item.amount}</p>
                    <button className="add-manga" onClick={addManga}>+</button>
                </div>
                <button className="rmv-carrito-item-btn" onClick={deleteItem}><FontAwesomeIcon icon={faTrash}></FontAwesomeIcon></button>
            </div>
        </div>
    )

}

export default CarritoItem;