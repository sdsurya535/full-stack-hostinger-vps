import { useEffect, useState } from "react";

export default function HealthCheck() {
  const [health, setHealth] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHealth = async () => {
      try {
        const response = await fetch("http://31.97.232.33:4000/health");
        const data = await response.json();
        setHealth(data);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHealth();
  }, []);

  const containerStyle = {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #1f1f1f, #444)",
    padding: "20px",
  };

  const cardStyle = {
    width: "360px",
    padding: "24px",
    borderRadius: "16px",
    background: "rgba(255,255,255,0.1)",
    backdropFilter: "blur(10px)",
    color: "white",
    boxShadow: "0 8px 20px rgba(0,0,0,0.3)",
  };

  const loaderStyle = {
    width: "40px",
    height: "40px",
    border: "4px solid #ccc",
    borderTopColor: "transparent",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
  };

  const statusBadge = {
    padding: "6px 12px",
    borderRadius: "12px",
    fontWeight: "bold",
    fontSize: "13px",
    background:
      health?.status === "ok"
        ? "rgba(76, 175, 80, 0.3)"
        : "rgba(255, 0, 0, 0.3)",
    color: health?.status === "ok" ? "#7CFF7C" : "#FF7C7C",
  };

  const labelStyle = {
    fontWeight: "bold",
    fontSize: "16px",
  };

  const valueStyle = {
    color: "#dcdcdc",
    fontSize: "15px",
  };

  return (
    <div style={containerStyle}>
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>

      <div style={cardStyle}>
        <h2
          style={{
            textAlign: "center",
            marginBottom: "20px",
            fontSize: "24px",
            fontWeight: "bold",
          }}
        >
          🌐 Server Health
        </h2>

        {loading ? (
          <div style={{ textAlign: "center" }}>
            <div style={loaderStyle}></div>
            <p style={{ marginTop: "12px", color: "#ddd" }}>
              Checking server...
            </p>
          </div>
        ) : (
          <>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "14px",
              }}
            >
              <span style={labelStyle}>Status</span>
              <span style={statusBadge}>{health.status.toUpperCase()}</span>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "14px",
              }}
            >
              <span style={labelStyle}>Uptime</span>
              <span style={valueStyle}>{health.uptime.toFixed(2)} sec</span>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "14px",
              }}
            >
              <span style={labelStyle}>Timestamp</span>
              <span style={valueStyle}>
                {new Date(health.timestamp).toLocaleString()}
              </span>
            </div>

            <div style={{ textAlign: "center", marginTop: "20px" }}>
              <button
                onClick={() => window.location.reload()}
                style={{
                  padding: "10px 18px",
                  borderRadius: "10px",
                  border: "none",
                  background: "#007BFF",
                  color: "white",
                  fontSize: "15px",
                  cursor: "pointer",
                  fontWeight: "bold",
                  boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
                }}
              >
                Refresh
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
