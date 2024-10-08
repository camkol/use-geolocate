import { useState } from "react";
import { useGeolocation } from "./useGeolocation";

export default function Mine() {
  const [countClicks, setCountClicks] = useState(0);
  const [fetchPosition, setFetchPosition] = useState(false);

  const { isLoading, error, lat, lng } = useGeolocation(fetchPosition);

  function getPosition() {
    setCountClicks((count) => count + 1);
    setFetchPosition(true);
  }

  return (
    <div>
      <button onClick={getPosition} disabled={isLoading}>
        Get my position
      </button>

      {isLoading && <p>Loading position...</p>}
      {error && <p>{error}</p>}
      {!isLoading && !error && lat && lng && (
        <p>
          Your GPS position:{" "}
          <a
            target="_blank"
            rel="noreferrer"
            href={`https://www.openstreetmap.org/#map=16/${lat}/${lng}`}
          >
            {lat}, {lng}
          </a>
        </p>
      )}

      <p>You requested position {countClicks} times</p>
    </div>
  );
}
