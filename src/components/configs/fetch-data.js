const API_URI = process.env.NEXT_PUBLIC_API_URI;

const fetchData = async (path, params) => {
  let resp, err;

  try {
    const requestParams = {};

    const apiUri = new URL(`${API_URI}${path}`);

    Object.entries(params).forEach(([key, value]) => {
      apiUri.searchParams.append(key, value);
    });

    const response = await fetch(apiUri.toString(), requestParams);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    resp = await response.json();
  } catch (e) {
    err = e;
    console.error('Error fetching data: ', e);
  }

  return [resp, err];
};

export default fetchData;
