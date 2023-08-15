"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const musicianSchema = new mongoose_1.Schema({
    music_id: String,
    fullName: String,
    genres: [String],
    instruments: [String],
    labels: [String],
    born: String,
    yearsActive: String,
    spouses: [String],
    children: [String],
    relatives: [String],
    notableWorks: [String],
    imageURL: String,
});
const Musician = (0, mongoose_1.model)("Musician", musicianSchema);
exports.default = Musician;
//# sourceMappingURL=musician.js.map