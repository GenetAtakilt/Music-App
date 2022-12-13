import { ISongProps } from "../../interface"


const MusicLibraryCard = ({
    song,
    songs,
    setSongs,
    setCurrentSong,
    audioRef,
    isPlaying,
  }: ISongProps): JSX.Element => 
  {
    const songSelectHandler = async (): Promise<void> => {
        const selectedSong = song;
        await setCurrentSong(selectedSong);

        const newSongs = songs.map(songData => {
          if (songData.id === song.id) {
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
    
        if (isPlaying && audioRef.current) audioRef.current.play();
      };
      
    return (
        <div
          className={`library-song ${song.active ? 'selected' : ''}`}
          onClick={songSelectHandler}
          onKeyPress={songSelectHandler}
        >
          <img src={song.cover} alt={song.artist} />
          <div className='song-description'>
            <h3>{song.name}</h3>
            <h4>{song.artist}</h4>
          </div>
        </div>
      );
  }

export default MusicLibraryCard;