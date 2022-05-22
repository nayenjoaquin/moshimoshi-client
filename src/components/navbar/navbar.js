import logo from '../../img/logo/logo.png'
import { useNavigate, } from 'react-router-dom';
import SearchBar from './search-bar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';

const NavBar = (props) => {

    const {mangas,setMangas,carrito, setLoading} = {...props}
    const [carritoSize,setCarritoSize] = useState(0)

    const navigate = useNavigate()
    useEffect(()=>{
        if(carrito.length>0){
            focusCart()
            var cont = 0;
            carrito.map(item=>{
                cont+=item.amount
            })
            setCarritoSize(cont)
        }else{
            setCarritoSize(0)
        }
    },[carrito])

    const focusCart = async() => {
        const cartBtn = document.getElementById('cart-btn');
        cartBtn.focus({preventScroll: true});
        await new Promise(r => setTimeout(r, 200));
        cartBtn.blur();
    }
    

    const handleLogoClick = () => {
        navigate("/1", {replace:false})
        setMangas(mangas)
    }
    return(
        <div className="navbar">
            <div className='logo-container' onClick={handleLogoClick}>
                <img className='logo-img' src={logo} alt='Logo'></img>
            </div>
            <SearchBar setLoading={setLoading} mangas={mangas} setMangas={setMangas}></SearchBar>
            <div className='cart-btn-container'>
                <button className='cart-btn' id='cart-btn' onClick={e=>{
                    navigate("/cart", {replace:true})
                }}><FontAwesomeIcon icon={faCartShopping} />{
                    carritoSize>0
                    ? <p className='cart-btn-size'>{carritoSize}</p>
                    :<></>
                }</button>
            </div>
        </div>
    )
}

export default NavBar;