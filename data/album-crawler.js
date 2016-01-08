var SpotifyWebApi = require('spotify-web-api-node');

var artist_uri = process.argv[2] || '2QsynagSdAqZj3U9HgDzjD'; // bob marley

// credentials are optional
var spotifyApi = new SpotifyWebApi({
	clientId : '42607262dc5a42f3aad8b014eb6bf3b0',
	clientSecret : '4b19ed48605c4b558e8ab18c1ef7705f',
	redirectUri : 'http://www.example.com/callback'
});

spotifyApi.getArtistAlbums(artist_uri)
	.then(function(data) {
		data.body.items.map(function(item){
			console.log(item.href);
		});
	}, function(err) {
		console.error(err);
	});