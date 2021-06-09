export async function getAllIngredients() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/getIngredients`
  );
  const { allIngredients } = await response.json();
  return allIngredients;
}

export async function updateMissingIngredients(data) {
  // const user = auth.currentUser();
  // Bearer should be user.token!
  // the fetch destination is not secure as a direct string
  try {
    const res = await fetch(
      `https://api.airtable.com/v0/appgvzIZYa4IuqAOE/Ingredients/rec9mAOt5sqhA1OXV`,
      {
        method: "PATCH",
        body: JSON.stringify({
          fields: {
            ingredients: data,
            name: "missingIngredients",
          },
          typecast: true
        }),
        headers: { "Content-Type": "application/json", Authorization: `Bearer keyZEIj7y1Z2S3ra6`, },
      }
    );
    await res.json();
  } catch (err) {
    console.error(err);
  }
}

export async function updateCartIngredients(data) {
  // const user = auth.currentUser();
  // Bearer should be user.token!
  // the fetch destination is not secure as a direct string
  try {
    const res = await fetch(
      `https://api.airtable.com/v0/appgvzIZYa4IuqAOE/Ingredients/rechF0VXZ1GtLBjRb`,
      {
        method: "PATCH",
        body: JSON.stringify({
          fields: {
            ingredients: data,
            name: "cartIngredients",
          },
        }),
        headers: { "Content-Type": "application/json", Authorization: `Bearer keyZEIj7y1Z2S3ra6`, },
      }
    );
    await res.json();
  } catch (err) {
    console.error(err);
  }
}

export async function updateAvailableIngredients(data) {
  // const user = auth.currentUser();
  // Bearer should be user.token!
  // the fetch destination is not secure as a direct string
  try {
    const res = await fetch(
      `https://api.airtable.com/v0/appgvzIZYa4IuqAOE/Ingredients/recwhc8EofnUSTRF2`,
      {
        method: "PATCH",
        body: JSON.stringify({
          fields: {
            ingredients: data,
            name: "availableIngredients",
          },
          typecast: true
        }),
        headers: { "Content-Type": "application/json", Authorization: `Bearer keyZEIj7y1Z2S3ra6`, },
      }
    );
    await res.json();
  } catch (err) {
    console.error(err);
  }
}
