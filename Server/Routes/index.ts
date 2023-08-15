import express from "express";
let router = express.Router();
import passport from "passport";

import {
  DisplayMusicianList,
  DisplayMusicianByID,
  AddMusician,
  UpdateMusician,
  DeleteMusician,
  ProcessRegistration,
  ProcessLogin,
  ProcessLogout,
} from "../Controllers/musicians";

/**
 * File: Routes/index.ts
 * Author: Daryl Aranha
 * ID: 200498080
 * Date: August 15, 2023
 *
 * Register the user
 * @param  {[Request]} req Contains request parameters
 * @param  {[Response]} res Contains response parameter
 * @param  {[NextFunction]} next Contains middleware functionality
 *
 */
router.post("/register", (req, res, next) =>
  ProcessRegistration(req, res, next)
);

/**
 * File: Routes/index.ts
 * Author: Daryl Aranha
 * ID: 200498080
 * Date: August 15, 2023
 *
 * Login request
 * @param  {[Request]} req Contains request parameters
 * @param  {[Response]} res Contains response parameter
 * @param  {[NextFunction]} next Contains middleware functionality
 *
 */
router.post("/login", (req, res, next) => ProcessLogin(req, res, next));

/**
 * File: Routes/index.ts
 * Author: Daryl Aranha
 * ID: 200498080
 * Date: August 15, 2023
 *
 * Logout
 * @param  {[Request]} req Contains request parameters
 * @param  {[Response]} res Contains response parameter
 * @param  {[NextFunction]} next Contains middleware functionality
 *
 */
router.get("/logout", (req, res, next) => ProcessLogout(req, res, next));

/**
 * File: Routes/index.ts
 * Author: Daryl Aranha
 * ID: 200498080
 * Date: August 15, 2023
 *
 * Returns list of songs if route matches /list
 * @param  {[Request]} req Contains request parameters
 * @param  {[Response]} res Contains response parameter
 * @param  {[NextFunction]} next Contains middleware functionality
 *
 */
router.get(
  "/list",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    DisplayMusicianList(req, res, next);
  }
);

/**
 * File: Routes/index.ts
 * Author: Daryl Aranha
 * ID: 200498080
 * Date: August 15, 2023
 *
 * Returns a specific songs if route matches /find/:id (:id is song ID)
 * @param  {[Request]} req Contains request parameters
 * @param  {[Response]} res Contains response parameter
 * @param  {[NextFunction]} next Contains middleware functionality
 *
 */
router.get(
  "/find/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    DisplayMusicianByID(req, res, next);
  }
);

/**
 * File: Routes/index.ts
 * Author: Daryl Aranha
 * ID: 200498080
 * Date: August 15, 2023
 *
 * Adds a songs if route matches /add
 * @param  {[Request]} req Contains request parameters
 * @param  {[Response]} res Contains response parameter
 * @param  {[NextFunction]} next Contains middleware functionality
 *
 */
router.post(
  "/add",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    AddMusician(req, res, next);
  }
);

/**
 * File: Routes/index.ts
 * Author: Daryl Aranha
 * ID: 200498080
 * Date: August 15, 2023
 *
 * Updates a songs if route matches /update
 * @param  {[Request]} req Contains request parameters
 * @param  {[Response]} res Contains response parameter
 * @param  {[NextFunction]} next Contains middleware functionality
 *
 */
router.put(
  "/update/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    UpdateMusician(req, res, next);
  }
);

/**
 * File: Routes/index.ts
 * Author: Daryl Aranha
 * ID: 200498080
 * Date: August 15, 2023
 *
 * Deletes a songs if route matches /delete/:id (:id is song ID)
 * @param  {[Request]} req Contains request parameters
 * @param  {[Response]} res Contains response parameter
 * @param  {[NextFunction]} next Contains middleware functionality
 *
 */
router.delete(
  "/delete/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    DeleteMusician(req, res, next);
  }
);
export default router;
