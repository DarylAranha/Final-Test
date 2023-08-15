"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
let router = express_1.default.Router();
const song_1 = require("../Controllers/song");
router.get('/list', function (req, res, next) {
    (0, song_1.DisplaySongList)(req, res, next);
});
router.get('/find/:id', function (req, res, next) {
    (0, song_1.DisplaySongByID)(req, res, next);
});
router.post('/add', function (req, res, next) {
    (0, song_1.AddSong)(req, res, next);
});
router.put('/update/:id', function (req, res, next) {
    (0, song_1.UpdateSong)(req, res, next);
});
router.delete('/delete/:id', function (req, res, next) {
    (0, song_1.DeleteSong)(req, res, next);
});
exports.default = router;
//# sourceMappingURL=index.js.map