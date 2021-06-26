import { PRODUCT_URL, PATH } from "../../constants";

export const createCategory = (userId, token, category) => {
  console.log(userId, token, category);
  return fetch(`${PRODUCT_URL}${PATH.CATEGORY}${PATH.CREATE}${userId}`, {
    method: "post",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },

    body: JSON.stringify(category),
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

export const createArticles = (userId, token, product) => {
  return fetch(`${PRODUCT_URL}${PATH.ARTICLES}${PATH.CREATE}${userId}`, {
    method: "post",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },

    body: product,
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getCategories = () => {
  return fetch(`${PRODUCT_URL}${PATH.CATEGORY}`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => console.log(error));
};
