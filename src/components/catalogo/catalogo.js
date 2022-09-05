import { useState, useEffect } from "react";
import MangaCard from "./manga-card";
import Loading from "../loading";

const Catalogo = (props) => {

    const {addToCart, pageIndex, setLoading, mangas} = {...props};


    return(
        <div className="responsive-gallery">
            {   
                mangas.map((manga,key)=>{
                    return <MangaCard pageIndex={pageIndex} manga={manga} key={key} addToCart={addToCart}/>
                })
            }
        </div>
    )
}

export default Catalogo;