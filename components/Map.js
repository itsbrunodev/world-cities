import React from "react";

import { MapContainer, TileLayer, Circle, Popup } from "react-leaflet";

import "leaflet/dist/leaflet.css";
import "leaflet";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
/* import "leaflet-defaulticon-compatibility"; */

const Map = ({ city = null, lat, lon }) => {
  const center = [Number(lat), Number(lon)];

  const cities = () => {
    const keys = Object.keys(localStorage);

    const array = [];
    const types = ["ally-supports-cache", "color"];
    keys.map((key, i) => {
      if (!types.includes(key)) {
        const str = localStorage.getItem(keys[i]);

        let arr = [];

        const reg = str.matchAll(
          /LAT=(?<latitude>[\d-.]+)\|LON=(?<longitude>[\d-.]+)/g
        );
        for (let result of reg) {
          const { latitude, longitude } = result.groups;
          arr = [Number(latitude), Number(longitude)];
        }

        array.push({
          name: key,
          arr,
        });
      }
    });

    return array;
  };

  if (city !== null) localStorage.setItem(city, `{LAT=${lat}|LON=${lon}}`);

  return (
    <MapContainer
      center={center}
      zoom={5}
      scrollWheelZoom={true}
      style={{ height: "100vh", width: "100vw", background: "#191a1a" }}
    >
      <TileLayer
        url="https://api.mapbox.com/styles/v1/brunolepis/cla2nxofg003p14pawyb5k0x7/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiYnJ1bm9sZXBpcyIsImEiOiJjbDNrZ2Q5OW0wNnBzM3Jyc2dhZndvOXp1In0.iD-BESx2yYZvnYrzpdyIJw"
        attribution='Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery &copy; <a href="https://www.mapbox.com/">Mapbox</a>'
      />
      {cities().length !== 0 ? (
        cities().map((x, i) => {
          return (
            <Circle
              key={i}
              center={x.arr}
              radius={100}
              pathOptions={{
                color: localStorage.getItem("color") ?? "#ffffff",
              }}
            />
          );
        })
      ) : (
        <></>
      )}
    </MapContainer>
  );
};

export default Map;
