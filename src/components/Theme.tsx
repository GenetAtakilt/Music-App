import React,{useEffect} from 'react';
import { ITheme } from '../interface';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';

const ThemeSelector = ({
    darkMode,
    setDarkMode,
    currentSong,
  }: ITheme): JSX.Element => {
    
    useEffect(() => {
        const mainContainer = document.body;
    
        if (darkMode === undefined) {
          setDarkMode(localStorage.LightTheme);
          mainContainer.style.backgroundImage = `linear-gradient(180deg, ${currentSong.color[0]}, ${currentSong.color[1]})`;
        }

        if (localStorage.LightTheme === 'light-mode') {
          setDarkMode(false);
          mainContainer.classList.remove('dark-mode-active');
          mainContainer.style.backgroundImage = `linear-gradient(180deg, ${currentSong.color[0]}, ${currentSong.color[1]})`;
        }
        if (localStorage.LightTheme === 'dark-mode') {
          setDarkMode(true);
          mainContainer.classList.add('dark-mode-active');
          mainContainer.style.backgroundImage = 'linear-gradient(#181818, #242424)';
        } else {
        }
      });
    
      const updateStorage = () => {
        if (darkMode === undefined) {
          localStorage.setItem('LightTheme', 'dark-mode');
          setDarkMode(true);
        }
        if (darkMode === true) {
          localStorage.setItem('LightTheme', 'light-mode');
          setDarkMode(false);
        }
        if (darkMode === false) {
          localStorage.setItem('LightTheme', 'dark-mode');
          setDarkMode(true);
        }
      };
    
      return (
        <div className={`dark-mode-container ${darkMode ? 'moon' : 'sun'}`}>
          <FontAwesomeIcon onClick={() => updateStorage()} icon={faSun} size='2x' />
          <FontAwesomeIcon onClick={() => updateStorage()} icon={faMoon} />
        </div>
      );

  }


  export default ThemeSelector;