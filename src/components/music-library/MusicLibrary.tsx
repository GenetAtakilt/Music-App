import { ILibraryProps } from "../../interface";
import MusicLibraryCard from "./MusicLibraryCard";

const MusicLibrary = ({
    songs,
    setSongs,
    setCurrentSong,
    libraryStatus,
    isPlaying,
    audioRef,
  }: ILibraryProps): JSX.Element => {
    return (
      <div className={`library ${libraryStatus ? "active-library" : ""}`}>
        <h2>Music Library</h2>
        <div className="library-songs">
          {songs.map((song) => (
            <MusicLibraryCard
              key={song.id}
              songs={songs}
              song={song}
              audioRef={audioRef}
              isPlaying={isPlaying}
              setSongs={setSongs}
              setCurrentSong={setCurrentSong}
            />
          ))}
        </div>
      </div>
    );

  }


  export default MusicLibrary;