import { apiBaseUrl } from "../data/baseUrls";

const backendOrigin = apiBaseUrl.replace(/\/api$/i, "");

const isAbsoluteUrl = (value) => /^https?:\/\//i.test(value);

const normalizePublicPath = (value) => {
  if (!value) {
    return "";
  }

  const publicIndex = value.indexOf("/public/");

  if (publicIndex !== -1) {
    return `${backendOrigin}${value.slice(publicIndex)}`;
  }

  if (value.startsWith("public/")) {
    return `${backendOrigin}/${value}`;
  }

  if (value.startsWith("/public/")) {
    return `${backendOrigin}${value}`;
  }

  return value;
};

const resolveImageUrl = (value, fallback = "/assets/image/hero-image.svg") => {
  if (!value) {
    return fallback;
  }

  if (value.startsWith("/assets/") || value.startsWith("../assets/")) {
    return value;
  }

  if (isAbsoluteUrl(value)) {
    if (/localhost|127\.0\.0\.1/i.test(value) || value.includes("/public/")) {
      return normalizePublicPath(value);
    }

    return value;
  }

  return normalizePublicPath(value);
};

export { resolveImageUrl };
