import { Link } from "react-router-dom"
import "./Cart.css"
const Cart =({cart, cartCount, cartTotal, increaseQuantity, decreaseQuantity, removeFromCart})=>{
    if(cart.length === 0){
        return(
            <main className="container">
                <h1 className="page-heading">Your cart</h1>
                <div className="cart-empty">
                    <p className="cart-empty-icon">Your cart is empty</p>
                    <p className="cart-empty-text">Looks like you have not added anything yet. Find something you love and it will show up here.</p>
                    <Link to="/products" className="btn btn-primary">Continue shopping</Link>
                </div>
            </main>
        )
    }
    return(
        <main className="container">
            <h1 className="page-heading">Your cart</h1>
            <p className="page-intro">{cartCount} item{cartCount === 1 ? "" : "s"} ready for checkout.</p>

            <div className="cart-layout">
                <div className="cart-items">
                    {cart.map((each_item)=>(
                        <div className="cart-item" key={each_item.id}>
                            <img className="cart-item-image" src={each_item.thumbnail} alt={each_item.title}></img>
                            <div className="cart-item-info">
                                <p className="cart-item-title">{each_item.title}</p>
                                <p className="cart-item-price">${each_item.price} each</p>
                            </div>
                            <div className="quantity-controls">
                                <button type="button" className="btn btn-outline" onClick={()=> decreaseQuantity(each_item.id)}>-</button>
                                <span className="quantity-value">{each_item.quantity}</span>
                                <button type="button" className="btn btn-outline" onClick={()=> increaseQuantity(each_item.id)}>+</button>
                            </div>
                            <div className="cart-item-right">
                                <p className="cart-item-total">${(each_item.price * each_item.quantity).toFixed(2)}</p>
                                <button type="button" className="remove-btn" onClick={()=> removeFromCart(each_item.id)}>Remove</button>
                            </div>
                        </div>
                    ))}
                </div>

                <aside className="cart-summary">
                    <h2 className="summary-title">Order summary</h2>
                    <div className="summary-row">
                        <span>Items</span>
                        <span>{cartCount}</span>
                    </div>
                    <div className="summary-row summary-total">
                        <span>Total</span>
                        <span>${cartTotal.toFixed(2)}</span>
                    </div>
                    <Link to="/checkout" className="btn btn-primary btn-block">Proceed to checkout</Link>
                    <Link to="/products" className="btn btn-outline btn-block">Continue shopping</Link>
                </aside>
            </div>
        </main>
    )
}
export default Cart
