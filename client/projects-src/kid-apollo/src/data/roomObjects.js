export const ROOM_OBJECT_MANIFEST_URL = "/assets/room-objects/manifest.json";

export const FALLBACK_ROOM_OBJECTS = [
  {
    id: "record-player",
    label: "Record player",
    action: "Listen",
    hrefKey: "listen",
    status: "proxy",
  },
  {
    id: "crt-tv",
    label: "CRT TV",
    action: "Watch",
    hrefKey: "watch",
    status: "downloaded",
  },
  {
    id: "phone",
    label: "Phone",
    action: "Follow",
    hrefKeys: ["instagram", "tiktok"],
    status: "proxy",
  },
  {
    id: "envelope-poster",
    label: "Envelope / poster",
    action: "Sign Up",
    hrefKey: "signup",
    status: "manual-needed",
  },
  {
    id: "vinyl-shelf",
    label: "Vinyl shelf",
    action: "Vinyl",
    hrefKey: "vinyl",
    status: "proxy",
  },
  {
    id: "merch-box",
    label: "Cardboard merch box",
    action: "Merch Soon",
    hrefKey: "merch",
    status: "downloaded",
    disabled: true,
  },
];

export function normalizeRoomObject(item = {}) {
  const hrefKeys =
    Array.isArray(item.hrefKeys) && item.hrefKeys.length > 0
      ? item.hrefKeys
      : item.hrefKey
        ? [item.hrefKey]
        : [];
  const normalizedHrefKeys =
    item.id === "phone" && hrefKeys.length === 1 && hrefKeys[0] === "instagram"
      ? ["instagram", "tiktok"]
      : hrefKeys;

  return {
    id: item.id || item.asset || item.label,
    label: item.label || "Room object",
    action: item.action || "Action",
    hrefKey: item.hrefKey || normalizedHrefKeys[0] || null,
    hrefKeys: normalizedHrefKeys,
    status: item.status || "proxy",
    assetType: item.assetType || null,
    note: item.note || null,
    url: item.url || item.servedPath || null,
    disabled: Boolean(
      item.disabled ||
        item.hrefKey === "merch" ||
        normalizedHrefKeys.includes("merch")
    ),
  };
}

export function normalizeRoomObjects(items) {
  const source = Array.isArray(items) && items.length > 0 ? items : FALLBACK_ROOM_OBJECTS;
  return source.map(normalizeRoomObject);
}
