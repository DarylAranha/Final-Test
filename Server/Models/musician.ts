import { Schema, model } from "mongoose";

interface IMusician {
  music_id: number;
  fullName: string;
  genres: string[];
  instruments: string[];
  labels: string[];
  born: string;
  yearsActive: string;
  spouses?: string[];
  children?: string[];
  relatives?: string[];
  notableWorks: string[];
  imageURL: string;
}

const musicianSchema = new Schema<IMusician>({
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

const Musician = model<IMusician>("Musician", musicianSchema);

export default Musician;
