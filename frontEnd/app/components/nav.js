'use client';
import Link from 'next/link';

function Nav() {
    return (
      <nav className='nav justify-content-end'>        
          <ul className='ml-10 hidden items-center gap-8 lg:flex'>
            <li className='nav-item'>
              <Link href="/">Inicio</Link>
            </li>
            <li className='nav-item'>
              <Link href="Login">Login</Link>
            </li>
            <li className='nav-item'>
              <Link href="Register">Register</Link>
            </li>
            <li className='nav-item'>
              <Link href="User">Users</Link>
            </li>
          </ul>      
        
      </nav>
    );
  }
  
  export default Nav;