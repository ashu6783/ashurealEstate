import { useEffect, useState } from "react";
import { MapContainer, TileLayer, useMap, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { LatLngExpression } from "leaflet";

// Fix Leaflet marker icons
import L from "leaflet";
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

interface Item {
  id: string;
  title: string;
  img: string;
  price: number;
  bedroom: number;
  latitude: number;
  longitude: number;
}

interface MapProps {
  items: Item[];
}

// Component to adjust map bounds
function MapBounds({ items }: { items: Item[] }) {
  const map = useMap();

  useEffect(() => {
    if (!items || items.length === 0) {
      // No items, set default view
      map.setView([37.7749, -122.4194], 10); // Default to San Francisco
      return;
    }

    if (items.length === 1) {
      // Single item, center on it
      map.setView([items[0].latitude, items[0].longitude], 13);
    } else {
      // Multiple items, fit bounds
      try {
        const bounds = L.latLngBounds(
          items.map((item) => [item.latitude, item.longitude])
        );
        if (bounds.isValid()) {
          map.fitBounds(bounds, { padding: [50, 50], maxZoom: 15 });
        } else {
          map.setView([37.7749, -122.4194], 10); // Fallback
        }
      } catch (error) {
        console.error("Error setting map bounds:", error);
        map.setView([37.7749, -122.4194], 10); // Fallback
      }
    }
  }, [items, map]);

  return null;
}

// Custom Pin component
function CustomPin({ item }: { item: Item }) {
  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(item.price);

  return (
    <Marker position={[item.latitude, item.longitude]}>
      <Popup>
        <div className="pin-popup" style={{ width: "200px" }}>
          {item.img && (
            <img
              src={item.img}
              alt={item.title}
              style={{
                width: "100%",
                height: "120px",
                objectFit: "cover",
                borderRadius: "4px",
              }}
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  "https://via.placeholder.com/200x120?text=No+Image";
              }}
            />
          )}
          <h3
            style={{
              margin: "8px 0 4px",
              fontSize: "14px",
              fontWeight: "bold",
            }}
          >
            {item.title}
          </h3>
          <p
            style={{
              margin: "0 0 4px",
              color: "#2563eb",
              fontWeight: "bold",
              fontSize: "16px",
            }}
          >
            {formattedPrice}
          </p>
          <div
            style={{
              display: "flex",
              fontSize: "12px",
              color: "#4b5563",
            }}
          >
            <span style={{ marginRight: "8px" }}>{item.bedroom} bed</span>
          </div>
        </div>
      </Popup>
    </Marker>
  );
}

function Map({ items = [] }: MapProps) {
  const [isClient, setIsClient] = useState(false);
  const defaultCenter: LatLngExpression = [37.7749, -122.4194]; // Default center (San Francisco)

  // Ensure client-side rendering
  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <div className="w-full h-full bg-gray-100 flex items-center justify-center">
        <p className="text-gray-500">Loading map...</p>
      </div>
    );
  }

  console.log("Map received items:", items);

  return (
    <MapContainer
      center={defaultCenter}
      zoom={10}
      scrollWheelZoom={true}
      className="w-full h-full"
      style={{ height: "100%", minHeight: "500px" }}
    >
      <TileLayer
        attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MapBounds items={items} />
      {items.map((item) => (
        <CustomPin item={item} key={item.id} />
      ))}
    </MapContainer>
  );
}

export default Map;