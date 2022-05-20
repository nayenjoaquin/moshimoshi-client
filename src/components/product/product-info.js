const ProductInfo = (props) => {

    

    const{addToCart,manga,amount,addManga,rmvManga}={...props}
    return(
        <div className="full-product-info">
            <p className="full-product-name">{manga[0]}</p>
            <div className="full-product-buy">
                <p className="full-product-price">${manga[3]}</p>
                <div className="full-product-amount-selector">
                    <button className="rmv-manga" onClick={rmvManga}>-</button>
                    <p className="amount-counter">{amount}</p>
                    <button className="add-manga" onClick={addManga}>+</button>
                </div>
            </div>
            <button className="add-to-cart-btn add-to-cart-btn-full" onClick={e=>addToCart(manga,amount)
            }>Agregar al carrito</button>
            <div className="full-product-details">
                <p className="full-product-details-title">Detalles del producto</p>
                <p className="full-product-size">Tamaño: {manga[1]}</p>
                <p className="full-product-demografia">Demografía: {manga[2]}</p>
                <p className="full-product-editorial">Editorial: {manga[4]}</p>
                <p className="full-product-stock">Stock: {manga[5]}</p>
            </div>
        </div>
    )
}

export default ProductInfo;