import React from "react";
import { useNavigate } from "react-router-dom";

const ConfirmationPage = () => {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
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
        Gracias por comprar en Spin Records
      </h2>
      <p style={styles.message}>
        Tu transacción ha sido exitosa. Haz clic en el botón para volver a la página principal.
      </p>
      <button onClick={() => navigate("/")} style={styles.button}>
        Volver a la tienda
      </button>
      <button onClick={() => navigate("/PurchaseOrder")} style={styles.button2}>
        Volver a comprar
      </button>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    backgroundColor: "#f5f5f5",
    textAlign: "center",
  },
  title: {
    fontSize: "32px",
    color: "#333",
    marginBottom: "20px",
  },
  message: {
    fontSize: "18px",
    color: "#777",
  },
  button: {
    marginTop: "20px",
    padding: "10px 20px",
    backgroundColor: "#2a6dab",
    color: "#fff",
    borderRadius: "5px",
    border: "none",
    cursor: "pointer",
    fontSize: "16px",
  },
  button2: {
    marginTop: "20px",
    padding: "10px 20px",
    backgroundColor: "#2f9260",
    color: "#fff",
    borderRadius: "5px",
    border: "none",
    cursor: "pointer",
    fontSize: "16px",
  },
};

export default ConfirmationPage;
