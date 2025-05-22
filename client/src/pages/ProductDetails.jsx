import { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import { Link, useParams } from "react-router-dom";
import { assets } from "../assets/assets";
import ProductCard from "../components/ProductCard";

const ProductDetails = () => {
    const { products, navigate, currency, addToCart } = useAppContext();
    const { id } = useParams();
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [thumbnail, setThumbnail] = useState(null);

    const product = products.find((item) => item._id === id);

    useEffect(() => {
        if (products.length > 0 && product) {
            const related = products.filter(p => p.category === product.category && p._id !== product._id);
            setRelatedProducts(related.slice(0, 5));
        }
    }, [products, product]);

    useEffect(() => {
        setThumbnail(product?.image[0] || null);
    }, [product]);

    return product && (
        <div className="mt-16 px-4 md:px-8 text-gray-700">
            {/* Breadcrumbs */}
            <nav className="text-sm mb-6 text-pink-600">
                <Link to="/" className="hover:underline">Home</Link> /
                <Link to="/products" className="hover:underline"> Products</Link> /
                <Link to={`/products/${product.category.toLowerCase()}`} className="hover:underline"> {product.category}</Link> /
                <span className="font-semibold"> {product.name}</span>
            </nav>

            {/* Product Display */}
            <div className="flex flex-col md:flex-row gap-10">
                {/* Images */}
                <div className="flex gap-4 flex-col md:flex-row">
                    {/* Thumbnails */}
                    <div className="flex md:flex-col gap-3">
                        {product.image.map((img, index) => (
                            <div key={index} onClick={() => setThumbnail(img)}
                                 className="border-2 rounded-lg cursor-pointer p-1 hover:scale-105 transition shadow-sm">
                                <img src={img} alt={`Thumbnail ${index + 1}`} className="w-20 h-20 object-cover rounded" />
                            </div>
                        ))}
                    </div>

                    {/* Main Image */}
                    <div className="max-w-md border-2 rounded-lg overflow-hidden shadow-lg bg-white">
                        <img src={thumbnail} alt="Main product" className="w-full object-cover" />
                    </div>
                </div>

                {/* Info */}
                <div className="flex-1">
                    <h1 className="text-4xl font-bold text-pink-700">{product.name}</h1>

                    {/* Rating */}
                    <div className="flex items-center gap-1 mt-2">
                        {Array(5).fill('').map((_, i) => (
                            <img key={i} src={i < 4 ? assets.star_icon : assets.star_dull_icon} alt="star" className="w-4 h-4" />
                        ))}
                        <span className="ml-2 text-sm">(4)</span>
                    </div>

                    {/* Pricing */}
                    <div className="mt-6">
                        <p className="line-through text-gray-400">MRP: {currency}{product.price}</p>
                        <p className="text-2xl font-semibold text-pink-600">Only {currency}{product.offerPrice}</p>
                        <span className="text-xs text-gray-500">(inclusive of all taxes)</span>
                    </div>

                    {/* Description */}
                    <h3 className="mt-6 font-medium text-base">What's special about it?</h3>
                    <ul className="list-disc ml-5 text-gray-600 mt-2 space-y-1">
                        {product.description.map((desc, i) => (
                            <li key={i}>{desc}</li>
                        ))}
                    </ul>

                    {/* Buttons */}
                    <div className="flex gap-4 mt-10">
                        <button onClick={() => addToCart(product._id)}
                                className="flex-1 py-3 rounded bg-yellow-100 text-yellow-800 hover:bg-yellow-200 transition font-medium shadow">
                            Add to Cart
                        </button>
                        <button onClick={() => { addToCart(product._id); navigate("/cart"); }}
                                className="flex-1 py-3 rounded bg-pink-500 text-white hover:bg-pink-600 transition font-medium shadow">
                            Buy Now
                        </button>
                    </div>
                </div>
            </div>

            {/* Related Products */}
            <div className="mt-20">
                <h2 className="text-center text-3xl font-semibold text-pink-700">Related Treats</h2>
                <div className="w-16 h-1 bg-pink-300 mx-auto rounded-full mt-2"></div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 mt-8">
                    {relatedProducts.filter(p => p.inStock).map((p, i) => (
                        <ProductCard key={i} product={p} />
                    ))}
                </div>

                <div className="text-center mt-10">
                    <button onClick={() => { navigate('/products'); scrollTo(0, 0); }}
                            className="px-6 py-2 rounded border border-pink-500 text-pink-500 hover:bg-pink-50 transition">
                        See All Products
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
