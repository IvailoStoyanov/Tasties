exports.handler = async () => {
  console.log("function ran");

  const data = { name: "Ivo", age: 24, job: "developer" };

  // return response to browser
  return {
    statusCode: 200,
    body: JSON.stringify(data),
  };
};
