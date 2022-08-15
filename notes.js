<li className='mx-5 text-lg'><NavLink to={'/home'} className={({isActive})=>isActive?isActiveStyles:isNotActiveStyles}>Home</NavLink></li>

export const isNotActiveStyles = "text-lg text-textColor  hover:text-headingColor duration:100 transition:all ease-in-out "