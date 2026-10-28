import { useState,useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import "./ProductDetails.css"
const ProductDetails =({addToCart})=>{
    const [thedata, setTheData] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")
    const [quantity, setQuantity] = useState(1)
    const [added, setAdded] = useState(false)
    const { productId } = useParams()
    useEffect(()=>{
        const getStoreData =async()=>{
            try{
                const thedata =await fetch('https://dummyjson.com/products',
                {
                     method:"GET"
                }
                )
                const therealdata =await thedata.json();
                setTheData(therealdata.products || []);
            }catch{
                setError("Sorry, we could not load the product. Please try again later.")
            }
            setLoading(false)
        }
        getStoreData();
    },[])
    const product = thedata.find((each_value)=> each_value.id === Number(productId))
    const handleAddToCart =()=>{
        if(!product) return
        addToCart(product, quantity)
        setAdded(true)
        setTimeout(()=>{
            setAdded(false)
        }, 1500)
    }
    const largerImage = product && product.images && product.images.length > 0 ? product.images[0] : product && product.thumbnail
    return(
        <main className="container">
            {loading && <p className="message">Loading product...</p>}
            {error && <p className="message error">{error}</p>}
            {!loading && !error && !product && (
                <p className="message">Sorry, we could not find that product. <Link to="/products" className="section-link">Back to products</Link></p>
            )}
            {!loading && !error && product && (
                <div className="details">
                    <Link to="/products" className="back-link">&larr; Back to products</Link>
                    <div className="details-card">
                        <div className="details-image">
                            <img src={largerImage} alt={product.title}></img>
                        </div>
                        <div className="details-info">
                            <span className="details-category">{product.category}</span>
                            <h1 className="details-title">{product.title}</h1>
                            {product.rating ? <p className="details-rating">Rating: {product.rating} / 5</p> : null}
                            <p className="details-description">{product.description}</p>
                            <p className="details-price">${product.price}</p>

                            <div className="quantity-row">
                                <span className="quantity-label">Quantity</span>
                                <div className="quantity-controls">
                                    <button type="button" className="btn btn-outline" onClick={()=> setQuantity(quantity - 1)} disabled={quantity <= 1}>-</button>
                                    <span className="quantity-value">{quantity}</span>
                                    <button type="button" className="btn btn-outline" onClick={()=> setQuantity(quantity + 1)}>+</button>
                                </div>
                            </div>

                            <button type="button" className="btn btn-primary btn-block" onClick={handleAddToCart}>
                                {added ? "Added to cart" : `Add ${quantity} to Cart`}
                            </button>
                            <Link to="/products" className="btn btn-outline btn-block">Continue shopping</Link>
                        </div>
                    </div>
                </div>
            )}
        </main>
    )
}
export default ProductDetails
