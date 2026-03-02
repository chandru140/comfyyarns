import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER || '917715010026';

const Cart = () => {
  const { cartItems, addToCart, removeFromCart, removeItemCompletely, clearCart, cartTotal } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Cart – ComfyYarns';
  }, []);

  // Build a single combined WhatsApp message for all cart items
  const buildWhatsAppMessage = () => {
    const itemLines = cartItems
      .map((item) => `• *${item.name}* (x${item.quantity}) — ₹${item.price * item.quantity}`)
      .join('\n');

    return encodeURIComponent(
`Hello! I would like to place an order for the following items:

${itemLines}

*Total: ₹${cartTotal}*

Kindly confirm availability and share payment details.

My Details:
Name:
Address:
Phone:`
    );
  };

  const whatsappLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${buildWhatsAppMessage()}`;

  if (cartItems.length === 0) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center section-padding">
        <div className="text-center max-w-md mx-auto animate-slideInUp">
          <div className="text-8xl mb-6">🛒</div>
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Your cart is empty</h1>
          <p className="text-gray-600 mb-8">
            Add some handmade goodies and come back here to order!
          </p>
          <Link to="/shop" className="btn-primary">
            Browse Shop
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="section-padding">
      <div className="container-custom max-w-4xl">
        <h1 className="text-4xl font-bold text-gray-800 mb-10">Your Cart 🛍️</h1>

        <div className="space-y-4 mb-10">
          {cartItems.map((item) => (
            <div key={item._id} className="card p-5 flex items-center gap-5">
              {/* Image */}
              <img
                src={item.image?.replace('/upload/', '/upload/f_auto,q_auto,w_200,c_limit/') || item.image}
                alt={item.name}
                className="w-20 h-20 object-cover rounded-xl flex-shrink-0"
              />

              {/* Info */}
              <div className="flex-grow min-w-0">
                <h3 className="font-semibold text-gray-800 truncate">{item.name}</h3>
                <p className="text-baby-pink-600 font-bold">₹{item.price}</p>
              </div>

              {/* Quantity Controls */}
              <div className="flex items-center gap-3 flex-shrink-0">
                <button
                  onClick={() => removeFromCart(item._id)}
                  className="w-8 h-8 rounded-full border-2 border-gray-200 flex items-center justify-center text-gray-600 hover:border-baby-pink-400 hover:text-baby-pink-600 transition-colors font-bold"
                >
                  −
                </button>
                <span className="w-8 text-center font-bold text-gray-800">{item.quantity}</span>
                <button
                  onClick={() => addToCart(item)}
                  className="w-8 h-8 rounded-full border-2 border-gray-200 flex items-center justify-center text-gray-600 hover:border-baby-pink-400 hover:text-baby-pink-600 transition-colors font-bold"
                >
                  +
                </button>
              </div>

              {/* Line Total */}
              <p className="text-lg font-bold text-gray-800 w-24 text-right flex-shrink-0">
                ₹{item.price * item.quantity}
              </p>

              {/* Remove */}
              <button
                onClick={() => removeItemCompletely(item._id)}
                className="text-red-400 hover:text-red-600 transition-colors flex-shrink-0 ml-2"
                aria-label="Remove item"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="card p-6 mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-600">Subtotal ({cartItems.reduce((s, i) => s + i.quantity, 0)} items)</span>
            <span className="text-2xl font-bold text-gray-800">₹{cartTotal}</span>
          </div>
          <p className="text-sm text-gray-500">Shipping will be confirmed via WhatsApp</p>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4">
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 btn-whatsapp justify-center text-lg py-4"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
            </svg>
            Order All on WhatsApp
          </a>

          <button
            onClick={() => { clearCart(); navigate('/shop'); }}
            className="btn-secondary flex-shrink-0"
          >
            Clear Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
