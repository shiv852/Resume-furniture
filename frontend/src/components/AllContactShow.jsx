import React, { useEffect } from "react";
import { IoCloseOutline } from "react-icons/io5";
import ReactDOM from "react-dom";
import { ShareSocial } from "react-share-social";

const AllContactShow = ({ onClose }) => {
  useEffect(() => {
    document.body.style.overflowY = "hidden";

    return () => {
      document.body.style.overflowY = "scroll";
    };
  }, []);

  const style = {
    root: {
      background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
      border: 0,
      boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
      color: "white",
    },
    copyContainer: {
      border: "1px solid blue",
      background: "rgb(0,0,0,0.7)",
    },
    title: {
      color: "aquamarine",
      fontStyle: "italic",
    },
  };

  return ReactDOM.createPortal(
    <>

      <div className="w-full h-full bg-opacity-35  bg-slate-200 top-[5rem] bottom-0 left-0 right-0 flex justify-center fixed " onDoubleClick={onClose}>
        {/* <div className='flex justify-center content-center w-full bg-red-500'> */}
        <div className=" w-full h-[8rem] max-w-[80%] md:max-w-[26%] my-32 max-h-[80%]  ">
          <div
            className=" pl-4 pr-5 py-2  flex justify-between items-center"
            style={{
              background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
            }}
          >
            <h4 className="font-bold text-lg">share it</h4>
            <div
              className="w-fit ml-auto text-2xl hover:text-white cursor-pointer"
              onClick={onClose}
            >
              {" "}
              <IoCloseOutline />
            </div>
          </div>
          <ShareSocial
            url="http://localhost:5173/"
            socialTypes={[
              "facebook",
              "twitter",
              "linkedin",
              "whatsapp",
              "email",
            ]}
            style={style}
          />
        </div>
        {/* </div> */}
      </div>
    </>,
    document.querySelector(".MyPortalModal")
  );
};

export default AllContactShow;
