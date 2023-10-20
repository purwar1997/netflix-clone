import { Link } from 'react-router-dom';
import logo from '../assets/netflix-logo.png';

const Header = () => {
  return (
    <header>
      <Link className='absolute left-8 top-6' to='/'>
        <img className='w-40' src={logo} alt='netflix-logo' />
      </Link>
    </header>
  );
};

export default Header;
