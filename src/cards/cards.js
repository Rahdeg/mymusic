import { motion } from "framer-motion";
import moment from "moment";
import { useEffect, useState } from "react";
import { bgColors } from "../utils/styles";
import {changeUserRole,deleteUser} from "../api/index"
import {actionType} from '../Context/reducer'
import { useStateValue } from "../Context/stateProvider";
import { MdDelete } from 'react-icons/md'
import { useDispatch } from "react-redux";
import { getAllUsers } from "../features/users/userSlices";


export const DashboardUserCard = ({ data, idx, user }) => {
  const [isUserRole, setIsUserRole] = useState(false);
  const [{ allUsers }, dispatch] = useStateValue();
  const createdAt = moment(new Date(data.createdAt)).format("MMMM Do YYYY");
  const dispat = useDispatch();


  useEffect(() => {
    if (!allUsers) {
      dispat(getAllUsers());
    }
  }, [])
  

  const deleteUsers=(userId)=>{
      deleteUser(userId).then((res)=>{
        if (res) {
          dispat(getAllUsers());
        }
      })
  }

  const updateRole=(userId,role)=>{
    changeUserRole(userId,role).then((res)=>{
      if (res) {
        dispat(getAllUsers());
      }
    })
    setIsUserRole(false);
  }
  return (
    <motion.div className="relative w-full rounded-md flex items-center justify-between py-4 bg-lightOverlay cursor-pointer hover:bg-card hover:shadow-md">
    {
      data._id !== user?._id && (
        <motion.div 
        whileTap={{scale:0.75}}
        className="absolute left-4 w-8 h-8 rounded-md flex items-center justify-center bg-gray-200"
        onClick={()=>{deleteUsers(data._id)}}
        >
        <MdDelete className=" text-xl text-red-400 hover:text-red-500"/>
        </motion.div>
      )
    }
     
      {/*user Image*/}
      <div
        className="w-275 min-w-[160px] flex items-center justify-center"
        key={idx}
      >
        <img
          src={data.imageUrl}
          alt=""
          className="w-10 h-10 object-cover rounded-md min-w-[40px] shadow-md"
        />
      </div>
      {/*user Details*/}
      <p className=" text-base text-textColor w-275 min-w-[160px] text-center">
        {data.name}
      </p>
      <p className=" text-base text-textColor w-275 min-w-[160px] text-center">
        {data.email}
      </p>
      <p className=" text-base text-textColor w-275 min-w-[160px] text-center">
        {data.emailVerified ? "true" : "false"}
      </p>
      <p className=" text-base text-textColor w-275 min-w-[160px] text-center">
        {createdAt}
      </p>
      <div className="w-275 min-w-[160] text-center flex items-center justify-center gap-6 relative">
        <p className=" text-base text-textColor  text-center">{data.role}</p>
        {data._id !== user?._id && (
          <motion.p
            whileTap={{ scale: 0.75 }}
            onClick={() => setIsUserRole(true)}
            className="text-[10px] font-semibold text-textColor px-1 bg-purple-200 rounded-sm hover:shadow-sm"
          >
            {data.role === "admin" ? "member" : "admin"}
          </motion.p>
        )}
        {isUserRole && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="absolute z-10 top-6 right-4 p-4 flex items-center flex-col gap-4 bg-white shadow-xl rounded-md"
            key={idx}
          >
            <p className=" text-textColor text-[12px] font-semibold">
              Are you sure,do you want to make the user as{" "}
              <span>{data.role === "admin" ? "member" : "admin"}</span> ?
            </p>
            <div className="flex items-center  gap-4">
              <motion.button
                whileTap={{ scale: 0.75 }}
                className=" outline-none border-none text-sm px-4 py-1 rounded-md bg-blue-200 text-black hover:shadow-md "
                onClick={()=>{updateRole(data._id,data.role === "admin" ? "member" : "admin")}}
                key={idx}
              >
                Yes
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.75 }}
                onClick={() => setIsUserRole(false)}
                className="outline-none border-none text-sm px-4 py-1 rounded-md bg-gray-200 text-black hover:shadow-md "
              >
                No
              </motion.button>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export const DashboardCard = ({ icon, name, count,idx }) => {
  const bgColor = bgColors[parseInt(Math.random() * bgColors.length)];

  return (
    <div
      style={{ background: `${bgColor}` }}
      className="p-4 w-40 gap-3 h-auto rounded-lg shadow-md bg-blue-500 flex flex-col items-center justify-center"
      key={idx}
      >

      {icon}
      <p className="text-xl text-textColor font-semibold">{name}</p>
      <p className="text-xl text-textColor">{count}</p>
    </div>
  );
};
