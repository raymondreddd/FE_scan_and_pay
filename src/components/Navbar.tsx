import React from "react";
import SettingsIcon from "@mui/icons-material/Settings";

const Navbar = () => {
  const [state, setState] = React.useState();

  return (
    <div>
      <div className="w-full text-xs bg-gradient-to-r from-yellow-500 to-blue-500 font-bold flex justify-center items-center p-1">
        CHAIWALA.COM
      </div>
      <div className="grid grid-cols-2 gap-4 p-1 bg-yellow-200 text-xs items-center justify-between">
        {/* LEFT  */}
        <div className="font-mono">
          <button
            className="border border-black text-xs p-1 rounded hover:bg-gray- w-full"
            onClick={() => {
              window.location = "/user/orders";
            }}
          >
            <div className="flex flex-row justify-between items-center">
              <div className="flex flex-row justify-start">
                TABLE: <div>1</div>
              </div>
              <div className="flex flex-row justify-start">
                OTP: <div className="font-bold">34567</div>
              </div>
            </div>
          </button>
        </div>

        {/* RIGHT  */}
        <div className="flex justify-end items-center">
          {/* CALL WAITER FUNC  */}
          <div
            className="font-bold"
            onClick={() => {
              window.location = "/user/orders";
            }}
          >
            Call Waiter
          </div>
          <div>
            <SettingsIcon sx={{ fontSize: 20 }}></SettingsIcon>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
