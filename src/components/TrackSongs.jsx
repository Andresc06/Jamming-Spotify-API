import { useContext } from "react";
import { Button } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import SongsContext from '../context/songs_context';

export function TrackSongs({ songList }) {
    
    const {playlist, setPlaylist} = useContext(SongsContext);

    const clickHandler = (e) => {
        const index = e.target.value;
        const song = songList[index];
        if(!playlist.find(elem => elem.id === song.id)) {
          songList.splice(index, 1);
          return setPlaylist([...playlist, song]);
        };
    }

  return (
    <div className="tracks">
      {songList.map((song, idx) => (
        <Card key={idx}>
          <Card.Img variant="top" className='d-none d-lg-block d-xl-block d-xxl-block' src={song.album.images[1].url} />
          <Card.Body>
            <Card.Title>{song.name}</Card.Title>
            <Card.Text>
              {song.artists.map((artist) => `${artist.name}${' '}`)}
            </Card.Text>
          </Card.Body>
          <Button variant="success" onClick={clickHandler} key={idx} value={idx}>Add</Button>
        </Card>
      ))}
    </div>
  );
}
