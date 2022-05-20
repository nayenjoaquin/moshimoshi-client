import { useNavigate } from "react-router-dom";

const MangaCard = (props) => {

    const {manga, addToCart} = {...props}
    const name = manga[0];
    const price = manga[3];
    const stock = manga[5];
    const imgSRC = "img/mangas/"+name+".jpg";
    var mangaClass
    if(stock>0) mangaClass='manga-card-img-container'
    else mangaClass='manga-card-img-container sold-out'

    const navigate = useNavigate()
    
    return(
        <div className="responsive-gallery-item">
            <p className="manga-card-name">{name}</p>
            <div className={mangaClass} onClick={e=>{
                if(stock>0)navigate("/product/"+manga[6],{replace:true})
            }}>
                <img className="manga-card-img" src={imgSRC} alt={name}></img>
            </div>
            <div className='manga-card-info'>
                <p className='manga-card-price'>${price}</p>
                <p className='manga-card-stock'>stock: {stock}</p>
            </div>
            {
                stock>0
                ? <button className='add-to-cart-btn' onClick={e=>{
                    e.stopPropagation()
                    addToCart(manga,1)
                }}>Agregar al carrito</button>
                : <button className='sold-out-btn'>Producto agotado</button>
            }
            
        </div>
    )
}

export default MangaCard;