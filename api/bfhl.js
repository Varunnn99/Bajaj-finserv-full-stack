// api/bfhl.js

export default function handler(req, res) {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method Not Allowed" });
    }
  
    const data = req.body?.data;
    if (!Array.isArray(data)) {
      return res.status(200).json({
        is_success: false,
        error: 'Invalid "data" field',
      });
    }
  
    const FULL_NAME = process.env.FULL_NAME || "varun xavier";
    const DOB_DDMMYYYY = process.env.DOB_DDMMYYYY || "17091999";
    const EMAIL = process.env.EMAIL || "varun.xavier2022@vitstudent.ac.in";
    const ROLL_NUMBER = process.env.ROLL_NUMBER || "22BCE1234";
  
    const user_id = `${FULL_NAME.toLowerCase().replace(/\s+/g, "_")}_${DOB_DDMMYYYY}`;
  
    const odd_numbers = [];
    const even_numbers = [];
    const alphabets = [];
    const special_characters = [];
    let sum = 0;
    const letters = [];
  
    const isIntegerString = (s) => /^[+-]?\d+$/.test(s);
  
    for (const item of data) {
      const str = String(item);
  
      if (isIntegerString(str)) {
        const n = parseInt(str, 10);
        (n % 2 === 0 ? even_numbers : odd_numbers).push(str);
        sum += n;
      } else {
        if (/^[A-Za-z]+$/.test(str)) {
          alphabets.push(str.toUpperCase());
        } else if (str.length === 1 && !/[A-Za-z0-9]/.test(str)) {
          special_characters.push(str);
        }
      }
  
      for (const ch of str) {
        if (/[A-Za-z]/.test(ch)) letters.push(ch);
      }
    }
  
    letters.reverse();
    const concat_string = letters
      .map((ch, i) => (i % 2 === 0 ? ch.toUpperCase() : ch.toLowerCase()))
      .join("");
  
    return res.status(200).json({
      is_success: true,
      user_id,
      email: EMAIL,
      roll_number: ROLL_NUMBER,
      odd_numbers,
      even_numbers,
      alphabets,
      special_characters,
      sum: String(sum),
      concat_string,
    });
  }
  