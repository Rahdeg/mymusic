import React, { useState } from "react";
import { IoChevronDown } from "react-icons/io5";
import { motion } from "framer-motion";
import { useStateValue } from "../Context/stateProvider";
import { actionType } from "../Context/reducer";

const Filterbottons = ({ filterdata, flag }) => {
  const [filtername, setfiltername] = useState(null);
  const [filtermenu, setfiltermenu] = useState(false);
  const [{ filterTerm, artistFilter, languageFilter, albumFilter }, dispatch] =
    useStateValue();

  const updateFilter = (name) => {
    setfiltermenu(false);
    setfiltername(name);

    if (flag === "Artist") {
      dispatch({
        type: actionType.SET_ARTISTFILTER,
        artisFilter: name,
      });
    }

    if (flag === "Album") {
      dispatch({
        type: actionType.SET_ALBUMFILTER,
        albumFilter: name,
      });
    }

    if (flag === "Category") {
      dispatch({
        type: actionType.SET_FILTERTERM,
        filterTerm: name,
      });
    }

    if (flag === "Language") {
      dispatch({
        type: actionType.SET_LANGUAGEFILTER,
        languageFilter: name,
      });
    }
  };

  return (
    <div className=" border border-gray-300 rounded-md px-4 py-1 relative cursor-pointer hover:border-gray-400">
      <p
        className=" text-base tracking-wide text-textColor flex items-center gap-2"
        onClick={() => setfiltermenu(!filtermenu)}
      >
        {!filtername && flag}

        {filtername && (
          <>
            {filtername.length > 15
              ? `${filtername.slice(0, 15)}...`
              : filtername}
          </>
        )}
        <IoChevronDown
          className={`text-base text-textColor duration-500 transition-all ease-in-out ${
            filtermenu ? " rotate-180" : " rotate-0"
          }`}
        />
      </p>
      {filterdata && filtermenu && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="w-48 z-50 backdrop-blur-sm max-h-44 overflow-y-scroll scrollbar-thin scrollbar-track-gray-200 scrollbar-thumb-gray-400 py-2 flex flex-col rounded-md shadow-md absolute top-8 left-0"
        >
          {filterdata?.map((data, idx) => (
            <div
              className="flex items-center gap-2 py-1 px-4 hover:bg-gray-200"
              key={idx}
            >
              {(flag === "Artist" || flag === "Album") && (
                <img
                  src={data.imageUrl}
                  alt=""
                  className="w-8 min-w-[32px] h-8 rounded-full object-cover"
                />
              )}

              <p className="w-full" onClick={() => updateFilter(data.name)}>
                {data.name.length > 15
                  ? `${data.name.slice(0, 14)}...`
                  : data.name}
              </p>
            </div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default Filterbottons;
