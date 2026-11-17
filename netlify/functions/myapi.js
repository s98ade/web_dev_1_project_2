// Runs on the server (Node.js), so the key stays hidden
export async function handler(event) {
  const API_KEY = process.env.OMDB_API_KEY;

  // The search text and type sent by the browser
  const params = event.queryStringParameters;

  if (!params.s) {
    return { statusCode: 400, body: JSON.stringify({ Response: "False", Error: "No search text." }) };
  }

  // Build the OMDb address and add the secret key here
  let url = "https://www.omdbapi.com/?apikey=" + API_KEY;
  url = url + "&s=" + encodeURIComponent(params.s);
  if (params.type) {
    url = url + "&type=" + params.type;
  }

  const response = await fetch(url);
  const data = await response.json();

  return {
    statusCode: 200,
    body: JSON.stringify(data)
  };
}