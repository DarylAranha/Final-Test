import { Request, Response, NextFunction } from "express";
import passport from "passport";
import mongoose from "mongoose";

import User from "../Models/user";
import Musician from "../Models/musician";
import { GenerateToken } from "../Util/index";

/**
 * File: Controllers/Musicians.ts
 * Author: Daryl Aranha
 * ID: 200498080
 * Date: August 15, 2023
 *
 * Sanitizes the string by splitting it into array of strings
 * @param  {[string]} unsanitizedArry String seperated with comma
 *
 * @returns {[string]}  Returns Array of stings
 *
 */
function SanitizeArray(unsanitizedValue: string | string[]): string[] {
  if (Array.isArray(unsanitizedValue)) {
    return unsanitizedValue.map((value) => value.trim());
  } else if (typeof unsanitizedValue === "string") {
    return unsanitizedValue.split(",").map((value) => value.trim());
  } else {
    return [];
  }
}

/**
 * File: Controllers/Musicians.ts
 * Author: Daryl Aranha
 * ID: 200498080
 * Date: August 15, 2023
 *
 * Process Sign up request
 * @param  {[Request]} req Contains request parameters
 * @param  {[Response]} res Contains response parameter
 * @param  {[NextFunction]} next Contains middleware functionality
 *
 */
export function ProcessRegistration(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  // instantiate a new user object
  let newUser = new User({
    username: req.body.username,
    emailAddress: req.body.EmailAddress,
    displayName: req.body.FirstName + " " + req.body.LastName,
  });

  User.register(newUser, req.body.password, (err) => {
    if (err instanceof mongoose.Error.ValidationError) {
      console.error("All Fields Are Required");
      return res.json({
        success: false,
        msg: "ERROR: User Not Registered. All Fields Are Required",
      });
    }

    if (err) {
      console.error("Error: Inserting New User");
      if (err.name == "UserExistsError") {
        console.error("Error: User Already Exists");
      }
      return res.json({
        success: false,
        msg: "User not Registered Successfully!",
      });
    }
    // if we had a front-end (Angular, React or a Mobile UI)...
    return res.json({ success: true, msg: "User Registered Successfully!" });
  });
}

/**
 * File: Controllers/Musicians.ts
 * Author: Daryl Aranha
 * ID: 200498080
 * Date: August 15, 2023
 *
 * Process Login request
 * @param  {[Request]} req Contains request parameters
 * @param  {[Response]} res Contains response parameter
 * @param  {[NextFunction]} next Contains middleware functionality
 *
 */
export function ProcessLogin(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  passport.authenticate("local", (err: any, user: any, info: any) => {
    // are there server errors?
    if (err) {
      console.error(err);
      return next(err);
    }

    // are the login errors?
    if (!user) {
      return res.json({ success: false, msg: "ERROR: User Not Logged in." });
    }

    req.logIn(user, (err) => {
      // are there db errors?
      if (err) {
        console.error(err);
        res.end(err);
      }

      const authToken = GenerateToken(user);

      return res.json({
        success: true,
        msg: "User Logged In Successfully!",
        user: {
          id: user._id,
          displayName: user.displayName,
          username: user.username,
          emailAddress: user.emailAddress,
        },
        token: authToken,
      });
    });
    return;
  })(req, res, next);
}

/**
 * File: Controllers/Musicians.ts
 * Author: Daryl Aranha
 * ID: 200498080
 * Date: August 15, 2023
 *
 * Process Logout request
 * @param  {[Request]} req Contains request parameters
 * @param  {[Response]} res Contains response parameter
 * @param  {[NextFunction]} next Contains middleware functionality
 *
 */
export function ProcessLogout(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  req.logout(() => {
    console.log("User Logged Out");
  });

  // if we had a front-end (Angular, React or Mobile UI)...
  res.json({ success: true, msg: "User Logged out Successfully!" });
}

/**
 * File: Controllers/Musicians.ts
 * Author: Daryl Aranha
 * ID: 200498080
 * Date: August 15, 2023
 *
 * Find list of all Musicians in the database
 * @param  {[Request]} req Contains request parameters
 * @param  {[Response]} res Contains response parameter
 * @param  {[NextFunction]} next Contains middleware functionality
 *
 */
export function DisplayMusicianList(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  Musician.find({})
    .then(function (data) {
      res.status(200).json({
        success: true,
        msg: "Musician List Displayed Successfully",
        data: data,
      });
    })
    .catch(function (err) {
      console.error(err);
      res.status(500).json({
        success: false,
        msg: "ERROR: Something Went Wrong",
        data: null,
      });
    });
}

/**
 * File: Controllers/Musicians.ts
 * Author: Daryl Aranha
 * ID: 200498080
 * Date: August 15, 2023
 *
 * Finds the Musicians based on Musician ID
 * @param  {[Request]} req Contains request parameters
 * @param  {[Response]} res Contains response parameter
 * @param  {[NextFunction]} next Contains middleware functionality
 *
 */
