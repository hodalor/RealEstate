const defaultSiteSettings = {
  general: {
    siteName: "BrightEstate",
    defaultLanguage: "English",
    defaultCurrency: "USD",
    defaultCurrencySymbol: "$",
    defaultCountry: "Ghana",
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

const getCountryConfig = (settings, countryName) => {
  const normalized = normalizeSiteSettings(settings);
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
  const normalized = normalizeSiteSettings(settings);
  const country = getCountryConfig(normalized, countryName);

  if (!country) {
    return [normalized.general.defaultCurrency];
  }

  return Array.from(
    new Set([country.defaultCurrency, ...(country.allowedCurrencies || []), normalized.general.defaultCurrency])
  );
};

const detectVisitorCountry = (settings) => {
  const normalized = normalizeSiteSettings(settings);

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

const formatPriceWithCurrency = (price, currency = "USD") => {
  const numericPrice = parseFloat(String(price || "0").replace(/[^0-9.]/g, "")) || 0;
  return numericPrice ? `${currency} ${numericPrice.toLocaleString()}` : "Price on request";
};

export {
  defaultSiteSettings,
  normalizeSiteSettings,
  getCountryConfig,
  getProvinceOptions,
  getCityOptions,
  getSuburbOptions,
  getCurrencyOptions,
  detectVisitorCountry,
  formatPriceWithCurrency,
};
