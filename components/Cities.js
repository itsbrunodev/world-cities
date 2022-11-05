import React from "react";

const Cities = () => {
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
      <p className="text-sm text-[#a5a5a5] font-thin pb-2 border-b-[#696969] border-b-[1px]">
        Named a total of {cities().length} cit
        {cities().length !== 0 ? "y" : "ies"}.
      </p>
      <ul className="pt-1">
        {cities().length !== 0 ? (
          cities().map((x, i) => {
            return (
              <li key={i} className="text-md text-[#d1d1d1] font-thin">
                {x.name}
              </li>
            );
          })
        ) : (
          <></>
        )}
      </ul>
    </div>
  );
};

export default Cities;
