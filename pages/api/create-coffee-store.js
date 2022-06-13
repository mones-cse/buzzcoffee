const Airtable = require("airtable");
const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
  process.env.AIRTABLE_BASE_ID
);

const table = base("base-coffee-store");
console.log({ table });

export default async function createCoffeeStore(req, res) {
  if (req.method == "POST") {
    res.status(200).json({ message: "CreteStore api" });
  } else {
    res
      .status(200)
      .json({ message: "Don't be naughty this api is only for post request" });
  }
}
