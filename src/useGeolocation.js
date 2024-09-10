import { useEffect, useState } from "react";

export function useGeolocation(shouldFetch) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [position, setPosition] = useState({ lat: null, lng: null });

  useEffect(
    function () {
      if (!shouldFetch) return;

      if (!navigator.geolocation)
        return setError("Your browser does not support geolocation");

      setIsLoading(true);
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setPosition({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          });
          setIsLoading(false);
        },
        (error) => {
          setError(error.message);
          setIsLoading(false);
        }
      );
    },
    [shouldFetch]
  );

  return { isLoading, error, lat: position.lat, lng: position.lng };
}
