import MangaCard from "./manga-card";

const Catalogo = (props) => {

    const {mangas, addToCart} = {...props};

    return(
        <div className="responsive-gallery">
            {
                mangas.map((manga,key)=>{
                    return <MangaCard manga={manga} key={key} addToCart={addToCart}/>
                })
            }
        </div>
    )
}

export default Catalogo;