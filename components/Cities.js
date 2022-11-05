import React from "react";

const Cities = ({ setData }) => {
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

  return (
    <div className="absolute z-[9999] left-0 top-20 p-3 m-2.5 bg-transparent backdrop-blur-sm rounded-md border-[1px] border-[#696969] flex flex-col md:max-h-96 max-h-52 overflow-auto">
      {cities().length !== 0 ? (
        <>
          <p className="text-sm text-[#a5a5a5] font-thin pb-2 border-b-[#696969] border-b-[1px]">
            Named a total of {cities().length}{" "}
            {cities().length > 1 ? "cities" : "city"}.
          </p>
          <ul className="pt-1">
            {cities().map((x, i) => {
              return (
                <li
                  key={i}
                  className="text-md text-[#d1d1d1] font-thin hover:cursor-pointer"
                  onClick={(e) => {
                    setData((data) => {
                      const lat = x.arr[0];
                      const lon = x.arr[1];
                      const latLon = [Number(data.lat), Number(data.lon)];

                      function is(a, b) {
                        return (
                          (a === b && (a !== 0 || 1 / a === 1 / b)) ||
                          (a !== a && b !== b)
                        );
                      }

                      return {
                        city: x.name,
                        lat,
                        lon,
                        i: x.arr.every(function (u, i) {
                          return is(u, latLon[i]);
                        })
                          ? data.i
                          : data.i + 1,
                      };
                    });
                  }}
                >
                  {x.name}
                </li>
              );
            })}
          </ul>
        </>
      ) : (
        <p className="text-md text-[#d1d1d1] font-thin">
          {" "}
          You haven&apos;t named any cities yet.
        </p>
      )}
    </div>
  );
};

export default Cities;
