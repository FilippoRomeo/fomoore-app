export function assetUrl(path = "") {
  const base = import.meta.env.BASE_URL || "/";
  const clean = String(path)
    .replace(/^\/+/, "")
    .replace(/^public\/+/, "");
  return `${base}${clean}`;
}

export function normalizeAssetUrl(value) {
  if (typeof value !== "string") return value;

  if (/^https?:\/\//i.test(value)) return value;
  if (value.startsWith("/public/assets/")) return assetUrl(value);
  if (value.startsWith("public/assets/")) return assetUrl(value);
  if (value.startsWith("/assets/")) return assetUrl(value);
  if (value.startsWith("assets/")) return assetUrl(value);

  return value;
}

export function normalizeAssetObject(value) {
  if (Array.isArray(value)) return value.map(normalizeAssetObject);

  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value).map(([key, val]) => [key, normalizeAssetObject(val)])
    );
  }

  return normalizeAssetUrl(value);
}
