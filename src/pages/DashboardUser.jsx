import React, { useEffect } from "react";
import { useStateValue } from "../Context/stateProvider";
import {DashboardUserCard} from '../cards/cards'
import { getAllUsers } from "../api";
import { actionType } from "../Context/reducer";


const DashboardUser = () => {
  const [{ allUsers,user }, dispatch] = useStateValue();

  useEffect(() => {
    if (!allUsers) {
      getAllUsers().then((data)=>{
        dispatch({
          type: actionType.SET_ALLUSERS,
          allUsers: data,
         })
      })
    }
  }, [])
  
  return (
    <div className="w-full p-4 flex items-center justify-center flex-col">
      {/*filter*/}

      {/*tabular data form*/}
      <div className="relative w-full py-12 min-h-[400px] overflow-x-scroll my-4 flex flex-col items-center justify-start p-4 border border-gray-300 rounded-md gap-3">
        {/*table count for user*/}
        <div className="absolute top-4 left-4">
          <p className="text-sm font-semibold">
            Count :
            <span className="text-xl font-bold text-textColor">
              {allUsers?.length}
            </span>
          </p>
        </div>
        {/*table heading*/}
        <div className="w-full min-w-[750px] flex items-center justify-between">
          <p className="text-sm font-semibold text-textColor w-275 min-w-[160px] text-center">
            Image
          </p>
          <p className="text-sm font-semibold text-textColor w-275 min-w-[160px] text-center">
            Name
          </p>
          <p className="text-sm font-semibold text-textColor w-275 min-w-[160px] text-center">
            Email
          </p>
          <p className="text-sm font-semibold text-textColor w-275 min-w-[160px] text-center">
            Verified
          </p>
          <p className="text-sm font-semibold text-textColor w-275 min-w-[160px] text-center">
            Created
          </p>
          <p className="text-sm font-semibold text-textColor w-275 min-w-[160px] text-center">
            Role
          </p>
        </div>
        {/*table content*/}
        {
          allUsers && (
            allUsers.map((data,idx)=>(
              <DashboardUserCard data={data} idx={idx} user={user}/>
            ))
          )
        }
      </div>
    </div>
  );
};

export default DashboardUser;
