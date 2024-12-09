const clientId = 'da0ee0c0dbb1477fa53bc3c7917abba7';  // Client ID Anda
const clientSecret = '72710582128b4e3bb939544ee8296db1';  // Client Secret Anda

// Fungsi untuk mendapatkan token akses
async function getToken() {
    const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + btoa(`${clientId}:${clientSecret}`)
        },
        body: 'grant_type=client_credentials'
    });

    const data = await response.json();
    return data.access_token;
}

// Fungsi untuk mendapatkan playlist
async function getPlaylist(accessToken, playlistId) {
    const response = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}`, {
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    });

    const data = await response.json();
    return data;
}

// Fungsi untuk menampilkan playlist
async function displayPlaylist() {
    const accessToken = await getToken();
    const playlistId = '7CgGEdj6CZ5qZFL6X1C7J9'; // Ganti dengan playlist ID Anda
    const playlist = await getPlaylist(accessToken, playlistId);

    const container = document.getElementById('playlist-container');
    container.innerHTML = `
        <div class="card">
            <img src="${playlist.images[0]?.url}" alt="${playlist.name}">
            <h3>${playlist.name}</h3>
            <p>${playlist.description || 'Deskripsi tidak tersedia'}</p>
            <a href="${playlist.external_urls.spotify}" target="_blank">Dengarkan di Spotify</a>
        </div>
    `;
}

// Panggil fungsi untuk menampilkan playlist
displayPlaylist();
