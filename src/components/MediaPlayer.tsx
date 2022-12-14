import React,{useState} from 'react';
import {
  faPlay,
  faPause,
  faAngleLeft,
  faAngleRight,
  faVolumeUp,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IPlayer, ISong } from '../interface';
import { Change } from '../types/Events';

const MediaPlayer = ({
  audioRef,
  isPlaying,
  setIsPlaying,
  setSongs,
  songs,
  songInfo,
  setSongInfo,
  currentSong,
  setCurrentSong,

}: IPlayer): JSX.Element => {

  const [volume, setVolume] = useState(0.8);
  const activeLibraryHandler = (nextPrev: ISong): void => {
    const newSongs = songs.map(songData => {
      if (songData.id === nextPrev.id) {
        return {
          ...songData,
          active: true,
        };
      } else {
        return {
          ...songData,
          active: false,
        };
      }
    });

    setSongs(newSongs);
  };

  const TrackPlayHandler = (): void => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(!isPlaying);
      } else {
        audioRef.current.play();
        setIsPlaying(!isPlaying);
      }
    }
  };

 
const formatTime = (time: number): string => {
    return Math.floor(time / 60) + ':' + ('0' + Math.floor(time % 60)).slice(-2);
};

const dragHandler = (e: Change): void => {
    if (audioRef.current) {
      audioRef.current.currentTime = Number(e.target.value);
      setSongInfo({ ...songInfo, currentTime: e.target.value });
    }
  };

const skipTrackHandler = async (direction: string): Promise<void> => {
  const currentIndex = songs.findIndex((song) => song.id === currentSong.id);
  if (direction === "next") {
    await setCurrentSong(songs[(currentIndex + 1) % songs.length]);
    activeLibraryHandler(songs[(currentIndex + 1) % songs.length]);
  }
  if (direction === "prev") {
    if ((currentIndex - 1) % songs.length === -1) {
      await setCurrentSong(songs[songs.length - 1]);
      activeLibraryHandler(songs[songs.length - 1]);

      if (isPlaying && audioRef.current) audioRef.current.play();
      return;
    }
    await setCurrentSong(songs[(currentIndex - 1) % songs.length]);
    activeLibraryHandler(songs[(currentIndex - 1) % songs.length]);
  }
  if (isPlaying && audioRef.current) audioRef.current.play();
};

  


  const trackAnim = {
    transform: `translate(${songInfo.animationPercentage}%)`,
  };

  const volumeHandler = (e:any) => {
    if( audioRef.current != null)
    {
      audioRef.current.volume = e
      setVolume(e);
    }
  
  };

  return (
    <div className='player'>
      <div className='time-control'>
        <p>{formatTime(songInfo.currentTime as number)}</p>
        <div
          style={{
            background: `linear-gradient(to right, ${currentSong.color[0]}, ${currentSong.color[1]})`,
          }}
          className='track'
        >
          <input
            min={0}
            max={songInfo.duration.toString()}
            type='range'
            onChange={dragHandler}
          />
          <div style={trackAnim} className='animate-track'></div>
        </div>
        <p>
          {songInfo.duration ? formatTime(songInfo.duration as number) : '0:00'}
        </p>
      </div>
      <div className='play-control'>
        <FontAwesomeIcon
          className='skip-back'
          size='2x'
          icon={faAngleLeft}
          onClick={() => skipTrackHandler('prev')}
        />
        <FontAwesomeIcon
          role='button'
          className='play'
          size='2x'
          icon={isPlaying ? faPause : faPlay}
          onClick={TrackPlayHandler}
        />
        <FontAwesomeIcon
          className='skip-forward'
          size='2x'
          icon={faAngleRight}
          onClick={() => skipTrackHandler('next')}
        />
      </div>

      <div className="volume-control">
          <FontAwesomeIcon style={{marginRight: "10px"}}  icon={faVolumeUp} size="2x" />
          <input
            value={Math.round(volume * 100)}
            type="range"
            onChange={(e:any) => volumeHandler(e.target.value / 100)}
          />
        </div>
    </div>
  
  );
};

export default MediaPlayer;
