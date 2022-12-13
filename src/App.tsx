import  { useState, useRef } from 'react';

import MusicLibrary from './components/music-library/MusicLibrary';
import { ISong, ISongInfo } from './interface';
import getSongs from './data';
import './styles/app.scss';
import { Update } from './types/Events';
import MediaPlayer from './components/MediaPlayer';
import SongDetail from './components/SongDetail';
import Nav from './components/Nav';
import ThemeSelector from './components/Theme';


function App() {
  const data = getSongs();
  const audioRef = useRef<HTMLAudioElement>(null);
  const [songs, setSongs] = useState<ISong[]>(data);
  const [currentSong, setCurrentSong] = useState(data[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [libraryStatus, setLibraryStatus] = useState(false);
  const [selectMode, setSelectMode] = useState();
  const [songInfo, setSongInfo] = useState<ISongInfo>({
    currentTime: 0,
    duration: 0,
    animationPercentage: 0,
  });



  const timeUpdateHandler = (e: Update): void => {

    const target = e.target as typeof e.target & ISongInfo;

    const current = target.currentTime;
    const duration = target.duration;

    const roundedCurrent = Math.round(current as number);
    const roundedDuration = Math.round(duration as number);
    const animation = Math.round((roundedCurrent / roundedDuration) * 100);

    setSongInfo({
      ...songInfo,
      currentTime: current,
      duration,
      animationPercentage: animation,
    });
  };

  const songEndHandler = async (): Promise<void> => {
    const currentIndex = songs.findIndex(song => song.id === currentSong.id);
    await setCurrentSong(songs[(currentIndex + 1) % songs.length]);
    if (isPlaying && audioRef.current) audioRef.current.play();
  };

 

  return (
    <div className={`app ${libraryStatus ? 'library-active' : ''}`}>
      <Nav libraryStatus={libraryStatus} setLibraryStatus={setLibraryStatus} />
      <SongDetail currentSong={currentSong} />
     <MusicLibrary
    audioRef={audioRef}
    songs={songs}
    setSongs={setSongs}
    setCurrentSong={setCurrentSong}
    isPlaying={isPlaying}
    libraryStatus={libraryStatus}
      />


<MediaPlayer
        audioRef={audioRef}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        songs={songs}
        setSongs={setSongs}
        currentSong={currentSong}
        songInfo={songInfo}
        setSongInfo={setSongInfo}
        setCurrentSong={setCurrentSong}
        />

<audio
        onTimeUpdate={timeUpdateHandler}
        onLoadedMetadata={timeUpdateHandler}
        ref={audioRef}
        src={currentSong.audio}
        onEnded={songEndHandler}
      ></audio>

<ThemeSelector
          darkMode={selectMode}
          setDarkMode={setSelectMode}
          currentSong={currentSong}
        />
    </div>
   
  );
}

export default App;
