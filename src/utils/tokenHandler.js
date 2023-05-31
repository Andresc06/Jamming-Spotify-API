import config from '../config/config';
import { Buffer } from 'buffer';

const getToken = async () => {

    try {
        const data = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `Basic ` + Buffer.from(config.CLIENT_KEY + ":" + config.CLIENT_SECRET_KEY).toString('base64'),
            },
            body: 'grant_type=client_credentials',
        })
        const response = await data.json();
        return response.access_token;
    }

    catch (error) {
        console.log(error);
    }
   
}

const getQueryResult = async (token, query) => {
    
    try {
        const data = await fetch(`https://api.spotify.com/v1/search?q=${query}&type=track`, {
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

export { getToken, getQueryResult };