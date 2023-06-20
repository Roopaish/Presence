import React from 'react'
import Icon from './Icon'
const Loading = () => {
  return (
    <div className="flex flex-col justify-center items-center absolute inset-0 z-50 bg-white">
            <header className="text-center mb-10">
              <Icon type="logo" className="w-24 h-24 mx-auto"></Icon>
              <h3 className="text-3xl font-bold">Welcome to Presence</h3>
            </header>
            <div className="h-12 w-12 rounded-full border-4 border-primary border-l-transparent animate-spin"></div>
          </div>
  )
}

export default Loading