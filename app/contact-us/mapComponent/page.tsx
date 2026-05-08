"use client";

import "leaflet/dist/leaflet.css";

import L from "leaflet";
import {MapContainer, TileLayer, Marker, Popup} from "react-leaflet";

// FIX MARKER ICON
delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl:
        "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
    iconUrl:
        "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    shadowUrl:
        "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

export default function ContactMap() {
    return (
        <div
            className="
                w-full
                h-[260px]
                sm:h-[320px]
                md:h-[404px]
                overflow-hidden
                rounded-[12px]
            "
        >
            <MapContainer
                center={[21.0036, 105.7566]}
                zoom={15}
                scrollWheelZoom={false}
                className="w-full h-full z-0"
            >

                {/* MAP TILE */}
                <TileLayer
                    attribution='&copy; OpenStreetMap contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {/* MARKER */}
                <Marker position={[21.0036, 105.7566]}>
                    <Popup>
                        Chuan Yang Showroom
                    </Popup>
                </Marker>

            </MapContainer>
        </div>
    );
}
