import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAnglesLeft, faAngleRight, faAnglesRight } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const PageIndexSelector = (props) => {

    const navigate = useNavigate()
    const {pageIndex, setPageIndex, getMangas, maxPage} = {...props}

    const nextPage = async() => {
        if(pageIndex<maxPage){
            const aux = pageIndex+1;
            await setPageIndex(aux)
            getMangas(aux);
            window.scrollTo({top: 0})
            navigate("/"+aux, {replace:false})
        }else alert('estás en la última página')
        
    }
    const previousPage = async() => {
        if(pageIndex>1){
            const aux = pageIndex-1;
            await setPageIndex(aux)
            getMangas(aux);
            window.scrollTo({top: 0})
            navigate("/"+aux, {replace:false})
        }else alert('estás en la primera página')
    }
    const lastPage = async() => {
        if(pageIndex<maxPage){
            const aux = maxPage;
            await setPageIndex(aux)
            getMangas(aux);
            window.scrollTo({top: 0})
            navigate("/"+aux, {replace:false})
        }else alert('estás en la última página')
    }
    const firstPage = async() => {
        if(pageIndex>1){
            const aux = 1;
            await setPageIndex(aux)
            getMangas(aux);
            window.scrollTo({top: 0})
            navigate("/"+aux, {replace:false})
        }else alert('estás en la primera página')
    }
    return(
        <div className="page-index-selector">
            <button className="index-btn" onClick={firstPage}><FontAwesomeIcon icon={faAnglesLeft}></FontAwesomeIcon></button>
            <button className="index-btn" onClick={previousPage}><FontAwesomeIcon icon={faAngleLeft}></FontAwesomeIcon></button>    
            <p className="index-number">{pageIndex} ... {maxPage}</p>
            <button className="index-btn" onClick={nextPage}><FontAwesomeIcon icon={faAngleRight}></FontAwesomeIcon></button>
            <button className="index-btn" onClick={lastPage}><FontAwesomeIcon icon={faAnglesRight}></FontAwesomeIcon></button>
        </div>
    )
}

export default PageIndexSelector;