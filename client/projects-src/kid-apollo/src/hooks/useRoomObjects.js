import { useEffect, useState } from "react";
import {
  FALLBACK_ROOM_OBJECTS,
  ROOM_OBJECT_MANIFEST_URL,
  normalizeRoomObjects,
} from "../data/roomObjects.js";

const FALLBACK_OBJECTS = normalizeRoomObjects(FALLBACK_ROOM_OBJECTS);

export default function useRoomObjects() {
  const [state, setState] = useState({
    objects: FALLBACK_OBJECTS,
    loading: true,
    error: null,
  });

  useEffect(() => {
    let cancelled = false;

    async function loadManifest() {
      try {
        const response = await fetch(ROOM_OBJECT_MANIFEST_URL);
        if (!response.ok) {
          throw new Error(`Room object manifest returned ${response.status}`);
        }

        const manifest = await response.json();
        const objects = normalizeRoomObjects(manifest.objects);

        if (!cancelled) {
          setState({ objects, loading: false, error: null });
        }
      } catch (error) {
        if (!cancelled) {
          setState({
            objects: FALLBACK_OBJECTS,
            loading: false,
            error,
          });
        }
      }
    }

    loadManifest();

    return () => {
      cancelled = true;
    };
  }, []);

  return state;
}
