"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteMusician = exports.UpdateMusician = exports.AddMusician = exports.DisplayMusicianByID = exports.DisplayMusicianList = exports.ProcessLogout = exports.ProcessLogin = exports.ProcessRegistration = void 0;
const passport_1 = __importDefault(require("passport"));
const mongoose_1 = __importDefault(require("mongoose"));
const user_1 = __importDefault(require("../Models/user"));
const musician_1 = __importDefault(require("../Models/musician"));
const index_1 = require("../Util/index");
function SanitizeArray(unsanitizedValue) {
    if (Array.isArray(unsanitizedValue)) {
        return unsanitizedValue.map((value) => value.trim());
    }
    else if (typeof unsanitizedValue === "string") {
        return unsanitizedValue.split(",").map((value) => value.trim());
    }
    else {
        return [];
    }
}
function ProcessRegistration(req, res, next) {
    let newUser = new user_1.default({
        username: req.body.username,
        emailAddress: req.body.EmailAddress,
        displayName: req.body.FirstName + " " + req.body.LastName,
    });
    user_1.default.register(newUser, req.body.password, (err) => {
        if (err instanceof mongoose_1.default.Error.ValidationError) {
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
        return res.json({ success: true, msg: "User Registered Successfully!" });
    });
}
exports.ProcessRegistration = ProcessRegistration;
function ProcessLogin(req, res, next) {
    passport_1.default.authenticate("local", (err, user, info) => {
        if (err) {
            console.error(err);
            return next(err);
        }
        if (!user) {
            return res.json({ success: false, msg: "ERROR: User Not Logged in." });
        }
        req.logIn(user, (err) => {
            if (err) {
                console.error(err);
                res.end(err);
            }
            const authToken = (0, index_1.GenerateToken)(user);
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
exports.ProcessLogin = ProcessLogin;
function ProcessLogout(req, res, next) {
    req.logout(() => {
        console.log("User Logged Out");
    });
    res.json({ success: true, msg: "User Logged out Successfully!" });
}
exports.ProcessLogout = ProcessLogout;
function DisplayMusicianList(req, res, next) {
    musician_1.default.find({})
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
exports.DisplayMusicianList = DisplayMusicianList;
function DisplayMusicianByID(req, res, next) {
    try {
        let id = req.params.id;
        musician_1.default.findById({ _id: id })
            .then(function (data) {
            if (data) {
                res.status(200).json({
                    success: true,
                    msg: "Musician Retrieved by ID Successfully",
                    data: data,
                });
            }
            else {
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
    }
    catch (err) {
        console.error(err);
        res
            .status(500)
            .json({ success: false, msg: "ERROR: Something Went Wrong", data: null });
    }
}
exports.DisplayMusicianByID = DisplayMusicianByID;
function AddMusician(req, res, next) {
    try {
        let genres = SanitizeArray(req.body.genres);
        let instruments = SanitizeArray(req.body.instruments);
        let labels = SanitizeArray(req.body.labels);
        let spouses = SanitizeArray(req.body.spouses);
        let children = SanitizeArray(req.body.children);
        let relatives = SanitizeArray(req.body.relatives);
        let notableWorks = SanitizeArray(req.body.notableWorks);
        let musician = new musician_1.default({
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
        musician_1.default.create(musician)
            .then(function () {
            res.status(200).json({
                success: true,
                msg: "Musician Added Successfully",
                data: musician,
            });
        })
            .catch(function (err) {
            console.error(err);
            if (err instanceof mongoose_1.default.Error.ValidationError) {
                res.status(400).json({
                    success: false,
                    msg: "ERROR: Musician Not Added. All Fields are required",
                    data: null,
                });
            }
            else {
                res.status(400).json({
                    success: false,
                    msg: "ERROR: Musician Not Added.",
                    data: null,
                });
            }
        });
    }
    catch (err) {
        console.error(err);
        res
            .status(500)
            .json({ success: false, msg: "Something Went Wrong", data: null });
    }
}
exports.AddMusician = AddMusician;
function UpdateMusician(req, res, next) {
    try {
        let id = req.params.id;
        let genres = SanitizeArray(req.body.genres);
        let instruments = SanitizeArray(req.body.instruments);
        let labels = SanitizeArray(req.body.labels);
        let spouses = SanitizeArray(req.body.spouses);
        let children = SanitizeArray(req.body.children);
        let relatives = SanitizeArray(req.body.relatives);
        let notableWorks = SanitizeArray(req.body.notableWorks);
        let musicianToUpdate = new musician_1.default({
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
        musician_1.default.updateOne({ _id: id }, musicianToUpdate)
            .then(function () {
            res.status(200).json({
                success: true,
                msg: "Musician Updated Successfully",
                data: musicianToUpdate,
            });
        })
            .catch(function (err) {
            console.error(err);
            if (err instanceof mongoose_1.default.Error.ValidationError) {
                res.status(400).json({
                    success: false,
                    msg: "ERROR: Musician Not Updated. All Fields are required",
                    data: null,
                });
            }
            else {
                res.status(400).json({
                    success: false,
                    msg: "ERROR: Musician Not Updated.",
                    data: null,
                });
            }
        });
    }
    catch (err) {
        console.error(err);
        res
            .status(500)
            .json({ success: false, msg: "Something Went Wrong", data: null });
    }
}
exports.UpdateMusician = UpdateMusician;
function DeleteMusician(req, res, next) {
    let id = req.params.id;
    musician_1.default.deleteOne({ _id: id })
        .then(function (data) {
        res.json(id);
    })
        .catch(function (err) {
        console.error(err);
    });
}
exports.DeleteMusician = DeleteMusician;
//# sourceMappingURL=musicians.js.map