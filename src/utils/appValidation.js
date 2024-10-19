export const isEmailValid = (/** @type {any} */ email) => {
  var valid = true;
  var regex =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (!regex.test(email.replace(/\s/g, ""))) {
    valid = false;
  }

  return valid;
};

export const isWebsiteValid = (/** @type {any} */ url) => {
  var valid = true;
  var regex =
    /^(https?:\/\/)?([\da-z.-]+\.[a-z.]{2,6}|[a-z0-9-]+\.[a-z.]{2,6})([\/\w .-]*)*\/?$/;

  if (!regex.test(url.replace(/\s/g, ""))) {
    valid = false;
  }

  return valid;
};

export const islinkedinValid = (/** @type {any} */ url) => {
  var valid = true;
  var regex = /^(https?:\/\/)?(www\.)?(linkedin\.com\/.*)$/;

  if (!regex.test(url.replace(/\s/g, ""))) {
    valid = false;
  }

  return valid;
};
