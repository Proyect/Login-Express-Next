'use client';
import Link from 'next/link';

function Nav() {
    return (
      <nav className=''>        
          <ul className='nav justify-content-end'>
            <li className='nav-item'>
              <Link className='nav-link' href="/">Inicio</Link>
            </li>
            <li className='nav-item'>
              <Link className='nav-link' href="Login">Login</Link>
            </li>
            <li className='nav-item'>
              <Link className='nav-link' href="Register">Register</Link>
            </li>
            <li className='nav-item'>
              <Link className='nav-link' href="Users">Users</Link>
            </li>
          </ul>         
      </nav>
    );
  }
  
  export default Nav;