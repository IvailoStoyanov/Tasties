const fetch = require("node-fetch");

const API_ENDPOINT = "https://api.airtable.com/v0/appgvzIZYa4IuqAOE/Dishes?";

const filterDataForUser = (data, user) => {
  const newArray = data.records.filter((record) =>  record.fields.userId == user.sub);
  return newArray;
};

exports.handler = async (event, context) => {
  if (context.clientContext.user) {
    const response = await fetch(API_ENDPOINT, {
      headers: {
        Authorization: `Bearer keyZEIj7y1Z2S3ra6`,
      },
    });
    const data = filterDataForUser(
      await response.json(),
      context.clientContext.user
    );

    return { statusCode: 200, body: JSON.stringify({ data }) };
  }
  return {
    statusCode: 500,
    body: JSON.stringify({ error: "Failed fetching data" }),
  };
};
