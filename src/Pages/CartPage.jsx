import { useCart } from "../context/CartContext";
 import Footer from "../components/Footer";
import { Trash2, Plus, Minus } from "lucide-react";
import "../styles/CartPage.css";
 import { Link } from "react-router-dom";

export default function CartPage() {
  const { cartItems, addToCart, decreaseQuantity, removeFromCart, clearCart } = useCart();

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <>
 
      <section id="cart" className="cart-section container py-5" dir="rtl">
        <h2 className="text-center mb-5">سلة التسوق</h2>

        {cartItems.length === 0 ? (
          <p className="text-center fs-5">السلة فارغة ☕</p>
        ) : (
          <>
            <div className="cart-items mb-4">
              {cartItems.map(item => (
                <div key={item.cartId} className="cart-item d-flex align-items-center mb-3 p-3 border rounded">
                  <img src={item.image} alt={item.name} className="cart-item-img" />

                  <div className="flex-grow-1 mx-3">
                    <h5 className="mb-1">{item.name}</h5>
                    <p className="mb-1">{item.price} ر.س</p>
                    <p className="mb-0">الكمية: {item.quantity}</p>
                  </div>

                  <div className="d-flex gap-2">
                    <button className="btn btn-sm btn-success" onClick={() => addToCart(item)}>
                      <Plus size={16} />
                    </button>
                    <button className="btn btn-sm btn-warning" onClick={() => decreaseQuantity(item.id)}>
                      <Minus size={16} />
                    </button>
                    <button className="btn btn-sm btn-danger" onClick={() => removeFromCart(item.id)}>
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-summary p-3 border rounded mb-3 d-flex justify-content-between align-items-center">
              <h5>الإجمالي:</h5>
              <h5>{total} ر.س</h5>
            </div>

            <Link to="/Checkout" className="btn btn-dark w-100 mb-2">
              إتمام الشراء
            </Link>
            <button className="btn btn-outline-secondary w-100" onClick={clearCart}>
              إفراغ السلة
            </button>
          </>
        )}
      </section>

      <Footer />
    </>
  );
}
