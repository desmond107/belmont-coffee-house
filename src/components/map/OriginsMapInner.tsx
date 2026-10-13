"use client";

import "leaflet/dist/leaflet.css";
import L from "leaflet";
import Link from "next/link";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { useEffect } from "react";
import { regions, headquarters, countryName } from "@/content/origins";

/**
 * Map tiles. Defaults to OpenStreetMap's public tiles (fine for modest traffic,
 * attribution required). For a styled or high-traffic map, set
 * NEXT_PUBLIC_MAP_TILE_URL (e.g. a MapTiler or Stadia URL with your key) and
 * NEXT_PUBLIC_MAP_ATTRIBUTION.
 */
const TILE_URL = process.env.NEXT_PUBLIC_MAP_TILE_URL || "https://tile.openstreetmap.org/{z}/{x}/{y}.png";
const TILE_ATTRIBUTION = process.env.NEXT_PUBLIC_MAP_ATTRIBUTION || '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

const icon = (hq = false) =>
  L.divIcon({ className: "", html: `<span class="belmont-marker${hq ? " is-hq" : ""}"></span>`, iconSize: [18, 18], iconAnchor: [9, 9], popupAnchor: [0, -10] });

function FlyTo({ target }: { target: string | null }) {
  const map = useMap();
  useEffect(() => {
    const r = regions.find((x) => x.slug === target);
    if (r) map.flyTo([r.lat, r.lng], 7, { duration: 1.2 });
  }, [target, map]);
  return null;
}

export default function OriginsMapInner({ focus }: { focus: string | null }) {
  return (
    <MapContainer center={[-1.5, 34.5]} zoom={5} minZoom={4} maxZoom={10} scrollWheelZoom={false} className="h-full w-full" aria-label="Map of Belmont's coffee growing regions in East Africa">
      <TileLayer attribution={TILE_ATTRIBUTION} url={TILE_URL} />
      <FlyTo target={focus} />
      <Marker position={[headquarters.lat, headquarters.lng]} icon={icon(true)}>
        <Popup>
          <strong>{headquarters.name}</strong>
          <br />
          Cupping lab, offices and export desk
        </Popup>
      </Marker>
      {regions.map((r) => (
        <Marker key={r.slug} position={[r.lat, r.lng]} icon={icon()} title={`${r.name}, ${countryName(r.country)}`}>
          <Popup>
            <span style={{ fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "#7d5a1e", fontWeight: 600 }}>{countryName(r.country)}</span>
            <br />
            <strong style={{ fontSize: 15 }}>{r.name}</strong>
            <br />
            {r.altitude} · {r.processes.join(", ")}
            <br />
            <em>{r.flavor.slice(0, 3).join(", ")}</em>
            <br />
            <Link href={`/origins/${r.slug}`} style={{ color: "#7d5a1e", fontWeight: 600 }}>
              View region profile →
            </Link>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
