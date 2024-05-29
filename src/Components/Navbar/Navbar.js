import './Navbar.css';

// Navbar.js
import { Link } from 'react-router-dom';

const Navbar = () => {
    return(
        <nav>
            <ul>
                <li>
                    <Link to={'/'}> Homepage </Link>
                </li>
                <li>
                    <Link to={'/projectlist'}> ProjectList </Link>
                </li>
                <li>
                    <Link to={'/tasklist'}> TaskList</Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
