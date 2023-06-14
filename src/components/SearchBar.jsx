import { useContext } from 'react';
import { getQueryResult } from '../utils/tokenHandler';
import SongsContext from '../context/songs_context';
import { Button, Form } from 'react-bootstrap';

export function SearchBar({token}) {

  const {setSongList} = useContext(SongsContext);

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        const query = e.target[0].value;
        if(!localStorage.getItem('token')) return alert('Please login to Spotify');
        const resultQuery = await getQueryResult(token, query);
        let list = resultQuery.tracks.items;
        setSongList(list);
    }


    return (
        <>
          <Form className="d-flex p-4 justify-content-center" onSubmit={onSubmitHandler}>
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2 search-bar"
              aria-label="Search"
            />
            <Button variant="primary search-btn" type='submit'>Search</Button>
          </Form>
        </>
    )

}