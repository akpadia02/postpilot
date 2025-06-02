"use client";
import { Mail, MessageSquare, Home, Info, Linkedin, Instagram, LogOut } from 'lucide-react';
import React from 'react';

function Sidebar() {
  const menuList = [
    { name: "Home", link: "/", icon: <Home className='h-5 w-5' /> },
    // { name: "Know Us", link: "/about", icon: <Info className='h-5 w-5' /> },
    { name: "Email", link: "/email", icon: <Mail className='h-5 w-5' /> },
    { name: "WhatsApp", link: "/whatsapp", icon: <MessageSquare className='h-5 w-5' /> },
    { name: "LinkedIn", link: "/linkedin", icon: <Linkedin className='h-5 w-5' /> },
    { name: "Instagram", link: "/instagram", icon: <Instagram className='h-5 w-5' /> },
  ];

  return (
    <aside className='h-screen w-[70px] bg-white border-r shadow-sm flex flex-col items-center py-6'>
      {/* Logo */}
      <a href='/' className='mb-10'>
        <img src='/assets/postpilot.png' alt='logo' className='h-30 w-40 object-contain' />
      </a>

      {/* Menu */}
      <ul className='flex flex-col gap-6 flex-1'>
        {menuList.map((item, idx) => (
          <Tab key={idx} item={item} />
        ))}
      </ul>

      {/* Footer Avatar */}
      {/* <div className='mt-auto mb-4'>
        <img
          src='/assets/avatar.png'
          alt='User'
          className='h-10 w-10 rounded-full border'
        />
      </div> */}
    </aside>
  );
}

export default Sidebar;

function Tab({ item }) {
  return (
    <a href={item.link} className='group relative flex items-center justify-center'>
      <li className='w-10 h-10 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-all'>
        {item.icon}
        {/* Tooltip */}
        <span className='absolute left-full ml-2 opacity-0 group-hover:opacity-100 whitespace-nowrap bg-black text-white text-xs px-2 py-1 rounded-md transition-opacity z-10'>
          {item.name}
        </span>
      </li>
    </a>
  );
}
