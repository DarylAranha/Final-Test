import express from 'express';
let router = express.Router();

import { DisplaySongList, DisplaySongByID, AddSong, UpdateSong, DeleteSong } from '../Controllers/song';

/**
 * File: Routes/index.ts 
 * Author: Daryl Aranha
 * ID: 200498080
 * Date: June 21, 2023
 * 
 * Returns list of songs if route matches /list
 * @param  {[Request]} req Contains request parameters
 * @param  {[Response]} res Contains response parameter
 * @param  {[NextFunction]} next Contains middleware functionality
 * 
 */
router.get('/list', function (req, res, next) {
    DisplaySongList(req, res, next)
}) 

/**
 * File: Routes/index.ts 
 * Author: Daryl Aranha
 * ID: 200498080
 * Date: June 21, 2023
 * 
 * Returns a specific songs if route matches /find/:id (:id is song ID)
 * @param  {[Request]} req Contains request parameters
 * @param  {[Response]} res Contains response parameter
 * @param  {[NextFunction]} next Contains middleware functionality
 * 
 */
router.get('/find/:id', function (req, res, next) {
    DisplaySongByID(req, res, next);
})

/**
 * File: Routes/index.ts 
 * Author: Daryl Aranha
 * ID: 200498080
 * Date: June 21, 2023
 * 
 * Adds a songs if route matches /add
 * @param  {[Request]} req Contains request parameters
 * @param  {[Response]} res Contains response parameter
 * @param  {[NextFunction]} next Contains middleware functionality
 * 
 */
router.post('/add', function(req, res, next) {
    AddSong(req, res, next)
})

/**
 * File: Routes/index.ts 
 * Author: Daryl Aranha
 * ID: 200498080
 * Date: June 21, 2023
 * 
 * Updates a songs if route matches /update
 * @param  {[Request]} req Contains request parameters
 * @param  {[Response]} res Contains response parameter
 * @param  {[NextFunction]} next Contains middleware functionality
 * 
 */
router.put('/update/:id', function(req, res, next) {
    UpdateSong(req, res, next)
})

/**
 * File: Routes/index.ts 
 * Author: Daryl Aranha
 * ID: 200498080
 * Date: June 21, 2023
 * 
 * Deletes a songs if route matches /delete/:id (:id is song ID)
 * @param  {[Request]} req Contains request parameters
 * @param  {[Response]} res Contains response parameter
 * @param  {[NextFunction]} next Contains middleware functionality
 * 
 */
router.delete('/delete/:id', function(req, res, next) {
    DeleteSong(req, res, next)
})
export default router
