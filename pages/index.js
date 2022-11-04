import { useState } from "react";
import dynamic from "next/dynamic";

const Map = dynamic(() => import("../components/Map"), {
  ssr: false,
});

export default function App() {
  const [city, setCity] = useState("");
  const [data, setData] = useState({
    city: null,
    lat: "42.345573",
    lon: "-71.098326",
  });
  const [success, setSuccess] = useState(true);

  const onSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?city=${city}&format=json`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.ok) {
      const result = await response.json();
      const types = ["city", "administrative"];
      if (result?.length !== 0 && types.includes(result[0].type)) {
        const { lat, lon, display_name } = result[0];
        console.log(lat, lon, display_name);
        setCity("");
        return setData({ city: display_name.match(/[\w\s]+/)[0], lat, lon });
      } else {
        return setSuccess(false);
      }
    } else {
      return setSuccess(false);
    }
  };

  return (
    <div className="w-screen h-screen flex justify-center items-start">
      <form
        onSubmit={(e) => onSubmit(e)}
        className="md:w-96 w-full h-fit md:m-4 mb-12 transition-all duration-150 ease-out absolute md:top-0 bottom-0 z-[9999]"
      >
        <input
          type="text"
          className="bg-transparent backdrop-blur-lg px-4 py-1 w-full rounded-md focus:outline-none text-3xl h-16 font-thin text-[#d1d1d1] placeholder:text-[#565656]"
          style={{
            border: success ? "1px #565656 solid" : "1px #ff3333 solid",
          }}
          placeholder="City name"
          onChange={(e) => {
            if (!success) setSuccess(true);
            setCity(e.target.value);
          }}
          value={city}
          minLength={1}
          maxLength={100}
          required
        />
      </form>
      <div id="map">
        <Map city={data.city} lat={data.lat} lon={data.lon} key={data.city} />
      </div>
    </div>
  );
}
