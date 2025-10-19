import { setOptions, importLibrary } from "@googlemaps/js-api-loader";

export interface GeoResult {
  state?: string;        // 州/省  (administrative_area_level_1)
  city?: string;         // 城市   (locality 或 admin_level_2)
  street?: string;       // 街道名 (route)
  streetNumber?: string; // 门牌号 (street_number)
  lat: number;
  lng: number;
  accuracy?: number;
}

export async function getCurrentLocation(): Promise<GeoResult> {
  // 1) 告诉 loader 使用什么 key / 版本（只需调用一次即可）
  setOptions({
    apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
  });

  // 2) 按需加载库（不再使用 new Loader().load()）
  const [{ Geocoder }] = await Promise.all([
    importLibrary("geocoding") as Promise<google.maps.GeocodingLibrary>,
  ]);

  // 3) 浏览器定位
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("Browser does not support geolocation"));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude, accuracy } = pos.coords;

        // 4) 反向地理编码
        const geocoder = new Geocoder();
        const { results } = await geocoder.geocode({
          location: { lat: latitude, lng: longitude },
        });

        const primary = results?.[0];
        const ac = primary?.address_components ?? [];

        const pick = (type: string) =>
          ac.find((c) => c.types.includes(type))?.long_name;

        resolve({
          state:       pick("administrative_area_level_1"),
          city:        pick("locality") || pick("administrative_area_level_2"),
          street:      pick("route"),
          streetNumber:pick("street_number"),
          lat: latitude,
          lng: longitude,
          accuracy,
        });
      },
      (err) => reject(err),
      { enableHighAccuracy: true, timeout: 15_000 }
    );
  });
}

