import React from 'react'

const DashboardSongs = () => {
  return (
    <div>DashboardSongs</div>
  )
}

export default DashboardSongs

// {allUsers && allUsers?.map((data,idx)=>(
//   <div className='w-full min-w-[750px] flex items-center justify-between' key={idx}>
//   <p className='text-sm font-semibold text-textColor w-275 min-w-[160px] text-center'><img src={data.imageUrl} alt=''/></p>
//   <p className='text-sm font-semibold text-textColor w-275 min-w-[160px] text-center'>{data.name}</p>
//   <p className='text-sm font-semibold text-textColor w-275 min-w-[160px] text-center'>{data.email}</p>
//   <p className='text-sm font-semibold text-textColor w-275 min-w-[160px] text-center'>{data.emailVerified}</p>
//   <p className='text-sm font-semibold text-textColor w-275 min-w-[160px] text-center'>{data.createdAt}</p>
//   <p className='text-sm font-semibold text-textColor w-275 min-w-[160px] text-center'>{data.role}</p>
//   </div>
//   ))}

export const DashboardUserCard = ({ data, idx }) => {
  console.log(data,idx)
  return (
    <motion.div className="relative w-full rounded-md flex items-center justify-between py-4 bg-lightOverlay cursor-pointer hover:bg-card hover:shadow-md">
      {/*user Image*/}
      <div className="w-275 min-w-[160px] flex items-center justify-center">
      <img src={data.user.imageUrl} alt="" className='w-10 h-10 object-cover rounded-md min-w-[40px] shadow-md'/>
      </div>
    </motion.div>
  );
};