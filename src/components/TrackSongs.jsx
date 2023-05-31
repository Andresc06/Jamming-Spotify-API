import { Button } from "react-bootstrap";
import Card from "react-bootstrap/Card";

export function TrackSongs({ songList }) {
    
  return (
    <div className="tracks">
      {songList.map((song) => (
        <Card>
          <Card.Img variant="top" src={song.album.images[1].url} />
          <Card.Body>
            <Card.Title>{song.name}</Card.Title>
            <Card.Text>
              {song.artists.map((artist) => `${artist.name}${' '}`)}
            </Card.Text>
          </Card.Body>
          <Button variant="success">Add</Button>
        </Card>
      ))}
    </div>
  );
}
