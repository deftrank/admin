export const isEmailValid = (/** @type {any} */ email) => {
  // Regular expression to check for a valid email format
  var regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Check if the email is valid and does not belong to Gmail
  if (regex.test(email.replace(/\s/g, "")) && !email.toLowerCase().endsWith('@gmail.com')) {
    return true;
  }
  
  return false;
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