export function DisplayMusicianByID(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  try {
    let id = req.params.id;
    Musician.findById({ _id: id })
      .then(function (data) {
        if (data) {
          res.status(200).json({
            success: true,
            msg: "Musician Retrieved by ID Successfully",
            data: data,
          });
        } else {
          res
            .status(404)
            .json({ success: false, msg: "Musician ID Not Found", data: data });
        }
      })
      .catch(function (err) {
        console.error(err);
        res.status(400).json({
          success: false,
          msg: "ERROR: Musician ID not formatted correctly",
          data: null,
        });
      });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ success: false, msg: "ERROR: Something Went Wrong", data: null });
  }
}

/**
 * File: Controllers/Musicians.ts
 * Author: Daryl Aranha
 * ID: 200498080
 * Date: August 15, 2023
 *
 * Adds new Musician to the database
 * @param  {[Request]} req Contains request parameters
 * @param  {[Response]} res Contains response parameter
 * @param  {[NextFunction]} next Contains middleware functionality
 *
 */
export function AddMusician(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  try {
    let genres = SanitizeArray(req.body.genres);
    let instruments = SanitizeArray(req.body.instruments);
    let labels = SanitizeArray(req.body.labels);
    let spouses = SanitizeArray(req.body.spouses);
    let children = SanitizeArray(req.body.children);
    let relatives = SanitizeArray(req.body.relatives);
    let notableWorks = SanitizeArray(req.body.notableWorks);

    let musician = new Musician({
      music_id: req.body.music_id,
      fullName: req.body.fullName,
      genres: genres,
      instruments: instruments,
      labels: labels,
      born: req.body.born,
      yearsActive: req.body.yearsActive,
      spouses: spouses,
      children: children,
      relatives: relatives,
      notableWorks: notableWorks,
      imageURL: req.body.imageURL,
    });

    Musician.create(musician)
      .then(function () {
        res.status(200).json({
          success: true,
          msg: "Musician Added Successfully",
          data: musician,
        });
      })
      .catch(function (err) {
        console.error(err);
        if (err instanceof mongoose.Error.ValidationError) {
          res.status(400).json({
            success: false,
            msg: "ERROR: Musician Not Added. All Fields are required",
            data: null,
          });
        } else {
          res.status(400).json({
            success: false,
            msg: "ERROR: Musician Not Added.",
            data: null,
          });
        }
      });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ success: false, msg: "Something Went Wrong", data: null });
  }
}

/**
 * File: Controllers/Musicians.ts
 * Author: Daryl Aranha
 * ID: 200498080
 * Date: August 15, 2023
 *
 * Updates the Musician based on Musician ID
 * @param  {[Request]} req Contains request parameters
 * @param  {[Response]} res Contains response parameter
 * @param  {[NextFunction]} next Contains middleware functionality
 *
 */
export function UpdateMusician(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  try {
    let id = req.params.id;
    let genres = SanitizeArray(req.body.genres);
    let instruments = SanitizeArray(req.body.instruments);
    let labels = SanitizeArray(req.body.labels);
    let spouses = SanitizeArray(req.body.spouses);
    let children = SanitizeArray(req.body.children);
    let relatives = SanitizeArray(req.body.relatives);
    let notableWorks = SanitizeArray(req.body.notableWorks);

    let musicianToUpdate = new Musician({
      _id: id,
      music_id: req.body.music_id,
      fullName: req.body.fullName,
      genres: genres,
      instruments: instruments,
      labels: labels,
      born: req.body.born,
      yearsActive: req.body.yearsActive,
      spouses: spouses,
      children: children,
      relatives: relatives,
      notableWorks: notableWorks,
      imageURL: req.body.imageURL,
    });

    Musician.updateOne({ _id: id }, musicianToUpdate)
      .then(function () {
        res.status(200).json({
          success: true,
          msg: "Musician Updated Successfully",
          data: musicianToUpdate,
        });
      })
      .catch(function (err) {
        console.error(err);
        if (err instanceof mongoose.Error.ValidationError) {
          res.status(400).json({
            success: false,
            msg: "ERROR: Musician Not Updated. All Fields are required",
            data: null,
          });
        } else {
          res.status(400).json({
            success: false,
            msg: "ERROR: Musician Not Updated.",
            data: null,
          });
        }
      });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ success: false, msg: "Something Went Wrong", data: null });
  }
}

/**
 * File: Controllers/Musicians.ts
 * Author: Daryl Aranha
 * ID: 200498080
 * Date: August 15, 2023
 *
 * Deletes the Musician based on Musician ID
 * @param  {[Request]} req Contains request parameters
 * @param  {[Response]} res Contains response parameter
 * @param  {[NextFunction]} next Contains middleware functionality
 *
 */
export function DeleteMusician(
  req: Request,
  res: Response,
  next: NextFunction
) {
  let id = req.params.id;
  Musician.deleteOne({ _id: id })
    .then(function (data) {
      res.json(id);
    })
    .catch(function (err) {
      console.error(err);
    });
}
