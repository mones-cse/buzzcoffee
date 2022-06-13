import { fetchStore } from "../../lib/coffee-store";

export default async function getCoffeeStoreById(req, res) {
  try {
    const { latlong, limit } = req.query;
    const formattedData = await fetchStore(
      latlong || "23.73,90.37",
      limit || 6
    );

    res.status(200).json(formattedData);
  } catch (error) {
    res.status(500).json({ message: "something went wrong " + error.message });
  }
}
