const defaultSiteSettings = {
  general: {
    siteName: "LEDS PROPERTIES",
    defaultLanguage: "English",
    defaultCurrency: "USD",
    defaultCurrencySymbol: "$",
    defaultCountry: "Ghana",
    currencyRates: {
      USD: 1,
      GHS: 15.5,
      ZMW: 26.8,
    },
  },
  location: {
    countries: [
      {
        id: "ghana",
        name: "Ghana",
        isoCode: "GH",
        phoneCode: "+233",
        defaultCurrency: "GHS",
        currencySymbol: "GHS",
        allowedCurrencies: ["GHS", "USD"],
        timezones: ["Africa/Accra"],
        provinces: [
          {
            id: "greater-accra",
            name: "Greater Accra",
            cities: [
              {
                id: "accra",
                name: "Accra",
                suburbs: ["Airport Residential", "Cantonments", "East Legon", "Labone"],
              },
              {
                id: "tema",
                name: "Tema",
                suburbs: ["Community 1", "Community 18", "Sakumono", "Spintex"],
              },
            ],
          },
          {
            id: "ashanti",
            name: "Ashanti",
            cities: [
              {
                id: "kumasi",
                name: "Kumasi",
                suburbs: ["Adum", "Asokwa", "Bantama", "Ejisu"],
              },
            ],
          },
        ],
      },
      {
        id: "zambia",
        name: "Zambia",
        isoCode: "ZM",
        phoneCode: "+260",
        defaultCurrency: "ZMW",
        currencySymbol: "ZMW",
        allowedCurrencies: ["ZMW", "USD"],
        timezones: ["Africa/Lusaka"],
        provinces: [
          {
            id: "lusaka-province",
            name: "Lusaka Province",
            cities: [
              {
                id: "lusaka",
                name: "Lusaka",
                suburbs: ["Ibex Hill", "Kabulonga", "Meanwood", "Roma"],
              },
            ],
          },
          {
            id: "copperbelt",
            name: "Copperbelt",
            cities: [
              {
                id: "ndola",
                name: "Ndola",
                suburbs: ["Itawa", "Kansenshi", "Northrise", "Town Centre"],
              },
              {
                id: "kitwe",
                name: "Kitwe",
                suburbs: ["Buchi", "Parklands", "Riverside", "Nkana East"],
              },
            ],
          },
        ],
      },
    ],
  },
  property: {
    propertyTypes: [
      "Single room",
      "Apartment",
      "Full house",
      "Office",
      "Shop",
      "Land",
      "Warehouse",
    ],
    amenities: [
      "Swimming Pool",
      "Pipe Water",
      "Air Conditioning",
      "Electricity",
      "Near Main Road",
      "Near Supermarket",
      "Pets Allowed",
    ],
  },
  content: {
    hero: {
      title: "Find Your Dream Home",
      subtitle: "Discover the right property across multiple countries from one platform.",
      buttonText: "Browse Properties",
      imageUrl: "",
    },
    footer: {
      aboutText: "We help buyers, agents, and admins manage property listings across multiple countries.",
      contactAddress: "Accra, Ghana",
      contactPhone: "+233 000 000 000",
      contactEmail: "info@brightestate.com",
      socialLinks: {
        facebook: "#",
        twitter: "#",
        instagram: "#",
        linkedin: "#",
      },
    },
    advertisements: [],
  },
  developer: {
    apiKeys: {},
    generatedApis: [],
    webhooks: [],
  },
};

const clone = (value) => JSON.parse(JSON.stringify(value));

const normalizeSiteSettings = (settings = {}) => ({
  general: {
    ...clone(defaultSiteSettings.general),
    ...(settings.general || {}),
    currencyRates: {
      ...clone(defaultSiteSettings.general.currencyRates),
      ...(settings.general?.currencyRates || {}),
    },
  },
  location: {
    countries: Array.isArray(settings.location?.countries)
      ? settings.location.countries
      : clone(defaultSiteSettings.location.countries),
  },
  property: {
    ...clone(defaultSiteSettings.property),
    ...(settings.property || {}),
    propertyTypes: Array.isArray(settings.property?.propertyTypes)
      ? settings.property.propertyTypes
      : clone(defaultSiteSettings.property.propertyTypes),
    amenities: Array.isArray(settings.property?.amenities)
      ? settings.property.amenities
      : clone(defaultSiteSettings.property.amenities),
  },
  content: {
    ...clone(defaultSiteSettings.content),
    ...(settings.content || {}),
    hero: {
      ...clone(defaultSiteSettings.content.hero),
      ...(settings.content?.hero || {}),
    },
    footer: {
      ...clone(defaultSiteSettings.content.footer),
      ...(settings.content?.footer || {}),
      socialLinks: {
        ...clone(defaultSiteSettings.content.footer.socialLinks),
        ...(settings.content?.footer?.socialLinks || {}),
      },
    },
    advertisements: Array.isArray(settings.content?.advertisements) ? settings.content.advertisements : [],
  },
  developer: {
    ...clone(defaultSiteSettings.developer),
    ...(settings.developer || {}),
  },
});

