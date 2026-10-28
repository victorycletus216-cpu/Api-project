import { useState } from "react"
import { Link } from "react-router-dom"
import "./ProductCard.css"
const ProductCard =({product, addToCart})=>{
    const [added, setAdded] = useState(false)
    const handleAddToCart =()=>{
        addToCart(product, 1)
        setAdded(true)
        setTimeout(()=>{
            setAdded(false)
        }, 1200)
    }
    return(
        <div className="card-container">
            <Link to={`/product/${product.id}`} className="card-image">
                <img src={product.thumbnail} alt={product.title}></img>
            </Link>
            <div className="card-body">
                <span className="card-category">{product.category}</span>
                <Link to={`/product/${product.id}`} className="card-title">{product.title}</Link>
                <div className="card-footer">
                    <span className="card-price">${product.price}</span>
                    <button type="button" className="btn btn-primary" onClick={handleAddToCart}>
                        {added? "Added" : "Add to Cart"}
                    </button>
                </div>
            </div>
        </div>
    )
}
export default ProductCard
