import Catalogo from "./catalogo";
import { useEffect, useState } from "react";
import Loading from "../loading";
import PageIndexSelector from "./page-index-selector";
import { useParams } from "react-router-dom";

const CatalogoPage = (props) => {

    const {page} = useParams();
    const { mangas , addToCart} = {...props}
    const [mangasByIndex, setMangasByIndex] = useState([]);
    const [pageIndex, setPageIndex] = useState(1);
    const [maxPage, setMaxPage] = useState(1);

    useEffect(()=>{
        setMaxPage(Math.floor(mangas.length/40)+1)
        if(page!=null){
            setPageIndex(parseInt(page))
            getMangasByIndex(page)
        }else{
            setPageIndex(1)
            getMangasByIndex(1)
        }
    },[mangas,page])

    const getMangasByIndex = (index) => {
        if (mangas.length===0) return null;
        else{
            var aux=[];
            for (var i=(index-1)*40; i<index*40;i++){
                if(mangas[i]!=null)aux=[...aux,mangas[i]];
            }
            setMangasByIndex([...aux])
        }
    }


    return(
        <div className="page">
            
            <PageIndexSelector maxPage={maxPage} pageIndex={pageIndex} setPageIndex={setPageIndex} getMangas={getMangasByIndex}/>
            {
                mangasByIndex.length>0
                ? <Catalogo mangas={mangasByIndex} addToCart={addToCart} pageIndex={pageIndex}/>
                : <Loading></Loading>
            }
            <PageIndexSelector maxPage={maxPage} pageIndex={pageIndex} setPageIndex={setPageIndex} getMangas={getMangasByIndex}/>
        </div>
    )
    
}

export default CatalogoPage;