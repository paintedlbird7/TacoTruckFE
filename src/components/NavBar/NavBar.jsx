// src/components/NavBar/NavBar.jsx
import { useContext } from 'react';
import { Link } from 'react-router';

import { UserContext } from '../../contexts/UserContext';
import styles from './NavBar.module.css';
import Logo from '../../assets/images/logo.png';  //for logo


const NavBar = () => {
  const { user, setUser } = useContext(UserContext);

  const handleSignOut = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

return (
  <nav className={styles.container}>
  <Link to='/'><img src={Logo} alt='RP Logo' /></Link>

    {user ? (
      <ul>
        <li><Link to='/'>HOME</Link></li>
        <li><Link to='/tacotrucks'>TACO TRUCKS</Link></li>
        <li><Link to='/tacotrucks/new'>NEW TACO TRUCK</Link></li>
        <li><Link to='/' onClick={handleSignOut}>Sign Out</Link></li>
      </ul>
    ) : (
      <ul>
        <li><Link to='/'>HOME</Link></li>
        <li><Link to='/sign-in'>SIGN IN</Link></li>
        <li><Link to='/sign-up'>SIGN UP</Link></li>
      </ul>
    )}
  </nav>
);
};
export default NavBar;
