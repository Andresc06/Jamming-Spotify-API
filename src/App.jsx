import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import SongsContext from './context/songs_context';
import { SearchBar } from './components/SearchBar';
import { Panel } from './components/Panel';
import { TrackSongs } from './components/TrackSongs';
import { Playlist } from './components/Playlist';
import config from './config/config';
import { UserPlaylist } from './components/UserPlaylist';
import { getPlaylists } from './utils/tokenHandler';

function App() {

  const [token, setToken] = useState('');
  const [songList, setSongList] = useState([]);
  const [playlist, setPlaylist] = useState([]);
  const [showUserPlaylist, setShowUserPlaylist] = useState(false);
  const [ownPlaylist, setownPlaylist] = useState([]);
  
  let state = '1234567890123456';
  let scope = 'user-read-private user-read-email playlist-modify-public'

  let url = `https://accounts.spotify.com/authorize?response_type=token&client_id=${config.CLIENT_KEY}`;
  url += `&scope=${scope}&redirect_uri=${'http://localhost:5173'}`;
  url += `&state=${state}`;

  useEffect(() => {

    const hash = window.location.hash
    let token = window.localStorage.getItem("token")

    if (!token && hash) {
        token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1]

        window.location.hash = ""
        window.localStorage.setItem("token", token)
    }

    setToken(token);

    const getPlaylist = async () => {
      const response = await getPlaylists(token);
      setownPlaylist(response.items);
    }

    getPlaylist();

  }, [showUserPlaylist]);

  

  const logout = () => {
    setToken("")
    window.localStorage.removeItem("token");
    setShowUserPlaylist(false);
  }

  const clickHandler = () => {
    if(token) setShowUserPlaylist(!showUserPlaylist);
    else alert('Please login to Spotify first');
  }

  return (
    <div className='background'>
      <Panel /> 
    <SongsContext.Provider value={{songList, setSongList, playlist, setPlaylist, setShowUserPlaylist, showUserPlaylist}}>
      <SearchBar token={token}/>
      <div className='buttons'>
      {!token ? <a href={url} className='login bg-success'>Login to Spotify</a> : <button className='logout' onClick={logout}>Logout</button>}
      </div>
      {token ? <div className='lists'>
      {songList.length ? <TrackSongs songList={songList}/> : null}
      {playlist.length ? <Playlist playlist={playlist} songList={songList} token={token}/>: null}
      </div>: null}
      <div className='lists'>
      {showUserPlaylist ? <div><UserPlaylist ownPlaylist={ownPlaylist} token={token}/><button className='login bg-danger m-3' onClick={()=>setShowUserPlaylist(!showUserPlaylist)}>Hide User's Playlists</button></div>
      : <button className='login bg-primary' onClick={clickHandler}>Show User's Playlists</button>}
      </div>
    </SongsContext.Provider>
    </div>
  )
}

export default App
