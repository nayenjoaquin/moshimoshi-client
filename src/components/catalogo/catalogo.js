import MangaCard from "./manga-card";

const Catalogo = (props) => {

    const {mangas, addToCart, pageIndex} = {...props};

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