"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteSong = exports.UpdateSong = exports.AddSong = exports.DisplaySongByID = exports.DisplaySongList = void 0;
const song_1 = __importDefault(require("../Models/song"));
function SanitizeArray(unsanitizedArry) {
    let sanizitedArray = Array();
    for (const unsanitizedString of unsanitizedArry) {
        sanizitedArray.push(unsanitizedString.trim());
    }
    return sanizitedArray;
}
function DisplaySongList(req, res, next) {
    song_1.default.find({})
        .then(function (data) {
        res.status(200).json(data);
    })
        .catch(function (err) {
        console.log(err);
    });
}
exports.DisplaySongList = DisplaySongList;
function DisplaySongByID(req, res, next) {
    let id = req.params.id;
    song_1.default.findById({ _id: id })
        .then(function (data) {
        res.status(200).json(data);
    })
        .catch(function (err) {
        console.error(err);
    });
}
exports.DisplaySongByID = DisplaySongByID;
function AddSong(req, res, next) {
    let studio = SanitizeArray(req.body.studio.split(","));
    let composer = SanitizeArray(req.body.composer.split(","));
    let song = new song_1.default({
        songID: req.body.songID,
        title: req.body.title,
        artist: req.body.artist,
        studio: studio,
        album: req.body.album,
        genre: req.body.genre,
        duration: req.body.duration,
        releaseDate: new Date(req.body.releaseDate),
        label: req.body.label,
        trackNumber: req.body.trackNumber,
        isExplicit: req.body.isExplicit,
        rating: req.body.rating,
        composer: composer,
        youtubeLink: req.body.youtubeLink,
    });
    song_1.default.create(song)
        .then(function (data) {
        res.json(song);
    })
        .catch(function (err) {
        console.error(err);
    });
}
exports.AddSong = AddSong;
function UpdateSong(req, res, next) {
    let id = req.params.id;
    let studio = SanitizeArray(req.body.studio.split(","));
    let composer = SanitizeArray(req.body.composer.split(","));
    let songToUpdate = new song_1.default({
        _id: id,
        songID: req.body.songID,
        title: req.body.title,
        artist: req.body.artist,
        studio: studio,
        album: req.body.album,
        genre: req.body.genre,
        duration: req.body.duration,
        releaseDate: new Date(req.body.releaseDate),
        label: req.body.label,
        trackNumber: req.body.trackNumber,
        isExplicit: req.body.isExplicit,
        rating: req.body.rating,
        composer: composer,
        youtubeLink: req.body.youtubeLink,
    });
    song_1.default.updateOne({ _id: id }, songToUpdate)
        .then(function (data) {
        res.json(songToUpdate);
    })
        .catch(function (err) {
        console.error(err);
    });
}
exports.UpdateSong = UpdateSong;
function DeleteSong(req, res, next) {
    let id = req.params.id;
    song_1.default.deleteOne({ _id: id })
        .then(function (data) {
        res.json(id);
    })
        .catch(function (err) {
        console.error(err);
    });
}
exports.DeleteSong = DeleteSong;
//# sourceMappingURL=song.js.map