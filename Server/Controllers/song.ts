import { Request, Response, NextFunction } from "express";

import Song from '../Models/song';


/**
 * File: Controllers/songs.ts 
 * Author: Daryl Aranha
 * ID: 200498080
 * Date: June 21, 2023
 * 
 * Sanitizes the string by splitting it into array of strings
 * @param  {[string]} unsanitizedArry String seperated with comma
 * 
 * @returns {[string]}  Returns Array of stings
 * 
 */
function SanitizeArray (unsanitizedArry: string[]): string[] {
    
    let sanizitedArray: string[] = Array<string>()
    for (const unsanitizedString of unsanitizedArry) {
        sanizitedArray.push(unsanitizedString.trim())
    }

    return sanizitedArray;
}

/**
 * File: Controllers/songs.ts 
 * Author: Daryl Aranha
 * ID: 200498080
 * Date: June 21, 2023
 * 
 * Find list of all songs in the database
 * @param  {[Request]} req Contains request parameters
 * @param  {[Response]} res Contains response parameter
 * @param  {[NextFunction]} next Contains middleware functionality
 * 
 */
export function DisplaySongList(req: Request, res: Response, next: NextFunction) {
    
    Song.find({})
        .then(function (data) {
            res.status(200).json(data)
        })
        .catch(function (err) {
            console.log(err)
        })
}

/**
 * File: Controllers/songs.ts 
 * Author: Daryl Aranha
 * ID: 200498080
 * Date: June 21, 2023
 * 
 * Finds the songs based on song ID
 * @param  {[Request]} req Contains request parameters
 * @param  {[Response]} res Contains response parameter
 * @param  {[NextFunction]} next Contains middleware functionality
 * 
 */
export function DisplaySongByID(req: Request, res: Response, next: NextFunction) {
    
    let id = req.params.id;
    Song.findById({_id: id})
        .then(function( data) {
            res.status(200).json(data)
        })
        .catch(function (err) {
            console.error(err);
        })
}


/**
 * File: Controllers/songs.ts 
 * Author: Daryl Aranha
 * ID: 200498080
 * Date: June 21, 2023
 * 
 * Adds new song to the database
 * @param  {[Request]} req Contains request parameters
 * @param  {[Response]} res Contains response parameter
 * @param  {[NextFunction]} next Contains middleware functionality
 * 
 */
export function AddSong(req: Request, res: Response, next: NextFunction) {

    let studio = SanitizeArray((req.body.studio as string).split(","));
    let composer = SanitizeArray((req.body.composer as string).split(","));

    let song = new Song({
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
    })

    Song.create(song)
        .then(function( data) {
            res.json(song);
        })
        .catch(function (err) {
            console.error(err);
        })
}

/**
 * File: Controllers/songs.ts 
 * Author: Daryl Aranha
 * ID: 200498080
 * Date: June 21, 2023
 * 
 * Updates the song based on song ID
 * @param  {[Request]} req Contains request parameters
 * @param  {[Response]} res Contains response parameter
 * @param  {[NextFunction]} next Contains middleware functionality
 * 
 */
export function UpdateSong(req: Request, res: Response, next: NextFunction) {

    let id = req.params.id;
    let studio = SanitizeArray((req.body.studio as string).split(","));
    let composer = SanitizeArray((req.body.composer as string).split(","));

    let songToUpdate = new Song({
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
    })

    Song.updateOne({_id: id}, songToUpdate)
        .then(function( data) {
            res.json(songToUpdate);
        })
        .catch(function (err) {
            console.error(err);
        })
}

/**
 * File: Controllers/songs.ts 
 * Author: Daryl Aranha
 * ID: 200498080
 * Date: June 21, 2023
 * 
 * Deletes the song based on song ID
 * @param  {[Request]} req Contains request parameters
 * @param  {[Response]} res Contains response parameter
 * @param  {[NextFunction]} next Contains middleware functionality
 * 
 */
export function DeleteSong(req: Request, res: Response, next: NextFunction) {

    let id = req.params.id;
    Song.deleteOne({_id: id})
        .then(function( data) {
            res.json(id);
        })
        .catch(function (err) {
            console.error(err);
        })
}