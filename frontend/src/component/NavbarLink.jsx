import React, { memo } from 'react'
import { Link } from 'react-router'

 function NavbarLink({link, title}) {
  return (
    <Link to={link} className="transition-all duration-300 rounded-md hover:text-gray-500">{title}</Link>
  )
}
export default memo(NavbarLink)