import { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Circle,
  Polyline,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./App.css";

const FARM = [28.6139, 77.209];

const towers = [
  ["TOWER-01", [28.6165, 77.2055]],
  ["TOWER-02", [28.6115, 77.205]],
  ["TOWER-03", [28.612, 77.214]],
  ["TOWER-04", [28.617, 77.213]],
];

const cameras = [
  ["CAM-01", [28.615, 77.208]],
  ["CAM-02", [28.6158, 77.212]],
  ["CAM-03", [28.6105, 77.210]],
];

const towerIcon = new L.DivIcon({
  className: "custom-marker",
  html: `<div class="tower-icon">📡</div>`,
  iconSize: [42, 42],
  iconAnchor: [21, 21],
});

const cameraIcon = new L.DivIcon({
  className: "custom-marker",
  html: `<div class="camera-icon">📷</div>`,
  iconSize: [38, 38],
  iconAnchor: [19, 19],
});

const animalIcon = new L.DivIcon({
  className: "custom-marker",
  html: `<div class="animal-icon">🐄</div>`,
  iconSize: [44, 44],
  iconAnchor: [22, 22],
});

function App() {
  const [activeTab, setActiveTab] = useState("OVERVIEW");

  const [monitoring, setMonitoring] = useState(true);
  const [autoCall, setAutoCall] = useState(true);
  const [animalDetected, setAnimalDetected] = useState(true);

  const [callStatus, setCallStatus] = useState("CALLING...");
  const [kbps, setKbps] = useState(480);

  const [graph, setGraph] = useState(
    Array.from({ length: 35 }, () => 35 + Math.random() * 55)
  );

  const [detections, setDetections] = useState([
    {
      time: "10:24:15",
      zone: "ZONE-B",
      camera: "CAM-02",
      type: "CATTLE",
      confidence: "96%",
    },
    {
      time: "10:18:42",
      zone: "ZONE-A",
      camera: "CAM-01",
      type: "CATTLE",
      confidence: "92%",
    },
    {
      time: "09:57:31",
      zone: "ZONE-C",
      camera: "CAM-03",
      type: "ANIMAL",
      confidence: "89%",
    },
  ]);

  useEffect(() => {
    const timer = setInterval(() => {
      setKbps(440 + Math.floor(Math.random() * 60));

      setGraph((old) => [
        ...old.slice(1),
        35 + Math.random() * 60,
      ]);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!monitoring) {
      setAnimalDetected(false);
      setCallStatus("STANDBY");
      return;
    }

    const timer = setInterval(() => {
      setAnimalDetected(true);

      setDetections((old) => [
        {
          time: new Date().toLocaleTimeString(),
          zone: "ZONE-B",
          camera: "CAM-02",
          type: "CATTLE",
          confidence: "96%",
        },
        ...old.slice(0, 4),
      ]);

      if (autoCall) {
        setCallStatus("CALLING...");

        setTimeout(() => {
          setCallStatus("CONNECTED");
        }, 2200);
      }

      setTimeout(() => {
        setAnimalDetected(false);
      }, 7000);
    }, 15000);

    return () => clearInterval(timer);
  }, [monitoring, autoCall]);

  const renderMap = () => (
    <MapContainer
      center={FARM}
      zoom={15}
      scrollWheelZoom={true}
      className="farm-map"
    >
      <TileLayer
        attribution="Satellite"
        url="https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}"
      />

      {towers.map(([name, position]) => (
        <div key={name}>
          <Marker position={position} icon={towerIcon}>
            <Popup>
              <b>{name}</b>
              <br />
              STATUS: ONLINE
              <br />
              SIGNAL: STRONG
            </Popup>
          </Marker>

          <Circle
            center={position}
            radius={280}
            pathOptions={{
              color: "#00ff9d",
              fillColor: "#00ff9d",
              fillOpacity: 0.08,
            }}
          />
        </div>
      ))}

      {cameras.map(([name, position]) => (
        <Marker key={name} position={position} icon={cameraIcon}>
          <Popup>
            <b>{name}</b>
            <br />
            AI SURVEILLANCE ACTIVE
          </Popup>
        </Marker>
      ))}

      <Marker position={FARM}>
        <Popup>
          <b>BASE-01</b>
          <br />
          FARM COMMAND CENTER
        </Popup>
      </Marker>

      <Polyline
        positions={[
          towers[0][1],
          FARM,
          towers[1][1],
        ]}
        pathOptions={{
          color: "#00ff9d",
          weight: 3,
          dashArray: "8 8",
        }}
      />

      <Polyline
        positions={[
          towers[2][1],
          FARM,
          towers[3][1],
        ]}
        pathOptions={{
          color: "#00e5ff",
          weight: 3,
          dashArray: "8 8",
        }}
      />

      {animalDetected && monitoring && (
        <>
          <Marker
            position={[28.6158, 77.212]}
            icon={animalIcon}
          >
            <Popup>
              <b>ANIMAL DETECTED</b>
              <br />
              CAM-02 / ZONE-B
              <br />
              Confidence: 96%
            </Popup>
          </Marker>

          <Circle
            center={[28.6158, 77.212]}
            radius={120}
            pathOptions={{
              color: "#ff3030",
              fillColor: "#ff3030",
              fillOpacity: 0.25,
            }}
          />
        </>
      )}
    </MapContainer>
  );

  const overview = (
    <>
      <div className="top-alert">
        <div className="alert-icon">
          {animalDetected && monitoring ? "🚨" : "✓"}
        </div>

        <div>
          <small>LIVE ALERT</small>

          <h2>
            {animalDetected && monitoring
              ? "ANIMAL DETECTED"
              : "ALL ZONES CLEAR"}
          </h2>

          <p>
            {animalDetected && monitoring
              ? "ZONE-B • CAM-02 • CATTLE • AI CONFIDENCE 96%"
              : "No active detection in monitored zones"}
          </p>
        </div>

        {animalDetected && monitoring && (
          <div className="call-box">
            <small>AUTO CALL</small>
            <b>
              {autoCall ? `📞 ${callStatus}` : "CALL OFF"}
            </b>
          </div>
        )}
      </div>

      <div className="map-panel">
        <div className="panel-heading">
          <div>
            <small>LIVE SURVEILLANCE</small>
            <h2>LIVE SATELLITE MAP</h2>
          </div>

          <span className="live-badge">● LIVE</span>
        </div>

        {renderMap()}
      </div>

      <div className="bottom-grid">

        <div className="panel graph-panel">
          <div className="panel-heading">
            <div>
              <small>NETWORK TELEMETRY</small>
              <h2>COMMUNICATION LINK</h2>
            </div>

            <strong>{kbps} kbps</strong>
          </div>

          <div className="line-graph">
            <div className="grid-lines" />

            <svg
              viewBox="0 0 700 200"
              preserveAspectRatio="none"
            >
              <polyline
                points={graph
                  .map(
                    (value, index) =>
                      `${index * 20},${190 - value * 1.5}`
                  )
                  .join(" ")}
                fill="none"
                stroke="#00ff9d"
                strokeWidth="3"
              />
            </svg>
          </div>

          <div className="graph-footer">
            <span>LIVE</span>
            <span>440</span>
            <span>480</span>
            <span>520 KBPS</span>
          </div>
        </div>

        <div className="panel">
          <div className="panel-heading">
            <div>
              <small>AI SURVEILLANCE</small>
              <h2>RECENT DETECTIONS</h2>
            </div>

            <span className="live-badge">LIVE</span>
          </div>

          <div className="detections">
            {detections.map((item, index) => (
              <div className="detection" key={index}>
                <div className="animal-small">
                  🐄
                </div>

                <div className="detection-info">
                  <b>{item.type}</b>
                  <span>
                    {item.zone} • {item.camera}
                  </span>
                </div>

                <div className="confidence">
                  {item.confidence}
                  <small>{item.time}</small>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </>
  );

  const pageContent = () => {
    if (activeTab === "OVERVIEW") return overview;

    if (activeTab === "LIVE MAP") {
      return (
        <div className="full-page-panel">
          <div className="panel-heading">
            <div>
              <small>REAL TIME LOCATION</small>
              <h2>LIVE FARM SATELLITE MAP</h2>
            </div>
            <span className="live-badge">● LIVE</span>
          </div>

          {renderMap()}
        </div>
      );
    }

    if (activeTab === "DETECTION") {
      return (
        <div className="full-page-panel">
          <div className="panel-heading">
            <div>
              <small>AI ANALYTICS</small>
              <h2>ANIMAL DETECTION CENTER</h2>
            </div>
          </div>

          <div className="detection-large">
            {detections.map((item, index) => (
              <div className="detection-row" key={index}>
                <span>🐄</span>
                <b>{item.type}</b>
                <span>{item.zone}</span>
                <span>{item.camera}</span>
                <strong>{item.confidence}</strong>
                <small>{item.time}</small>
              </div>
            ))}
          </div>
        </div>
      );
    }

    if (activeTab === "EVENTS") {
      return (
        <div className="full-page-panel">
          <div className="panel-heading">
            <div>
              <small>SYSTEM HISTORY</small>
              <h2>RECENT EVENTS</h2>
            </div>
          </div>

          <div className="event-list">
            <div>
              🚨 <b>Animal detected</b>
              <span>ZONE-B / CAM-02</span>
              <small>10:24:15</small>
            </div>

            <div>
              📞 <b>Farmer call connected</b>
              <span>Automatic alert</span>
              <small>10:24:18</small>
            </div>

            <div>
              📡 <b>Communication stable</b>
              <span>{kbps} kbps</span>
              <small>LIVE</small>
            </div>
          </div>
        </div>
      );
    }

    if (activeTab === "DEVICES") {
      return (
        <div className="full-page-panel">
          <div className="panel-heading">
            <div>
              <small>FIELD HARDWARE</small>
              <h2>CONNECTED DEVICES</h2>
            </div>
          </div>

          <div className="device-grid">
            {[
              "TOWER-01",
              "TOWER-02",
              "TOWER-03",
              "TOWER-04",
              "CAM-01",
              "CAM-02",
              "CAM-03",
              "BASE-01",
            ].map((device) => (
              <div className="device-card" key={device}>
                <b>{device}</b>
                <span>● ONLINE</span>
                <small>Signal strong</small>
              </div>
            ))}
          </div>
        </div>
      );
    }

    if (activeTab === "DIGITAL TWIN") {
      return (
        <div className="full-page-panel twin">
          <div className="panel-heading">
            <div>
              <small>VIRTUAL FARM</small>
              <h2>DIGITAL TWIN</h2>
            </div>
          </div>

          <div className="twin-center">
            <div className="farm-core">
              AEGISNOVA
              <small>FARM CORE</small>
            </div>

            <div className="twin-node">📡 TOWER NETWORK</div>
            <div className="twin-node">📷 AI CAMERAS</div>
            <div className="twin-node">🐄 LIVESTOCK</div>
            <div className="twin-node">📞 FARMER ALERT</div>
          </div>
        </div>
      );
    }

    return (
      <div className="full-page-panel">
        <div className="panel-heading">
          <div>
            <small>ANALYTICS</small>
            <h2>FARM REPORTS</h2>
          </div>
        </div>

        <div className="report-grid">
          <div>
            <small>TOTAL DETECTIONS</small>
            <b>07</b>
          </div>

          <div>
            <small>ALERTS SENT</small>
            <b>07</b>
          </div>

          <div>
            <small>CALLS CONNECTED</small>
            <b>06</b>
          </div>

          <div>
            <small>UPTIME</small>
            <b>99.8%</b>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="app">

      <header className="header">

        <div className="brand">
          <div className="brand-logo">A</div>

          <div>
            <h1>AegisNova</h1>
            <span>AI Agriculture System</span>
          </div>
        </div>

        <div className="farmer">
          <div className="avatar">F</div>
          <div>
            <b>Farmer</b>
            <small>Online</small>
          </div>
        </div>

      </header>

      <nav className="nav">

        {[
          "OVERVIEW",
          "DIGITAL TWIN",
          "LIVE MAP",
          "DETECTION",
          "EVENTS",
          "DEVICES",
          "REPORTS",
        ].map((tab) => (
          <button
            key={tab}
            className={
              activeTab === tab ? "nav-active" : ""
            }
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}

      </nav>

      <main>

        <aside className="sidebar">

          <div className="status-card">
            <small>SYSTEM STATUS</small>
            <h2>
              {monitoring ? "ACTIVE" : "OFFLINE"}
            </h2>
            <p>All Systems Operational</p>
          </div>

          <div className="control-card">
            <small>MONITORING CONTROL</small>

            <button
              className="control-button active-control"
              onClick={() => setMonitoring(true)}
            >
              ✓ ACTIVE
            </button>

            <button
              className="control-button deactivate"
              onClick={() => setMonitoring(false)}
            >
              DEACTIVATE
            </button>
          </div>

          <div className="control-card">
            <small>AUTO CALL ALERT</small>

            <div className="auto-row">
              <span>Automatic Call</span>

              <button
                className={
                  autoCall ? "switch on" : "switch"
                }
                onClick={() => setAutoCall(!autoCall)}
              >
                <span />
              </button>
            </div>
          </div>

          <div className="sidebar-alert">
            <small>🔔 LIVE ALERT</small>

            <h3>
              {animalDetected && monitoring
                ? "Animal Detected!"
                : "No Active Alert"}
            </h3>

            <p>
              {animalDetected && monitoring
                ? "Zone B - CAM-02"
                : "Farm is being monitored"}
            </p>
          </div>

          <div className="call-card">
            <small>AUTO CALL STATUS</small>

            <h3>
              {autoCall ? `📞 ${callStatus}` : "CALL OFF"}
            </h3>

            <p>+91 98765 43210</p>

            <button>
              END CALL
            </button>
          </div>

        </aside>

        <section className="content">

          <div className="content-title">

            <div>
              <small>REAL-TIME FARM SURVEILLANCE</small>
              <h1>
                {activeTab === "OVERVIEW"
                  ? "LIVE COMMAND CENTER"
                  : activeTab}
              </h1>
            </div>

            <span className="system-live">
              ● SYSTEM LIVE
            </span>

          </div>

          {pageContent()}

        </section>

      </main>

      <footer>
        AEGISNOVA • SMART LIVESTOCK MONITORING • LIVE TELEMETRY
      </footer>

    </div>
  );
}

export default App;