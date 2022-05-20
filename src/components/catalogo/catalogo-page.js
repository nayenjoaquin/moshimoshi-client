import Catalogo from "./catalogo";
import { useEffect, useState } from "react";
import Loading from "../loading";
import PageIndexSelector from "./page-index-selector";

const CatalogoPage = (props) => {

    const { mangas , addToCart} = {...props}
    const [mangasByIndex, setMangasByIndex] = useState([]);
    const [pageIndex, setPageIndex] = useState(1);

    useEffect(()=>{
        getMangasByIndex(1)
    },[mangas])

    const getMangasByIndex = (index) => {
        if (mangas.length===0) return null;
        else{
            var aux=[];
            for (var i=(index-1)*30; i<index*30;i++){
                if(mangas[i]!=null)aux=[...aux,mangas[i]];
            }
            setMangasByIndex([...aux])
        }
    }


    return(
        <div className="page">
            
            <PageIndexSelector pageIndex={pageIndex} setPageIndex={setPageIndex} getMangas={getMangasByIndex}/>
            {
                mangasByIndex.length>0
                ? <Catalogo mangas={mangasByIndex} addToCart={addToCart}/>
                : <Loading></Loading>
            }
            <PageIndexSelector pageIndex={pageIndex} setPageIndex={setPageIndex} getMangas={getMangasByIndex}/>
        </div>
    )
    
}

export default CatalogoPage;