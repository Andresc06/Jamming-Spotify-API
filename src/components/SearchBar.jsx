import { useContext } from 'react';
import { getQueryResult } from '../utils/tokenHandler';
import SongsContext from '../context/songs_context';
import { Button, Form } from 'react-bootstrap';

export function SearchBar({token}) {

  const {setSongList} = useContext(SongsContext);

    const clickHandler = async (e) => {
        e.preventDefault();
        const query = e.target[0].value;
        const resultQuery = await getQueryResult(token, query);
        let list = resultQuery.tracks.items;
        setSongList(list);
    }

    return (
        <>
          <Form className="d-flex" onSubmit={clickHandler}>
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success" type='submit'>Search</Button>
          </Form>
        </>
    )

}