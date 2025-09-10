# Location Tracking Playbook (LLM-Optimized)

Purpose: a concise, implementation-ready guide for real-time location tracking in TeamHunt’s web apps using free, open web tech. Applies to:

- apps/landing (demo pages)
- apps/organizer (participant/admin UI)

---

## 1) Summary

- Use browser Geolocation API for coordinates (foreground only, HTTPS required).
- Render maps with Leaflet (or React-Leaflet) using OpenStreetMap tiles.
- Use `watchPosition()` for live updates; stop via `clearWatch()`.
- For multi-user or server updates, choose Polling, SSE, or WebSockets based on latency and direction needs.
- Account for iOS foreground limitations and battery trade-offs.

---

## 2) Decision Matrix

- Single-user position only: Geolocation + client-side Leaflet. No server needed.
- Server pushes waypoints (one-way): SSE (simple server→client updates).
- Bi-directional real-time (e.g., many players): WebSockets (Socket.io optional).
- Simplicity over real-time: Periodic HTTP polling.

---

## 3) Key APIs and Options

- `navigator.geolocation.watchPosition(success, error, { enableHighAccuracy, timeout, maximumAge })`
  - `enableHighAccuracy: true` for walking precision; more battery.
  - `maximumAge`: cache window; larger value reduces battery.
  - `timeout`: max time to wait for a fix.
- Stop updates: `navigator.geolocation.clearWatch(id)`.
- HTTPS only (or localhost) for Geolocation.

---

## 4) Next.js App Router Implementation

- Components must be client-side: add `"use client"`.
- Minimal Leaflet approach:

```tsx
"use client";
import { useEffect, useRef, useState } from "react";
import L from "leaflet";

export default function RealTimeMap() {
  const [pos, setPos] = useState({ lat: 0, lon: 0 });
  const mapRef = useRef<L.Map | null>(null);
  const markerRef = useRef<L.Marker | null>(null);

  useEffect(() => {
    if (!("geolocation" in navigator)) return;
    const id = navigator.geolocation.watchPosition(
      p => setPos({ lat: p.coords.latitude, lon: p.coords.longitude }),
      err => console.error("Geolocation error", err),
      { enableHighAccuracy: true, maximumAge: 1000 }
    );
    return () => navigator.geolocation.clearWatch(id);
  }, []);

  useEffect(() => {
    if (mapRef.current) return;
    mapRef.current = L.map("map").setView([pos.lat, pos.lon], 15);
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap contributors",
    }).addTo(mapRef.current);
    markerRef.current = L.marker([pos.lat, pos.lon])
      .addTo(mapRef.current)
      .bindPopup("You are here").openPopup();
  }, []);

  useEffect(() => {
    if (!mapRef.current || !markerRef.current) return;
    markerRef.current.setLatLng([pos.lat, pos.lon]);
    mapRef.current.setView([pos.lat, pos.lon]);
  }, [pos]);

  return <div id="map" aria-label="Map showing your location" style={{ height: "100vh" }} />;
}
```

- React-Leaflet alternative: use `<MapContainer>`, `<TileLayer>`, `<Marker>` in a client component.
- Include Leaflet CSS (e.g., import in global CSS or use a CSS loader).

---

## 5) Accessibility

- Always provide textual cues alongside the map (e.g., "Next clue: 150 m north").
- Add `aria-label` to the map container.
- Ensure keyboard focus styles are visible for controls; label zoom buttons.
- Use alt text for markers/images where applicable.

---

## 6) iOS/Android Behavior

- Foreground-only: pages stop updating when backgrounded or screen-locked.
- iOS Safari may pause GPS or reduce accuracy when not active.
  - Tip: restart the watch on `window.focus` if updates stalled.
- Android Chrome/Firefox are more tolerant while foregrounded.

---

## 7) Battery Trade-offs

- High accuracy increases drain; disable if street/block accuracy is enough.
- Avoid overly frequent updates; 1–5s cadence is typical for walking.
- Stop watching when not needed (e.g., on route completion or page leave).

---

## 8) Real-Time Data Options

- Polling: simplest; setInterval fetches. Higher request volume.
- SSE: server→client stream via `EventSource`. Lightweight, not bi-directional.
- WebSockets: bi-directional, lowest latency; requires WS server.

---

## 9) Error States & Fallbacks

- No support or denied: show message and allow manual location entry (search or drop-pin).
- Handle geolocation errors (timeout/unavailable); inform the user.
- Feature detection: `if (!('geolocation' in navigator)) { ... }`.

---

## 10) Security & Deployment

- Must be served over HTTPS in production.
- Respect user privacy: request permission contextually and explain usage.
- Do not store precise location server-side unless necessary; if stored, protect and minimize retention.

---

## 11) Testing Checklist (PRs)

- Visual
  - Marker updates with movement; map recenters as intended.
- Accessibility
  - Map labeled; textual alternative shown.
- Behavior
  - Start/stop watch on mount/unmount; no leaks.
  - iOS Safari manual test: deny/allow, background/foreground behavior.
- Performance
  - Update frequency reasonable; no unnecessary rerenders.
- Security
  - Works on HTTPS; handles denied permissions gracefully.

---

## 12) LLM Prompts (copy/paste)

- Component prompt
  - "Create a client-side Next.js component that watches geolocation with high accuracy, updates Leaflet marker position, recenters the map, exposes a start/stop function, and provides textual distance/bearing to a target coordinate for accessibility. Include proper error handling and HTTPS/permission checks."

- Real-time choice prompt
  - "Recommend between polling, SSE, or WebSockets for broadcasting locations for up to N players with latency < X ms and server Y constraints. Provide code stubs for the chosen approach."

---

## 13) Adoption Plan

1) Build a `RealTimeMap` client component in `apps/organizer` demo route.
2) Add Leaflet CSS import in app globals, verify OSM attribution.
3) Add textual guidance component (distance/bearing to next clue).
4) Add fallback UI for denied/no geolocation.
5) If needed, prototype SSE or WebSockets for multi-user location updates.

---

## 14) References

- Geolocation (MDN): https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/watchPosition
- Leaflet Quick Start: https://leafletjs.com/examples/quick-start/
- React-Leaflet: https://react-leaflet.js.org/docs/start-introduction/
- SSE (MDN): https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events/Using_server-sent_events
- WebSockets (MDN): https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API
- Android battery guidance: https://developer.android.com/develop/sensors-and-location/location/battery
