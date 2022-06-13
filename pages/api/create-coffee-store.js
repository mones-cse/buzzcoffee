import table from "../../lib/aittable";

export default async function createCoffeeStore(req, res) {
  if (req.method == "POST") {
    try {
      const { id, name, address, neighbourhood, vote, imgUrl } = req.body;
      if (!id) {
        throw { message: "Id can't be empty" };
      }
      const stores = await table
        .select({
          filterByFormula: `id="${id}"`,
          view: "Grid view",
        })
        .firstPage();
      // check
      if (stores.length > 0) {
        const store = stores[0].fields;
        res.status(200).json(store);
      } else {
        //create
        if (!name || name.length < 1) {
          throw { message: "Name can't be empty" };
        }
        const createdStore = await table.create({
          id: `${id}`,
          name,
          address: address || "",
          neighbourhood: neighbourhood || "",
          vote: vote || 0,
          imgUrl: imgUrl || "",
        });
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
