import { Button, Card, Form } from "react-bootstrap";
import SongsContext from "../context/songs_context";
import { useContext } from "react";
import { addPlaylist, createPlaylist } from '../utils/tokenHandler';

export function Playlist({ playlist, token, songList }) {
  const { setPlaylist } = useContext(SongsContext);

  const clickHandler = (e) => {
    const index = e.target.value;
    const selectedSong = playlist[index];
    setPlaylist((current) =>
      current.filter((song) => song.id !== selectedSong.id)
    );
    songList.push(selectedSong);
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    const title = e.target[0].value;
    if(title === '') return alert('Please enter a title for your playlist');
    const newPlaylist = await createPlaylist(token, title);
    const response = await addPlaylist(token, newPlaylist.id, playlist);
    setPlaylist([]);
    return response;
  }

  return (
    <div className="tracks">
        <Form className="d-flex list-name" onSubmit={onSubmitHandler}>
            <Form.Control
              type="text"
              placeholder="Title of Playlist"
              className="me-2"
              required
            />
            <Button variant="primary" type='submit'>Add Playlist</Button>
        </Form>
      {playlist.map((song, idx) => (
        <Card key={song.id}>
          <Card.Img variant="top" src={song.album.images[1].url} />
          <Card.Body>
            <Card.Title>{song.name}</Card.Title>
            <Card.Text>
              {song.artists.map((artist) => `${artist.name}${" "}`)}
            </Card.Text>
          </Card.Body>
          <Button variant="danger" onClick={clickHandler} value={idx}>
            Remove
          </Button>
        </Card>
      ))}
    </div>
  );
}
