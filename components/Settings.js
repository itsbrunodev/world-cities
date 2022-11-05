import { useState } from "react";

const Settings = () => {
  const [color, setColor] = useState(
    localStorage.getItem("color") ?? "#ffffff"
  );

  const onSubmit = (event) => {
    event.preventDefault();
    localStorage.setItem("color", color);
    return window.location.reload();
  };

  return (
    <div className="w-screen h-screen bg-transparent backdrop-blur-md z-[99999] absolute flex justify-center items-center">
      <div className="absolute z-[9999] right-0 top-0 m-2.5 bg-transparent">
        <button
          className="svg-button p-2"
          onClick={() => window.location.reload()}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 320 512"
            className="w-5 fill-[#d1d1d1]"
          >
            {/* <!--! Font Awesome Pro 6.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --> */}
            <path d="M310.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L160 210.7 54.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L114.7 256 9.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 301.3 265.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L205.3 256 310.6 150.6z" />
          </svg>
        </button>
      </div>
      <form className="flex flex-col space-y-5" onSubmit={(e) => onSubmit(e)}>
        <label className="w-full justify-between flex">
          <p className="font-thin text-[#d1d1d1] text-lg text-md h-full justify-center">
            Set city marker color
          </p>
          <input
            value={color}
            type="color"
            onChange={(e) => setColor(e.target.value)}
            className="bg-transparent cursor-pointer"
          />
        </label>
        <button
          type="submit"
          className="w-56 bg-[#383838] hover:bg-[#474747] active:bg-[#525252] text-[#d1d1d1] py-2 rounded-md font-thin text-xl transition-all duration-100 ease-out"
        >
          Save
        </button>
        <button
          type="button"
          onClick={() => {
            const storageColor = color;
            localStorage.clear();
            localStorage.setItem("color", storageColor);
            return window.location.reload();
          }}
          className="w-56 bg-[#c53333] hover:bg-[#cf4848] active:bg-[#cc5a5a] text-[#d1d1d1] py-2 rounded-md font-thin text-xl transition-all duration-100 ease-out"
        >
          Clear Cities
        </button>
      </form>
    </div>
  );
};

export default Settings;
