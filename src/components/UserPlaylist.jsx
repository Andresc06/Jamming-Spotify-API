import { Button, Form } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import { updatePlaylist } from "../utils/tokenHandler";

export function UserPlaylist({ token, ownPlaylist }) {

    const clickHandler = async (e) => {
      e.preventDefault();
      const index = e.target[1].value;
      const newName = e.target[0].value;
      await updatePlaylist(token, ownPlaylist[index].id, newName);
      return alert('Playlist name changed!');
    }

  return (
    <div className="tracks">
      {ownPlaylist.map((song, idx) => (
        <Card key={idx}>
            <Card.Img variant="top" className='d-none d-lg-block d-xl-block d-xxl-block' src={song.images[0].url} />
            <Form className="changeName" onSubmit={clickHandler}>
            <Card.Body>
                <Card.Title><Form.Control
                defaultValue={song.name}
            /></Card.Title>
            </Card.Body>
            
            <Button variant="warning search-btn" className='m-2' type='submit' value={idx}>Change Name</Button>
          </Form>
        </Card>
      ))}
    </div>
  );
}
