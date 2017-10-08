'use strict';
const ytdl = require('ytdl-core');

/*
An object representing a song.
*/
class Song {
    constructor(title, url, type) {
        this.title = title;
        this.url = url;
        this.type = type; //youtube, soundcloud, search
    }

    getStream() {
        if (this.type == 'search')
            return this.url;
        if (this.type == 'youtube') {
            return ytdl(this.url, {
                retries: 7,
                highWaterMark: 32768,
                filter: 'audioonly'
            });
        }
        if (this.type == 'soundcloud')
            return null; //need api key.
    }
}

module.exports = Song;
