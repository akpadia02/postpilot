import {
  Mail,
  MessageSquare,
  Home,
  Linkedin,
  Instagram,
  Menu,
  X,
} from 'lucide-react';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Sidebar() {
  const [open, setOpen] = useState(false);

  const menuList = [
    { name: 'Home', link: '/hero', icon: <Home className='h-5 w-5' /> },
    { name: 'Email', link: '/email', icon: <Mail className='h-5 w-5' /> },
    { name: 'WhatsApp', link: '/whatsapp', icon: <MessageSquare className='h-5 w-5' /> },
    { name: 'LinkedIn', link: '/linkedin', icon: <Linkedin className='h-5 w-5' /> },
    { name: 'Instagram', link: '/instagram', icon: <Instagram className='h-5 w-5' /> },
  ];

  return (
    <>
      {/* Hamburger Menu Button */}
      <div className='md:hidden fixed top-4 left-4 z-50'>
        <button
          onClick={() => setOpen(!open)}
          className='p-2 bg-white rounded-md shadow-md'
        >
          {open ? <X className='h-6 w-6' /> : <Menu className='h-6 w-6' />}
        </button>
      </div>

      {/* Background Blur Overlay */}
      {open && (
        <div
          className="fixed inset-0 z-30 bg-black/0 backdrop-blur-sm md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`h-screen w-[70px] bg-white border-r shadow-sm flex flex-col items-center py-6
        fixed top-0 left-0 z-40 transition-transform duration-300
        md:translate-x-0 md:static
        ${open ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}
      >
        {/* Logo */}
        <a href='/' className='mb-10'>
          <img
            src='/assets/postpilot.png'
            alt='logo'
            className='h-30 w-40 object-contain'
          />
        </a>

        {/* Menu */}
        <ul className='flex flex-col gap-6 flex-1'>
          {menuList.map((item, idx) => (
            <Tab key={idx} item={item} />
          ))}
        </ul>
      </aside>
    </>
  );
}

export default Sidebar;

function Tab({ item }) {
  return (
    <Link to={item.link} className='group relative flex items-center justify-center'>
      <li className='w-10 h-10 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-all'>
        {item.icon}
        {/* Tooltip */}
        {/* <span className='absolute left-full ml-2 opacity-0 group-hover:opacity-100 whitespace-nowrap bg-black text-white text-xs px-2 py-1 rounded-md transition-opacity z-10'>
          {item.name}
        </span> */}
      </li>
    </Link>
  );
}
