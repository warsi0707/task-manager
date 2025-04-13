import React, { memo } from 'react'
import { Link } from 'react-router'

 function SideBarLink({link, title}) {
  return (
    <Link to={link}>
    <p className="w-full px-5 py-1 text-xl transition-all duration-300 hover:bg-gray-300">{title}</p>
    </Link>
  )
}
export default memo(SideBarLink)