import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../loading";
import ProductInfo from "./product-info";

const ProductPage = (props) => {

    const {id,pageIndex=1} = useParams()
    const {addToCart} = {...props}
    const navigate = useNavigate();
    const [manga, setManga] = useState([])
    const [loadingManga, setLoadingManga] = useState(false);
    const [imgSRC, setImgSRC] = useState("");
    const [amount, setAmount]=useState(1);

    const rmvManga = async() => {
        if(amount>1)await setAmount(amount-1)
        else alert('No puedes llevar menos de 1 elemento')
    }
    const addManga = async() => {
        if(amount<manga[5])await setAmount(amount+1)
        else alert('es el máximo de elementos disponibles')
    }

    const setup = async () => {
        setLoadingManga(true);
        await fetch('https://moshimoshi-server.herokuapp.com/getManga/'+id)
        .then(response => response.json())
        .then(data=>{
            setManga(data[0]);
            setImgSRC("img/mangas/"+data[0][0]+".jpg")
            setLoadingManga(false);
        })
    }

    useEffect(()=>{
        setup()
    },[id])
    

    return(
        <div className="page">
            {
                loadingManga
                ?<Loading/>
                :<div className="full-product-container">
                    <button className="back-btn" onClick={e=>{
                        navigate('/'+pageIndex)}}><FontAwesomeIcon icon={faXmark}/></button>
                    <div className="full-product">
                        <div className="full-product-img-container"><img className="full-product-img" src={imgSRC} alt={manga[0]}></img></div>
                        {
                            manga!=null
                            ? <ProductInfo addToCart={addToCart} amount={amount} rmvManga={rmvManga} addManga={addManga} manga={manga}/>
                            : <Loading></Loading>
                        }
                    </div>
                </div>
            }
        </div>
    )

}

export default ProductPage;