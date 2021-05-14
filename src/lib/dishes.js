import { auth } from "./auth"

export async function getAllDishes(params) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/dishesMock`
  );
  const { dishes } = await response.json();
  return dishes;
}

export async function createDish(data) {
    const user = auth.currentUser();
    console.log(user.token);

  await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/dishesMock`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
        Authorization: `Bearer ${user.token.access_token}`
    }
  });
}