const normalizeLegacyBranding = (settings = {}) => {
  const normalized = normalizeSiteSettings(settings);
  const currentName = String(normalized.general.siteName || "").trim().toLowerCase();

  if (currentName === "brightestate" || currentName === "hodalorestate") {
    normalized.general.siteName = "LEDS PROPERTIES";
  }

  return normalized;
};

const getCountryConfig = (settings, countryName) => {
  const normalized = normalizeLegacyBranding(settings);
  return normalized.location.countries.find(
    (country) => country.name.toLowerCase() === String(countryName || "").trim().toLowerCase()
  );
};

const getProvinceOptions = (settings, countryName) =>
  getCountryConfig(settings, countryName)?.provinces || [];

const getCityOptions = (settings, countryName, provinceName) =>
  getProvinceOptions(settings, countryName).find(
    (province) => province.name.toLowerCase() === String(provinceName || "").trim().toLowerCase()
  )?.cities || [];

const getSuburbOptions = (settings, countryName, provinceName, cityName) =>
  getCityOptions(settings, countryName, provinceName).find(
    (city) => city.name.toLowerCase() === String(cityName || "").trim().toLowerCase()
  )?.suburbs || [];

const getCurrencyOptions = (settings, countryName) => {
  const normalized = normalizeLegacyBranding(settings);
  const country = getCountryConfig(normalized, countryName);

  if (!country) {
    return [normalized.general.defaultCurrency];
  }

  return Array.from(
    new Set([country.defaultCurrency, ...(country.allowedCurrencies || []), normalized.general.defaultCurrency])
  );
};

const detectVisitorCountry = (settings) => {
  const normalized = normalizeLegacyBranding(settings);

  if (typeof Intl !== "undefined") {
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const matchedCountry = normalized.location.countries.find((country) =>
      (country.timezones || []).includes(timeZone)
    );

    if (matchedCountry) {
      return matchedCountry.name;
    }
  }

  if (typeof navigator !== "undefined") {
    const locale = `${navigator.language || ""} ${navigator.languages?.join(" ") || ""}`.toLowerCase();

    if (locale.includes("-gh") || locale.includes(" gh")) {
      return "Ghana";
    }

    if (locale.includes("-zm") || locale.includes(" zm")) {
      return "Zambia";
    }
  }

  return normalized.general.defaultCountry;
};

const getCurrencyRate = (settings, currency) => {
  const normalized = normalizeLegacyBranding(settings);
  const code = String(currency || normalized.general.defaultCurrency || "USD").toUpperCase();
  const rate = Number(normalized.general.currencyRates?.[code]);

  return rate > 0 ? rate : 1;
};

const convertPrice = (price, fromCurrency = "USD", toCurrency = "USD", settings = {}) => {
  const numericPrice = parseFloat(String(price || "0").replace(/[^0-9.]/g, "")) || 0;

  if (!numericPrice) {
    return 0;
  }

  const sourceRate = getCurrencyRate(settings, fromCurrency);
  const targetRate = getCurrencyRate(settings, toCurrency);
  const amountInUsd = numericPrice / sourceRate;

  return amountInUsd * targetRate;
};

const formatPriceWithCurrency = (
  price,
  currency = "USD",
  settings = {},
  options = {}
) => {
  const normalized = normalizeLegacyBranding(settings);
  const sourceCurrency = String(currency || normalized.general.defaultCurrency || "USD").toUpperCase();
  const displayCurrency = String(
    options.displayCurrency || sourceCurrency || normalized.general.defaultCurrency || "USD"
  ).toUpperCase();
  const numericPrice =
    displayCurrency === sourceCurrency
      ? parseFloat(String(price || "0").replace(/[^0-9.]/g, "")) || 0
      : convertPrice(price, sourceCurrency, displayCurrency, normalized);

  return numericPrice ? `${displayCurrency} ${numericPrice.toLocaleString()}` : "Price on request";
};

export {
  defaultSiteSettings,
  normalizeSiteSettings,
  normalizeLegacyBranding,
  getCountryConfig,
  getProvinceOptions,
  getCityOptions,
  getSuburbOptions,
  getCurrencyOptions,
  detectVisitorCountry,
  getCurrencyRate,
  convertPrice,
  formatPriceWithCurrency,
};
