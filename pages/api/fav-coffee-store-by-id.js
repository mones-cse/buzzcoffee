import table from "../../lib/aittable";

export default async function favCoffeeStoreById(req, res) {
  if (req.method == "PUT") {
    try {
      const { id } = req.body;
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
        const updatedStore = {
          id: stores[0].id,
          fields: { ...store, vote: store.vote + 1 },
        };
        const response = await table.update([updatedStore]);
        res.status(200).json(response[0].fields);
      } else {
        res.status(400).json({ message: "There is no store with that id" });
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
