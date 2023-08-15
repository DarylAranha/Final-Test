import { Schema, model } from "mongoose";

interface ISongs {
    songID: string,
    title: string,
    artist: string,
    studio: string[],
    album: string
    genre: string,
    duration: number,
    releaseDate: Date,
    label: string,
    trackNumber: number,
    isExplicit: boolean,
    rating: number,
    composer: string[],
    youtubeLink: string,
}

let songSchema = new Schema<ISongs>({
    songID: String,
    title: String,
    artist: String,
    studio: [String],
    album: String,
    genre: String,
    duration: Number,
    releaseDate: Date,
    label: String,
    trackNumber: Number,
    isExplicit: Boolean,
    rating: Number,
    composer: [String],
    youtubeLink: String,
});

let Song = model<ISongs>('Song', songSchema);

export default Song;