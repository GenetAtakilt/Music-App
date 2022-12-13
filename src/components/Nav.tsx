import { faMusic } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { INavProps } from '../interface';

const Nav = ({ libraryStatus, setLibraryStatus }: INavProps): JSX.Element => {
  return (
    <nav>
      <h1>Music App</h1>
      <button onClick={() => setLibraryStatus(!libraryStatus)}>
        Library
        <FontAwesomeIcon icon={faMusic} />
      </button>
    </nav>
  );
};

export default Nav;
