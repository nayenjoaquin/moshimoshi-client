import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import CarritoPage from "./components/carrito/carrito-page";
import CatalogoPage from "./components/catalogo/catalogo-page";
import Loading from "./components/loading";
import NavBar from "./components/navbar/navbar";
import ProductPage from "./components/product/product-page";


function App() {

  const [carrito,setCarrito] = useState([]);
  const [mangas,setMangas] = useState([]);
  const [shownMangas, setShownMangas] = useState([])
  const [loading,setLoading] = useState(true)

  useEffect(()=>{
    getMangas().then(data=>{
      setMangas(data);
      setShownMangas(data);
      setLoading(false)
    })
  },[])

  const getMangas = async () => {
    const response = await fetch('https://moshimoshi-server.herokuapp.com/getMangas');
    return await response.json();
  }

  const addToCart = (manga,amount) => {
    var itemAdded = false;
    carrito.map((item,index)=>{
      if(item.manga[6]==manga[6]){
        if(item.amount+amount<=item.manga[5]){
          var aux= [...carrito];
          aux[index].amount+=amount;
          setCarrito(aux)
          itemAdded=true;
        }else{
          itemAdded=true;
          alert('Hay un máximo de '+item.manga[5]+" existencias")
        }
      }
    })
    if(!itemAdded){
      setCarrito([...carrito,{
        manga: manga,
        amount: amount
      }])
    }
  }

  return (
    <div className="App">
      <div className="background-pattern"></div>
        <NavBar setLoading={setLoading} mangas={mangas} setMangas={setShownMangas} carrito={carrito}/>
        {
          loading
          ? <Loading/>
          : <Routes>
              <Route path="/" element={<CatalogoPage mangas={shownMangas} addToCart={addToCart}/>}/>
              <Route path="/:page" element={<CatalogoPage mangas={shownMangas} addToCart={addToCart}/>}/>
              <Route path="/product/:id" element={<ProductPage addToCart={addToCart}/>}/>
              <Route path="/product/:id/:pageIndex" element={<ProductPage addToCart={addToCart}/>}/>
              <Route path="/cart" element={<CarritoPage setLoading={setLoading} carrito={carrito} setCarrito={setCarrito}/>}/>
            </Routes>
        }
        
    </div>
  );
}

export default App;
