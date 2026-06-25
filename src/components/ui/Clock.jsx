import { useState, useEffect } from "react";

const Clock = () => {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      let hours = now.getHours();
      const minutes = String(now.getMinutes()).padStart(2, "0");
      const ampm = hours >= 12 ? "PM" : "AM";
      
      // Convert to 12-hour format
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
      const hourStr = String(hours).padStart(2, "0");
      
      setTime(`${hourStr}:${minutes} ${ampm}`);
    };

    updateTime();
    // Update every second to keep it accurate
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div 
      className="fixed bottom-6 left-6 z-30 pointer-events-auto select-none flex items-center gap-2"
      style={{
        background: "#ffffff",
        border: "3px solid #000000",
        borderRadius: "0px",
        padding: "8px 12px",
        color: "#000000",
        fontSize: "10px",
        fontWeight: "bold",
        fontFamily: "'Press Start 2P', monospace",
        boxShadow: "4px 4px 0px rgba(0, 0, 0, 0.45)",
      }}
      title="System Local Time"
    >
      <span style={{ fontSize: "14px" }}>⏰</span>
      <span>{time}</span>
    </div>
  );
};

export default Clock;
