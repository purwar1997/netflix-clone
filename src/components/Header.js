import { Link } from 'react-router-dom';
import logo from '../assets/netflix-logo.png';

const Header = () => {
  return (
    <header>
      <div className='absolute left-0 top-0 px-8 py-6'>
        <Link to='/'>
          <img className='w-40' src={logo} alt='netflix-logo' />
        </Link>
      </div>
    </header>
  );
};

export default Header;
