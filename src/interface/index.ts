export interface ISong {
  name: string;
  cover: string;
  artist: string;
  audio: string;
  color: string[];
  id: string;
  active: boolean;
}

export interface IProps {
  currentSong: ISong;
}

export interface ITheme
{
  darkMode: any,
  setDarkMode: React.Dispatch<React.SetStateAction<any>>;
  currentSong: ISong;
}

export interface ISongProps {
  song: ISong;
  songs: ISong[];
  isPlaying: boolean;
  audioRef: React.RefObject<HTMLAudioElement>;
  setSongs: React.Dispatch<React.SetStateAction<ISong[]>>;
  setCurrentSong: React.Dispatch<React.SetStateAction<ISong>>;
}

export interface ILibraryProps {
  songs: ISong[];
  isPlaying: boolean;
  libraryStatus: boolean;
  audioRef: React.RefObject<HTMLAudioElement>;
  setSongs: React.Dispatch<React.SetStateAction<ISong[]>>;
  setCurrentSong: React.Dispatch<React.SetStateAction<ISong>>;
}

export interface ISongInfo {
  currentTime: number | string;
  duration: number | string;
  animationPercentage: number | string;
  value?: HTMLAudioElement;
}

export interface IPlayer {
  audioRef: React.RefObject<HTMLAudioElement>;
  songs: ISong[];
  currentSong: ISong;
  songInfo: ISongInfo;
  isPlaying: boolean;
  setSongs: React.Dispatch<React.SetStateAction<ISong[]>>;
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  setSongInfo: React.Dispatch<React.SetStateAction<ISongInfo>>;
  setCurrentSong: React.Dispatch<React.SetStateAction<ISong>>;
}

export interface INavProps {
  libraryStatus: boolean;
  setLibraryStatus: React.Dispatch<React.SetStateAction<boolean>>;
}
