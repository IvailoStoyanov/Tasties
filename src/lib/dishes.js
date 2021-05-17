import { auth } from "./auth";

export async function getAllDishes() {
    console.log('GetAllDishes: the airtable base ID', process.env.AIRTABLE_BASE_ID);
  const response = await fetch(
    `https://api.airtable.com/v0/${process.env.AIRTABLE_BASE_ID}/Dishes?`,
    {
      headers: {
        Authorization: `Bearer ${process.env.AIRTABLE_API_KEY}`,
      },
    }
  );

  const { records } = await response.json();

  return records;
}

export async function createDish(data) {
    console.log('createDish: airtable base ID', process.env.AIRTABLE_BASE_ID);
  const user = auth.currentUser();
  console.log(user.token);

  await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/dishesMock`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      Authorization: `Bearer ${user.token.access_token}`,
    },
  });
}
