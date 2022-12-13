import React from 'react';
import { IProps } from '../interface';

const SongDetail = ({ currentSong }: IProps): JSX.Element => {
  return (
    <div className='song-container'>
      <img src={currentSong.cover} alt={currentSong.artist} />
      <h2>{currentSong.name}</h2>
      <h3>{currentSong.artist}</h3>
    </div>
  );
};

export default SongDetail;
