import logo from '../../img/logo/logo.png'

const SentOrder = () => {
    return(
        <div className="page">
            <div className="sent-order-page">
                <p className="sent-order-title">Su compra continuará a través de Whatsapp.</p>
                <p className="sent-order-description">Muchas gracias por comprar en mangas moshimoshi!</p>
                <div className='sent-order-logo'><img src={logo}></img></div>
            </div>
        </div>
    )
}

export default SentOrder;