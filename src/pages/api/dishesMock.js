export default async (req, res) => {
  if (req.method === "GET") {
    const response = await fetch(
      `https://api.airtable.com/v0/${process.env.AIRTABLE_BASE_ID}/Dishes?`,
      {
        headers: {
          Authorization: `Bearer ${process.env.AIRTABLE_API_KEY}`,
        },
      }
    );

    const { records } = await response.json();

    const dishes = records.map((record) => {
      return {
        id: record.id,
        ...record.fields,
      };
    });

    res.status(200).json({ dishes });

    return;
  }

  if (req.method === "POST") {
    const { authorization } = req.headers;

    const auth = await fetch(`${process.env.NEXT_PUBLIC_AUTH_ENDPOING}/user`, {
      headers: {
        Authorization: authorization,
      },
    });

    const authJson = await auth.json();

    if ( !authJson.id ) {
      res.status(401).json({ error: 'Invalid token' });
      return;
    }


    const {
      name,
      cost,
      time,
      image,
      neededIngredients,
      pageName,
      url,
    } = JSON.parse(req.body);

    const data = {
      records: [
        {
          fields: {
            name,
            cost,
            pageName,
            time,
            url,
            neededIngredients,
            image: [
              {
                url: image,
              },
            ],
          },
        },
      ],
      typecast: true,
    };

    const response = await fetch(
      `https://api.airtable.com/v0/${process.env.AIRTABLE_BASE_ID}/Dishes?`,
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
