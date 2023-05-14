/**
 * Make get request.
 *
 * @param {string} url Request URL.
 * @param {Object} [headers=null] Object contains request headers.
 *
 * @return {Promise<Object>} Promise fulfilled with response data.
 */

export const get = async (url, headers = {}) => {
  try {
    const response = await fetch(url, {
      headers: {
        ...headers,
      },
    });

    if (!response?.ok) return false;

    return response.json();
  } catch (err) {
    console.log(err);
  }
  return null;
};

export const post = async (url, data, headers = {}) => {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
        ...headers,
      },
      body: JSON.stringify(data),
    });

    return response.json();
  } catch (err) {
    console.log(err);
  }
  return null;
};
export const put = async (url, data, headers = {}) => {
  try {
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
        ...headers,
      },
      body: JSON.stringify(data),
    });

    return response.json();
  } catch (err) {
    console.log(err);
  }
  return null;
};
export const deleteRecord = async (url, headers = {}) => {
  const response = await fetch(url, {
    method: "DELETE",
    headers: {
      ...headers,
    },
  });

  return response.status;
};
