'use strict';
const ytdl = require('ytdl-core');

/*
An object representing a song.
*/
class Song {
    constructor(title, url, type, authorname, time) {
        this.title = title;
        this.url = url;
        this.type = type; //youtube, soundcloud, search
	this.author = authorname;
	this.time = time;
    }

    getStream() {
        if (this.type == 'search')
            return this.url;
        if (this.type == 'youtube') {
            return ytdl(this.url, {
                retries: 7,
                highWaterMark: 32768
            });
        }
        if (this.type == 'soundcloud')
            return null; //need api key.
    }
}

module.exports = Song;
