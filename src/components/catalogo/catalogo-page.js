import Catalogo from "./catalogo";
import { useEffect, useState } from "react";
import PageIndexSelector from "./page-index-selector";
import { useParams } from "react-router-dom";
import CatalogoLoading from "./catalogo-loading";

const CatalogoPage = (props) => {

    const {page} = useParams();
    const {addToCart} = {...props}
    const [pageIndex, setPageIndex] = useState(1);
    const [maxPage, setMaxPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [mangas, setMangas] = useState([]);

    useEffect(()=>{
        setMaxPage(21)
        if(page>=1){
            setPageIndex(parseInt(page))
            getMangas(page)
        }else{
            setPageIndex(1)
            getMangas(1)
        }
    },[page])


    const getMangas = (pageIndex) => {
        setLoading(true)
        fetch('https://moshimoshi-server.herokuapp.com/getMangasByPage/'+pageIndex)
        .then(response => response.json())
        .then(data => {
            setMangas(data)
            setLoading(false)
        })
    }


    return(
        <div className="page">
            
            <PageIndexSelector maxPage={maxPage} pageIndex={pageIndex} setPageIndex={setPageIndex} setLoading={setLoading} getMangas={getMangas}/>
                {
                    loading ? <CatalogoLoading/> :
                    <Catalogo addToCart={addToCart} pageIndex={pageIndex} mangas={mangas}/>
                }
            <PageIndexSelector maxPage={maxPage} pageIndex={pageIndex} setPageIndex={setPageIndex} setLoading={setLoading} getMangas={getMangas}/>
        </div>
    )
    
}

export default CatalogoPage;