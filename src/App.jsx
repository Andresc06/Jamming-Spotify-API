import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import SongsContext from './context/songs_context';
import { getToken } from './utils/tokenHandler';
import { SearchBar } from './components/SearchBar';
import { Panel } from './components/Panel';
import { TrackSongs } from './components/TrackSongs';
import { Playlist } from './components/Playlist';

function App() {

  const [token, setToken] = useState('');
  const [songList, setSongList] = useState([]);

  useEffect(() => {

    const getAll = async () => {
      const token = await getToken();
      setToken(token);
    }
    getAll();
  }, []);


  return (
    <>
      <Panel /> 
    <SongsContext.Provider value={{songList, setSongList}}>
      <SearchBar token={token}/>
      <div className='lists'>
      {songList.length ? <TrackSongs songList={songList}/> : null}
      <Playlist />
      </div>
    </SongsContext.Provider>
    </>
  )
}

export default App
