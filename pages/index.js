import { useState } from "react";
import dynamic from "next/dynamic";
import Head from "next/head";

const Map = dynamic(() => import("../components/Map"), {
  ssr: false,
});

const Cities = dynamic(() => import("../components/Cities"), {
  ssr: false,
});

const Settings = dynamic(() => import("../components/Settings"), {
  ssr: false,
});

export default function App() {
  const [city, setCity] = useState("");
  const [data, setData] = useState({
    city: null,
    lat: "42.345573",
    lon: "-71.098326",
    i: 1,
  });
  const [success, setSuccess] = useState(true);

  const [citiesOpen, setCitiesOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  const onSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch(
      `https://nominatim.openstreetmap.org/search.php?city=${city}&namedetails=1&dedupe=1&limit=1&format=jsonv2`,
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
        const { lat, lon, namedetails } = result[0];
        setCity("");
        return setData({
          city: namedetails["name:en"] ?? namedetails.name,
          lat,
          lon,
          i: data.i + 1,
        });
      } else {
        return setSuccess(false);
      }
    } else {
      return setSuccess(false);
    }
  };

  const citiesClick = () => {
    return setCitiesOpen(!citiesOpen);
  };

  const settingsClick = () => {
    return setSettingsOpen(!settingsOpen);
  };

  return (
    <>
      <Head>
        <title>World Cities</title>
      </Head>
      <div
        className="w-screen h-screen flex justify-center items-start"
        key={data.i}
      >
        {citiesOpen ? <Cities setData={setData} /> : <></>}
        {settingsOpen ? <Settings /> : <></>}
        <form
          onSubmit={(e) => onSubmit(e)}
          className="md:w-96 h-fit m-2.5 absolute md:top-0 bottom-0 z-[9999]"
        >
          <input
            type="text"
            className="bg-transparent backdrop-blur-sm px-3 w-full rounded-md focus:outline-none text-3xl h-16 font-thin text-[#d1d1d1] placeholder:text-[#696969]"
            style={{
              border: success ? "1px #696969 solid" : "1px #ff3333 solid",
            }}
            placeholder="City name"
            onChange={(e) => {
              if (!success) setSuccess(true);
              setCity(e.target.value);
            }}
            value={city}
            minLength={3}
            maxLength={100}
            required
          />
        </form>
        <div id="map">
          <div className="absolute z-[9999] right-0 m-2.5 bg-transparent backdrop-blur-sm rounded-md border-[1px] border-[#696969] flex flex-col">
            <button
              className="svg-button p-2 border-b-[1px] border-[#696969]"
              onClick={() => citiesClick()}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                className="w-5 fill-[#d1d1d1]"
              >
                {/* <!--! Font Awesome Pro 6.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --> */}
                <path d="M40 48C26.7 48 16 58.7 16 72v48c0 13.3 10.7 24 24 24H88c13.3 0 24-10.7 24-24V72c0-13.3-10.7-24-24-24H40zM192 64c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H192zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H192zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H192zM16 232v48c0 13.3 10.7 24 24 24H88c13.3 0 24-10.7 24-24V232c0-13.3-10.7-24-24-24H40c-13.3 0-24 10.7-24 24zM40 368c-13.3 0-24 10.7-24 24v48c0 13.3 10.7 24 24 24H88c13.3 0 24-10.7 24-24V392c0-13.3-10.7-24-24-24H40z" />
              </svg>
            </button>
            <button className="svg-button p-2" onClick={() => settingsClick()}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                className="w-5 fill-[#d1d1d1]"
              >
                {/* <!--! Font Awesome Pro 6.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --> */}
                <path d="M495.9 166.6c3.2 8.7 .5 18.4-6.4 24.6l-43.3 39.4c1.1 8.3 1.7 16.8 1.7 25.4s-.6 17.1-1.7 25.4l43.3 39.4c6.9 6.2 9.6 15.9 6.4 24.6c-4.4 11.9-9.7 23.3-15.8 34.3l-4.7 8.1c-6.6 11-14 21.4-22.1 31.2c-5.9 7.2-15.7 9.6-24.5 6.8l-55.7-17.7c-13.4 10.3-28.2 18.9-44 25.4l-12.5 57.1c-2 9.1-9 16.3-18.2 17.8c-13.8 2.3-28 3.5-42.5 3.5s-28.7-1.2-42.5-3.5c-9.2-1.5-16.2-8.7-18.2-17.8l-12.5-57.1c-15.8-6.5-30.6-15.1-44-25.4L83.1 425.9c-8.8 2.8-18.6 .3-24.5-6.8c-8.1-9.8-15.5-20.2-22.1-31.2l-4.7-8.1c-6.1-11-11.4-22.4-15.8-34.3c-3.2-8.7-.5-18.4 6.4-24.6l43.3-39.4C64.6 273.1 64 264.6 64 256s.6-17.1 1.7-25.4L22.4 191.2c-6.9-6.2-9.6-15.9-6.4-24.6c4.4-11.9 9.7-23.3 15.8-34.3l4.7-8.1c6.6-11 14-21.4 22.1-31.2c5.9-7.2 15.7-9.6 24.5-6.8l55.7 17.7c13.4-10.3 28.2-18.9 44-25.4l12.5-57.1c2-9.1 9-16.3 18.2-17.8C227.3 1.2 241.5 0 256 0s28.7 1.2 42.5 3.5c9.2 1.5 16.2 8.7 18.2 17.8l12.5 57.1c15.8 6.5 30.6 15.1 44 25.4l55.7-17.7c8.8-2.8 18.6-.3 24.5 6.8c8.1 9.8 15.5 20.2 22.1 31.2l4.7 8.1c6.1 11 11.4 22.4 15.8 34.3zM256 336c44.2 0 80-35.8 80-80s-35.8-80-80-80s-80 35.8-80 80s35.8 80 80 80z" />
              </svg>
            </button>
          </div>
          <Map city={data.city} lat={data.lat} lon={data.lon} />
        </div>
      </div>
    </>
  );
}
