export default async (url, token) => {
    const res = await fetch(url, {
        method: 'GET',
        //This header will forward that jwt as a token to our backend.
        headers: new Headers({ 'Content-Type': 'application/json', token }),
        credentials: 'same-origin'
    });

    return res.json();

}