import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

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

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN; // put token in .env

function PropertyMap({ items = [] }: MapProps) {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);

  useEffect(() => {
    if (!mapContainer.current) return;
    if (!mapRef.current) {
      mapRef.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/ashu0306/cmet0ybhx002001plh48x8fvg",
        center: [items[0]?.longitude || -122.4194, items[0]?.latitude || 37.7749],
        zoom: 10,
      });
    }

    const map = mapRef.current;

    document.querySelectorAll(".custom-marker").forEach((el) => el.remove());

    items.forEach((item) => {
      const el = document.createElement("div");
      el.className =
        "custom-marker w-6 h-6 bg-[#B8860B] rounded-full border-2 border-white cursor-pointer";
      el.onclick = () => setSelectedItem(item);

      new mapboxgl.Marker(el)
        .setLngLat([item.longitude, item.latitude])
        .addTo(map);
    });
    if (items.length > 1) {
      const bounds = new mapboxgl.LngLatBounds();
      items.forEach((item) =>
        bounds.extend([item.longitude, item.latitude])
      );
      map.fitBounds(bounds, { padding: 50 });
    } else if (items.length === 1) {
      map.setCenter([items[0].longitude, items[0].latitude]);
      map.setZoom(13);
    }
  }, [items]);

  return (
    <div className="w-full h-full relative" style={{ minHeight: "500px" }}>
      <div ref={mapContainer} style={{ width: "100%", height: "100%" }} />

      {selectedItem && (
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 bg-white shadow-lg rounded-lg p-3 w-56">
          <button
            className="absolute top-1 right-2 text-gray-500"
            onClick={() => setSelectedItem(null)}
          >
            ✕
          </button>
          <img
            src={selectedItem.img}
            alt={selectedItem.title}
            className="w-full h-24 object-cover rounded"
            onError={(e) =>
              ((e.target as HTMLImageElement).src =
                "https://via.placeholder.com/200x120?text=No+Image")
            }
          />
          <h3 className="font-bold text-sm mt-2">{selectedItem.title}</h3>
          <p className="text-blue-600 font-semibold">
            ${new Intl.NumberFormat().format(Math.floor(selectedItem.price))}
          </p>
          <span className="text-gray-600 text-xs">
            {selectedItem.bedroom} bed
          </span>
        </div>
      )}
    </div>
  );
}

export default PropertyMap;
