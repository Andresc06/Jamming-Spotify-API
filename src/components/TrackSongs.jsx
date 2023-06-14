import { useContext } from "react";
import { Button } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import SongsContext from '../context/songs_context';

export function TrackSongs({ songList }) {
    
    const {playlist, setPlaylist} = useContext(SongsContext);

    const clickHandler = (e) => {
        const id = e.target.value;
        let song = songList.filter(song => song.id === id);
        song = song[0];
        e.target.setAttribute('disabled', '')
        if(!playlist.find(elem => elem.id === song.id)) {
          return setPlaylist([...playlist, song]);
        };
    }

  return (
    <div className="tracks" id="results">
      {songList.map((song, idx) => (
        <Card key={idx}>
          <Card.Img variant="top" className='d-none d-lg-block d-xl-block d-xxl-block' src={song.album.images[1].url} />
          <Card.Body>
            <Card.Title>{song.name}</Card.Title>
            <Card.Text>
              {song.artists.map((artist) => `${artist.name}${' '}`)}
            </Card.Text>
          </Card.Body>
          <Button variant="success" className="pe-4 ps-4" onClick={clickHandler} key={idx} value={song.id}>+</Button>
        </Card>
      ))}
    </div>
  );
}
