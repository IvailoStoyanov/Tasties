// export default async (req, res) => {
//   if (req.method === "PATCH") {
//     // const { authorization } = req.headers;

//     // const auth = await fetch(`${process.env.NEXT_PUBLIC_AUTH_ENDPOING}/user`, {
//     //   headers: {
//     //     Authorization: authorization,
//     //   },
//     // });

//     // const authJson = await auth.json();

//     // if (!authJson.id) {
//     //   res.status(401).json({ error: "Invalid token" });
//     //   return;
//     // }

//     const {
//       name,
//       cost,
//       time,
//       image,
//       neededIngredients,
//       pageName,
//       url,
//     } = JSON.parse(req.body);

//     const data = {
//       records: [
//         {
//           fields: {
//             name: "availableIngredients",
//             ingredients: [
//               "onions",
//               "butter",
//               "oil",
//               "potatoes",
//               "spagetti",
//               "carrots",
//               "basil",
//               "tomatoes",
//             ],
//           },
//         },
//         {
//           fields: {
//             name: "missingIngredients",
//             ingredients: ["garlic", "pumpkin"],
//           },
//         },
//       ],
//     };

//     const response = await fetch(
//       `https://api.airtable.com/v0/${process.env.AIRTABLE_BASE_ID}/Ingredients?`,
//       {
//         method: "PATCH",
//         headers: {
//           Authorization: `Bearer ${process.env.AIRTABLE_API_KEY}`,
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(data),
//       }
//     );

//     res.status(201).json({ response });

//     return;
//   }
// };
