"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
let songSchema = new mongoose_1.Schema({
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
let Song = (0, mongoose_1.model)('Song', songSchema);
exports.default = Song;
//# sourceMappingURL=song.js.map