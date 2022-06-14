import table from "../../lib/aittable";
export default async function getCoffeeStoreById(req, res) {
  try {
    const { id } = req.query;
    if (!id) {
      throw { message: "id is needed" };
    }
    const stores = await table
      .select({
        filterByFormula: `id="${id}"`,
        view: "Grid view",
      })
      .firstPage();
    if (stores.length > 0) {
      const store = stores[0].fields;
      res.status(200).json(store);
    } else {
      res.status(200).json({ message: "no coffee store with that id" });
    }
  } catch (error) {
    res.status(500).json({ message: "something went wrong " + error.message });
  }
}
