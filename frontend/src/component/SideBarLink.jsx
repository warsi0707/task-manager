import React from 'react'
import { Link } from 'react-router'

export default function SideBarLink({link, title}) {
  return (
    <Link to={link}>
    <p className="w-full px-5 py-1 text-xl transition-all duration-300 hover:bg-gray-300">{title}</p>
    </Link>
  )
}
