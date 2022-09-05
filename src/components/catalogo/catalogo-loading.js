import "./loading-manga.css"

const LoadingMangaCard = () => {
    return (
        <div className="loading-manga-card">
            <div className="loading-manga-card__title"/>
            <div className="loading-manga-card__img"/>
            <div className="loading-manga-card__info"/>
            <div className="loading-manga-card__btn"/>
        </div>
    )
}


const CatalogoLoading = () => {
    return(
        <div className="responsive-gallery">
            {
                Array(40).fill().map((_,key)=>{
                    return <LoadingMangaCard key={key}/>
                })
            }
        </div>
    )
}

export default CatalogoLoading