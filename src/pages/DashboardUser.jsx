import React from "react";
import { useStateValue } from "../Context/stateProvider";
import {motion} from 'framer-motion'


const DashboardUser = () => {
  const [{ allUsers }, dispatch] = useStateValue();
  return (
    <div className="w-full p-4 flex items-center justify-center flex-col">
      {/*filter*/}

      {/*tabular data form*/}
      <div className="relative w-full py-12 min-h-[400px] overflow-x-scroll my-4 flex flex-col items-center justify-start p-4 border border-gray-300 rounded-md gap-3">
        {/*table count for user*/}
        <div className="absolute top-4 left-4">
          <p className="text-xl font-semibold">
            Count :
            <span className="text-sm font-bold text-textColor">
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
            name
          </p>
          <p className="text-sm font-semibold text-textColor w-275 min-w-[160px] text-center">
            email
          </p>
          <p className="text-sm font-semibold text-textColor w-275 min-w-[160px] text-center">
            verified
          </p>
          <p className="text-sm font-semibold text-textColor w-275 min-w-[160px] text-center">
            created
          </p>
          <p className="text-sm font-semibold text-textColor w-275 min-w-[160px] text-center">
            role
          </p>
        </div>
        {/*table content*/}
        {
          allUsers && (
            allUsers.map((data,idx)=>(
              <DashboardUserCard data={data} idx={idx}/>
            ))
          )
        }
      </div>
    </div>
  );
};

export const DashboardUserCard = ({ data, idx }) => {
  console.log(data,idx)
  return (
    <motion.div className="relative w-full rounded-md flex items-center justify-between py-4 bg-lightOverlay cursor-pointer hover:bg-card hover:shadow-md" key={idx}>
      {/*user Image*/}
      <div className="w-275 min-w-[160px] flex items-center justify-center">
      <img src={data.imageUrl}  alt="" className='w-10 h-10 object-cover rounded-md min-w-[40px] shadow-md'/>
      </div>
      {/*user Details*/}
      <p className=' text-base text-textColor w-275 min-w-[160px] items-center'>{data.name}</p>
      <p className=' text-base text-textColor w-275 min-w-[160px] items-center'>{data.email}</p>
      <p className=' text-base text-textColor w-275 min-w-[160px] items-center'>{data.emailVerified ? 'true':"false"}</p>
      <p className=' text-base text-textColor w-275 min-w-[160px] items-center'>{data.createdAt}</p>
      <p className=' text-base text-textColor w-275 min-w-[160px] items-center'>{data.role}</p>
    </motion.div>
  );
};

export default DashboardUser;
