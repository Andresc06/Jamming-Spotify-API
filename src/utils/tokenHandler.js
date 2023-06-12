import config from '../config/config';

// OLD TOKEN HANDLER

//import { Buffer } from 'buffer';

// const getToken = async () => {

//     try {
//         const data = await fetch('https://accounts.spotify.com/api/token', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/x-www-form-urlencoded',
//                 'Authorization': `Basic ` + Buffer.from(config.CLIENT_KEY + ":" + config.CLIENT_SECRET_KEY).toString('base64'),
//             },
//             body: 'grant_type=client_credentials',
//         })
//         const response = await data.json();
//         console.log(response);
//         return response.access_token;
//     }

//     catch (error) {
//         console.log(error);
//     }
   
// }

const getPlaylists = async (token) => {

    try {
        const data = await fetch(`https://api.spotify.com/v1/users/${config.USER_ID}/playlists`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        })
        const response = await data.json();
        return response;
    }

    catch (error) {
        console.log(error);
    }
}

const updatePlaylist = async (token, playlist_id, newName) => {

    try {
        const data = await fetch(`https://api.spotify.com/v1/playlists/${playlist_id}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "name": newName
            }),
            json : true,
        })
        return data;
    }

    catch (error) {
        console.log(error);
    }
}

const getQueryResult = async (token, query) => {
    
    try {
        const data = await fetch(`https://api.spotify.com/v1/search?q=${query}&type=track&limit=8`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        })
        const response = await data.json();
        return response;
    }

    catch (error) {
        console.log(error);
    }
}

const createPlaylist = async (token, name) => {
    
    try {
        const data = await fetch(`https://api.spotify.com/v1/users/${config.USER_ID}/playlists`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "name": name,
                "description": "A playlist created by Spotify Jammming App",
                "public": "true"
            }),
            json : true,
        })
        const response = await data.json();
        return response;
    }

    catch (error) {
        console.log(error);
    }
}

const addPlaylist = async (token, playlist_id, playlist) => {
    
    try {

        let uris = [];
        playlist.map(track => uris.push(track.uri));
        const data = await fetch(`https://api.spotify.com/v1/playlists/${playlist_id}/tracks`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "uris": uris
            }),
            json : true,
        })
        const response = await data.json();
        return response;
    }

    catch (error) {
        console.log(error);
    }
}

export { getQueryResult, createPlaylist, updatePlaylist, getPlaylists, addPlaylist };