import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const FULL_NAME = process.env.FULL_NAME;
const DOB_DDMMYYYY = process.env.DOB_DDMMYYYY;
const EMAIL = process.env.EMAIL;
const ROLL_NUMBER = process.env.ROLL_NUMBER;

const makeUserId = () =>
  `${FULL_NAME.toLowerCase().trim().replace(/\s+/g, "_")}_${DOB_DDMMYYYY}`;

const isIntegerString = (s) => /^[+-]?\d+$/.test(s);

function classify(data) {
  const out = {
    odd_numbers: [],
    even_numbers: [],
    alphabets: [],
    special_characters: [],
    sum: "0",
    concat_string: "",
  };
  let sum = 0n;
  const letters = [];

  for (const item of data) {
    const str = String(item);

    if (isIntegerString(str)) {
      const n = BigInt(str);
      (n % 2n === 0n ? out.even_numbers : out.odd_numbers).push(str);
      sum += n;
    } else {
      if (/^[A-Za-z]+$/.test(str)) {
        out.alphabets.push(str.toUpperCase());
      } else if (str.length === 1 && !/[A-Za-z0-9]/.test(str)) {
        out.special_characters.push(str);
      }
    }

    for (const ch of str) if (/[A-Za-z]/.test(ch)) letters.push(ch);
  }

  letters.reverse();
  out.concat_string = letters
    .map((ch, i) => (i % 2 === 0 ? ch.toUpperCase() : ch.toLowerCase()))
    .join("");
  out.sum = sum.toString();
  return out;
}

// this is now the root route for /api/bfhl
app.post("/", (req, res) => {
  const base = {
    is_success: false,
    user_id: makeUserId(),
    email: EMAIL,
    roll_number: ROLL_NUMBER,
    odd_numbers: [],
    even_numbers: [],
    alphabets: [],
    special_characters: [],
    sum: "0",
    concat_string: "",
  };

  if (!Array.isArray(req.body?.data)) {
    return res.status(200).json({ ...base, error: 'Invalid "data" field' });
  }

  const computed = classify(req.body.data);
  res.status(200).json({ ...base, ...computed, is_success: true });
});

// required for Vercel
export default app;
