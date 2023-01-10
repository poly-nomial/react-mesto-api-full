export const base_url = "https://api.anothermesto.nomoredomains.club";

export const register = (email, password) => {
  return fetch(`${base_url}/signup`, {
    credentials: "include",
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      password,
      email,
    }),
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.data) {
        return res;
      } else {
        return Promise.reject(res.error);
      }
    });
};

export const login = (email, password) => {
  return fetch(`${base_url}/signin`, {
    credentials: "include",
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      password,
      email,
    }),
  }).then((res) => getResponseData(res));
};

export const authorize = () => {
  return fetch(`${base_url}/users/me`, {
    credentials: "include",
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => getResponseData(res));
};

const getResponseData = (res) => {
  if (!res.ok) {
    return Promise.reject(`Ошибка: ${res.status}`);
  } else {
    return res.json();
  }
};
