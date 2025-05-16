import { Marker, Popup } from "react-leaflet";
import { Link } from "react-router-dom";

interface PinProps {
  item: {
    id: string;
    title: string;
    img: string;
    price: number;
    bedroom: number;
    latitude: number;
    longitude: number;
  };
}

function Pin({ item }: PinProps) {
  return (
    <Marker position={[item.latitude, item.longitude]}>
      <Popup>
        <div className="flex gap-5">
          <img
            src={item.img}
            alt=""
            className="w-16 h-12 object-cover rounded"
          />
          <div className="flex flex-col justify-between">
            <Link to={`/${item.id}`} className="text-blue-600 hover:underline">
              {item.title}
            </Link>
            <span className="text-sm text-gray-600">{item.bedroom} bedroom</span>
            <b className="text-black">${item.price}</b>
          </div>
        </div>
      </Popup>
    </Marker>
  );
}

export default Pin;
