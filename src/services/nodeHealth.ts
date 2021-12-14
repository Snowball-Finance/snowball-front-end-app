
export const nodeIsHealthy = async (url) => {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({ "jsonrpc": "2.0", "id": 1, "method": "health.getLiveness" });

  var requestOptions: RequestInit = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };
  try {
    const response = await fetch(`${url}/ext/health`, requestOptions);
    const bodyResponse = await response.json();
    return bodyResponse.healthy;
  } catch (error) {
    console.log(error);
    return false;
  }
}
