import Link from 'next/link';

function Nav() {
    return (
      <nav className='navbar navbar-expand-lg navbar-light bg-light'>
        <ul className='ml-10 hidden items-center gap-8 lg:flex'>
          <li>
            <Link href="/">Inicio</Link>
          </li>
          <li>
            <Link href="Login">Login</Link>
          </li>
          <li>
            <Link href="Register">Register</Link>
          </li>
          <li>
            <Link href="Users">Users</Link>
          </li>
        </ul>
      </nav>
    );
  }
  
  export default Nav;