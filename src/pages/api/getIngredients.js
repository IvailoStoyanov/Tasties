export default async (req, res) => {
  if (req.method === "GET") {
    const response = await fetch(
      `https://api.airtable.com/v0/${process.env.AIRTABLE_BASE_ID}/Ingredients?`,
      {
        headers: {
          Authorization: `Bearer ${process.env.AIRTABLE_API_KEY}`,
        },
      }
    );

    const { records } = await response.json();

    const allIngredients = records.map((record) => {
      return {
        id: record.id,
        ...record.fields,
      };
    });

    res.status(200).json({ allIngredients });

    return;
  }
};
