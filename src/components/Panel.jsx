import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import spotifyLogo from '../assets/images/spotify.png'

export function Panel() {

    return (
    <>
    <Navbar bg="dark" variant="dark">
        <Container className="justify-content-center gap-3">
            <img 
            src={spotifyLogo}
            alt='spotify-logo'
            width='50'
            height='50'
            />
            <h1 className='text-light fst-italic'>Spotify Jammming</h1>
        </Container>
      </Navbar>
    </>
    )
}