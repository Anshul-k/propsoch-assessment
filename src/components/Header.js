import React, { useEffect, useState } from "react";
import BatteryChargingFullIcon from "@mui/icons-material/BatteryChargingFull";
import WifiIcon from "@mui/icons-material/Wifi";
import WifiOffIcon from "@mui/icons-material/WifiOff";
import BatteryFullIcon from "@mui/icons-material/BatteryFull";
import SignalCellularAltIcon from "@mui/icons-material/SignalCellularAlt";
import SignalCellularOffIcon from "@mui/icons-material/SignalCellularOff";
import "../App.css";

function Header() {
  const [time, setTime] = useState("");
  const [battery, setBattery] = useState({ level: "100%", charging: true });
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  // useEffect to update time every minute
  useEffect(() => {
    const updateCurrentTime = () => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, "0");
      const minutes = String(now.getMinutes()).padStart(2, "0");
      setTime(`${hours}:${minutes}`);
    };

    updateCurrentTime();
    const interval = setInterval(updateCurrentTime, 60000);
    return () => clearInterval(interval);
  }, []);

  // useEffect to get battery status
  useEffect(() => {
    if (navigator.getBattery) {
      navigator.getBattery().then((batteryManager) => {
        setBattery({
          level: `${Math.round(batteryManager.level * 100)}%`,
          charging: batteryManager.charging,
        });

        batteryManager.addEventListener("levelchange", () => {
          setBattery({
            level: `${Math.round(batteryManager.level * 100)}%`,
            charging: batteryManager.charging,
          });
        });

        batteryManager.addEventListener("chargingchange", () => {
          setBattery({
            level: `${Math.round(batteryManager.level * 100)}%`,
            charging: batteryManager.charging,
          });
        });
      });
    }
  }, []);

  // useEffect to update network status
  useEffect(() => {
    const updateNetworkStatus = () => setIsOnline(navigator.onLine);
    window.addEventListener("online", updateNetworkStatus);
    window.addEventListener("offline", updateNetworkStatus);

    return () => {
      window.removeEventListener("online", updateNetworkStatus);
      window.removeEventListener("offline", updateNetworkStatus);
    };
  }, []);

  return (
    <div className="header">
      <span className="time">{time}</span> {/* Time */}
      {/* Title */}
      <span className="title">propsoch</span>
      {/* Icons */}
      <div className="status-icons">
        {isOnline ? (
          <SignalCellularAltIcon className="icon" />
        ) : (
          <SignalCellularOffIcon className="icon" />
        )}

        {isOnline ? (
          <WifiIcon className="icon" />
        ) : (
          <WifiOffIcon className="icon" />
        )}

        {battery.charging ? (
          <BatteryChargingFullIcon className="icon" />
        ) : (
          <BatteryFullIcon className="icon" />
        )}
      </div>
    </div>
  );
}

export default Header;
