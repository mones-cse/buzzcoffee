const Airtable = require("airtable");
const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
  process.env.AIRTABLE_BASE_ID
);

const table = base("base-coffee-store");

export default async function createCoffeeStore(req, res) {
  if (req.method == "POST") {
    try {
      const stores = await table
        .select({
          filterByFormula: "id=0017",
          view: "Grid view",
        })
        .firstPage();
      // check
      if (stores.length > 0) {
        const store = stores[0].fields;
        res.status(200).json(store);
      } else {
        //create
        console.log("create store ok!!!");
        const createdStore = await table.create({
          id: "0017",
          name: "demo name",
          address: "demo address",
          neighbourhood: "demo neighbourhood",
          vote: 100,
          imgUrl: "https://picsum.photos/200",
        });
        console.log({ createdStore });
        res.status(200).json(createdStore.fields);
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  } else {
    res
      .status(200)
      .json({ message: "Don't be naughty this api is only for post request" });
  }
}
