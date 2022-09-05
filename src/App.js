import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import CarritoPage from "./components/carrito/carrito-page";
import CatalogoPage from "./components/catalogo/catalogo-page";
import NavBar from "./components/navbar/navbar";
import ProductPage from "./components/product/product-page";
import SentOrder from "./components/carrito/sent-order";
import OrderError from "./components/carrito/order-error";


function App() {

  const [carrito,setCarrito] = useState([]);
  const [mangasNameList, setMangasNameList] = useState([]);

  useEffect(()=>{
    getMangasNameList()
  },[])

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

  const getMangasNameList = () => {
    const response = fetch('https://moshimoshi-server.herokuapp.com/getMangasNameList')
    .then(response => response.json())
    .then(data => {
      setMangasNameList(data)
    })
  }


  return (
    <div className="App">
      <div className="background-pattern"></div>
        <NavBar carrito={carrito} mangasNameList={mangasNameList}/>
          <Routes>
            <Route path="/" element={<CatalogoPage addToCart={addToCart}/>}/>
            <Route path="/:page" element={<CatalogoPage addToCart={addToCart}/>}/>
            <Route path="/product/:id" element={<ProductPage addToCart={addToCart}/>}/>
            <Route path="/product/:id/:pageIndex" element={<ProductPage addToCart={addToCart}/>}/>
            <Route path="/cart" element={<CarritoPage carrito={carrito} setCarrito={setCarrito}/>}/>
            <Route path="/sentOrder" element={<SentOrder/>}/>
            <Route path="/orderError" element={<OrderError/>}/>
          </Routes>
        
    </div>
  );
}

export default App;
