export async function getAllDishes() {
        // the response does not need to go to api.airtable.com it can go to lib/dishes.js instead - if it is available at that point
  const response = await fetch(
    `https://api.airtable.com/v0/appgvzIZYa4IuqAOE/Dishes?`,
    {
      headers: {
        Authorization: `Bearer keyZEIj7y1Z2S3ra6`,
      },
    }
    );
    // Authorization: `Bearer ${process.env.AIRTABLE_API_KEY}`,
  const { records } = await response.json();
  return records;
}

export async function getSingleDish(id) {
        // the response does not need to go to api.airtable.com it can go to lib/dishes.js instead - if it is available at that point
  const response = await fetch(
    `https://api.airtable.com/v0/appgvzIZYa4IuqAOE/Dishes/${id}`,
    {
      headers: {
        Authorization: `Bearer keyZEIj7y1Z2S3ra6`,
      },
    }
    );
    // Authorization: `Bearer ${process.env.AIRTABLE_API_KEY}`,
    const { fields } = await response.json();
  return fields;
}

export async function createDish(data) {
  // const user = auth.currentUser();

  await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/dishes`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      Authorization: `Bearer keyZEIj7y1Z2S3ra6`,
    },
  });
}
// Authorization: `Bearer ${user.token.access_token}`,
