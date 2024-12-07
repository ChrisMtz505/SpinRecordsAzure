import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const PurchaseOrder = ({ carrito = [] }) => {
  const [productos, setProductos] = useState([]);
  const [carritoActualizado, setCarritoActualizado] = useState(carrito);
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    // Cargar productos de ambos archivos JSON
    Promise.all([
      fetch("/products.json").then((response) => response.json()),
      fetch("/TD.json").then((response) => response.json()),
    ])
      .then(([productosVinilos, productosTocadiscos]) => {
        // Combinar productos de ambos archivos
        setProductos([...productosVinilos, ...productosTocadiscos]);
      })
      .catch((error) => console.error("Error al cargar los productos:", error));
  }, []);

  const actualizarCantidad = (id, cantidad) => {
    if (cantidad < 1) return;
    const carritoModificado = carritoActualizado.map((item) =>
      item.id === id ? { ...item, cantidad } : item
    );
    setCarritoActualizado(carritoModificado);
  };

  useEffect(() => {
    const nuevoTotal = carritoActualizado.reduce((acumulado, item) => {
      const productoDetails = productos.find((p) => p.id === item.id);
      const precio = productoDetails ? productoDetails.price : 0;
      return acumulado + precio * (item.cantidad || 1);
    }, 0);

    setTotal(nuevoTotal);
  }, [carritoActualizado, productos]);

  const handlePayment = () => {
    window.open("https://buy.stripe.com/test_bIYbMs79ZcTU7tuaEF", "_blank");
    navigate("/confirmationpage");
    setCarritoActualizado([]);
  };

  return (
    <div style={styles.container}>
      <div style={styles.purchaseOrder}>
        <h2
          className="text-center mb-4"
          style={{
            fontWeight: 'bold',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            color: '#000',
            borderBottom: '2px solid #000',
            paddingBottom: '0.5rem',
          }}
        >
          Completar compra
        </h2>

        {carritoActualizado.length === 0 ? (
          <p style={styles.emptyMessage}>No tienes productos en tu carrito.</p>
        ) : (
          <div>
            {carritoActualizado.map((producto, index) => {
              // Buscar el producto con el id correspondiente
              const productoDetails = productos.find((p) => p.id === producto.id);

              return (
                <div key={index} style={styles.productItem}>
                  {productoDetails && productoDetails.imageUrl && (
                    <img
                      src={productoDetails.imageUrl}
                      alt={productoDetails.title || "Imagen del producto"}
                      style={styles.productImage}
                    />
                  )}
                  <div style={styles.productDetails}>
                    <span style={styles.productName}>
                      {productoDetails ? productoDetails.title : "Producto no encontrado"}
                    </span>
                    {productoDetails && productoDetails.artist && (
                      <p className="card-text mb-1 text-secondary">
                        <strong>Artista:</strong> {productoDetails.artist}
                      </p>
                    )}
                    {productoDetails && productoDetails.genre && (
                      <p className="card-text mb-1 text-secondary">
                        <strong>Género:</strong> {productoDetails.genre}
                      </p>
                    )}
                    {productoDetails && productoDetails.brand && (
                      <p className="card-text mb-1 text-secondary">
                        <strong>Marca:</strong> {productoDetails.brand}
                      </p>
                    )}
                    {productoDetails && productoDetails.type && (
                      <p className="card-text mb-1 text-secondary">
                        <strong>Tipo:</strong> {productoDetails.type}
                      </p>
                    )}
                    <div style={styles.productPrice}>
                      <span>
                        Precio unitario:{" "}
                        {productoDetails && productoDetails.price
                          ? `$${productoDetails.price}`
                          : "No disponible"}
                      </span>
                      <h4>----</h4>
                      <span>
                        Subtotal:{" "}
                        {productoDetails && productoDetails.price && producto.cantidad
                          ? `$${(productoDetails.price * producto.cantidad).toFixed(2)}`
                          : "No disponible"}
                      </span>
                    </div>
                    <div style={styles.quantitySection}>
                      <input
                        type="number"
                        value={producto.cantidad}
                        min="1"
                        style={styles.inputCantidad}
                        onChange={(e) =>
                          actualizarCantidad(producto.id, parseInt(e.target.value))
                        }
                      />
                      <span>Cantidad</span>
                    </div>
                  </div>
                </div>
              );
            })}

            <div style={styles.totalSection}>
              <h3 style={styles.totalText}>Total: ${total.toFixed(2)}</h3>
            </div>

            <div style={styles.paymentSection}>
              <button onClick={handlePayment} style={styles.paymentButton}>
                Pagar con Stripe
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    backgroundColor: "#f5f5f5",
    padding: "20px",
  },
  purchaseOrder: {
    width: "100%",
    maxWidth: "800px",
    backgroundColor: "#fff",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    padding: "20px",
    fontFamily: "'Roboto', sans-serif",
  },
  emptyMessage: {
    fontSize: "18px",
    textAlign: "center",
    color: "#777",
  },
  productItem: {
    display: "flex",
    alignItems: "center",
    marginBottom: "20px",
    borderBottom: "1px solid #eee",
    paddingBottom: "10px",
  },
  productImage: {
    width: "100px",
    height: "100px",
    marginRight: "20px",
    borderRadius: "5px",
    objectFit: "cover",
  },
  productDetails: {
    flex: 1,
  },
  productName: {
    fontSize: "18px",
    fontWeight: "bold",
    color: "#555",
  },
  productPrice: {
    marginTop: "10px",
    color: "#777",
  },
  quantitySection: {
    marginTop: "10px",
    display: "flex",
    alignItems: "center",
  },
  inputCantidad: {
    width: "60px",
    marginRight: "10px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    padding: "5px",
  },
  totalSection: {
    marginTop: "20px",
    textAlign: "center",
  },
  totalText: {
    fontSize: "20px",
    color: "#333",
  },
  paymentSection: {
    marginTop: "30px",
    textAlign: "center",
  },
  paymentButton: {
    backgroundColor: "#6772E5",
    color: "#fff",
    padding: "15px 30px",
    borderRadius: "5px",
    textDecoration: "none",
    fontWeight: "bold",
    fontSize: "18px",
    border: "none",
    cursor: "pointer",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    transition: "background-color 0.3s",
  },
};

export default PurchaseOrder;
