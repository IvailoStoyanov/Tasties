export default async (req, res) => {
  if (req.method === "POST") {
    const { missingIngredients, availableIngredients, cartIngredients, userId } =
      JSON.parse(req.body);

    const data = {
      records: [
        {
            fields: {
              name: "missingIngredients",
              ingredients: missingIngredients,
              userId
            },
          },
          {
            fields: {
              name: "availableIngredients",
              ingredients: availableIngredients,
              userId
            },
          },
          {
            fields: {
              name: "cartIngredients",
              ingredients: cartIngredients,
              userId
            },
          },
      ],
      typecast: true
    };

    const response = await fetch(
      `https://api.airtable.com/v0/${process.env.AIRTABLE_BASE_ID}/Ingredients?`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.AIRTABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    res.status(201).json({ response });

    return;
  }
};
