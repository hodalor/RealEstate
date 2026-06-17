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
        enabled: true,
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
        enabled: true,
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
    agentControl: {
      showPropertyAgentCard: true,
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
const ensureArray = (value, fallback = []) => (Array.isArray(value) ? value : clone(fallback));

const normalizeCity = (city, provinceId = "province") => ({
  id: city?.id || `${provinceId}-${String(city?.name || "city").toLowerCase().replace(/\s+/g, "-")}`,
  name: city?.name || "",
  suburbs: ensureArray(city?.suburbs).filter(Boolean),
});

const normalizeProvince = (province, countryId = "country") => ({
  id:
    province?.id ||
    `${countryId}-${String(province?.name || "province").toLowerCase().replace(/\s+/g, "-")}`,
  name: province?.name || "",
  cities: ensureArray(province?.cities).map((city) => normalizeCity(city, province?.id || countryId)),
});

const normalizeCountry = (country, generalDefaults) => ({
  id: country?.id || String(country?.name || "country").toLowerCase().replace(/\s+/g, "-"),
  name: country?.name || "",
  enabled: country?.enabled !== false,
  isoCode: country?.isoCode || "",
  phoneCode: country?.phoneCode || "",
  defaultCurrency: String(
    country?.defaultCurrency || generalDefaults.defaultCurrency || "USD"
  ).toUpperCase(),
  currencySymbol:
    country?.currencySymbol ||
    country?.defaultCurrency ||
    generalDefaults.defaultCurrencySymbol ||
    "$",
  allowedCurrencies: Array.from(
    new Set(
      ensureArray(country?.allowedCurrencies, [
        country?.defaultCurrency,
        generalDefaults.defaultCurrency,
      ])
        .filter(Boolean)
        .map((currency) => String(currency).toUpperCase())
    )
  ),
  timezones: ensureArray(country?.timezones),
  provinces: ensureArray(country?.provinces).map((province) =>
    normalizeProvince(province, country?.id || country?.name || "country")
  ),
});

const normalizeSiteSettings = (settings = {}) => {
  const general = {
    ...clone(defaultSiteSettings.general),
    ...(settings.general || {}),
    currencyRates: {
      ...clone(defaultSiteSettings.general.currencyRates),
      ...(settings.general?.currencyRates || {}),
    },
  };

  const rawFooter = settings.content?.footer || {};

  return {
    general,
    location: {
      countries: ensureArray(
        settings.location?.countries,
        defaultSiteSettings.location.countries
      ).map((country) => normalizeCountry(country, general)),
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
        ...rawFooter,
        contactAddress:
          rawFooter.contactAddress ||
          rawFooter.address ||
          defaultSiteSettings.content.footer.contactAddress,
        contactPhone:
          rawFooter.contactPhone ||
          rawFooter.phone ||
          defaultSiteSettings.content.footer.contactPhone,
        contactEmail:
          rawFooter.contactEmail ||
          rawFooter.email ||
          defaultSiteSettings.content.footer.contactEmail,
        socialLinks: {
          ...clone(defaultSiteSettings.content.footer.socialLinks),
          ...(rawFooter.socialLinks || {}),
        },
      },
      agentControl: {
        ...clone(defaultSiteSettings.content.agentControl),
        ...(settings.content?.agentControl || {}),
      },
      advertisements: Array.isArray(settings.content?.advertisements)
        ? settings.content.advertisements
        : [],
    },
    developer: {
      ...clone(defaultSiteSettings.developer),
      ...(settings.developer || {}),
    },
  };
};

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

const getEnabledCountries = (settings) => {
  const normalized = normalizeLegacyBranding(settings);
  const enabledCountries = normalized.location.countries.filter((country) => country.enabled !== false);

  return enabledCountries.length > 0 ? enabledCountries : normalized.location.countries;
};

const getProvinceOptions = (settings, countryName) =>
  getCountryConfig(settings, countryName)?.provinces || [];

const getCityOptions = (settings, countryName, provinceName) => {
  const provinces = getProvinceOptions(settings, countryName);

  if (provinceName) {
    return (
      provinces.find(
        (province) =>
          province.name.toLowerCase() === String(provinceName || "").trim().toLowerCase()
      )?.cities || []
    );
  }

  return provinces.flatMap((province) => province.cities || []);
};

const getSuburbOptions = (settings, countryName, provinceName, cityName) =>
  getCityOptions(settings, countryName, provinceName).find(
    (city) => city.name.toLowerCase() === String(cityName || "").trim().toLowerCase()
  )?.suburbs || [];

const findLocationHierarchyByCity = (settings, cityName, countryName = "") => {
  const targetCityName = String(cityName || "").trim().toLowerCase();
  if (!targetCityName) {
    return null;
  }

  const countries = countryName
    ? [getCountryConfig(settings, countryName)].filter(Boolean)
    : getEnabledCountries(settings);

  for (const country of countries) {
    for (const province of country.provinces || []) {
      const matchedCity = (province.cities || []).find(
        (city) => city.name.toLowerCase() === targetCityName
      );

      if (matchedCity) {
        return {
          countryId: country.id,
          countryName: country.name,
          provinceId: province.id,
          provinceName: province.name,
          cityId: matchedCity.id,
          cityName: matchedCity.name,
        };
      }
    }
  }

  return null;
};

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

const getDisplayCurrency = (settings, countryName = "") => {
  const normalized = normalizeLegacyBranding(settings);
  const selectedCountry = countryName ? getCountryConfig(normalized, countryName) : null;
  const detectedCountry = getCountryConfig(normalized, detectVisitorCountry(normalized));
  const defaultCountry = getCountryConfig(normalized, normalized.general.defaultCountry);

  return (
    selectedCountry?.defaultCurrency ||
    detectedCountry?.defaultCurrency ||
    defaultCountry?.defaultCurrency ||
    normalized.general.defaultCurrency ||
    "USD"
  );
};

const getBudgetOptions = (settings, countryName = "") => {
  const displayCurrency = getDisplayCurrency(settings, countryName);
  const baseRanges = [
    { min: 0, max: 50000 },
    { min: 50000, max: 100000 },
    { min: 100000, max: 250000 },
    { min: 250000, max: 500000 },
    { min: 500000, max: 1000000 },
    { min: 1000000, max: null },
  ];

  return baseRanges.map((range) => {
    const convertedMin = Math.round(convertPrice(range.min, "USD", displayCurrency, settings));
    const convertedMax =
      range.max === null
        ? null
        : Math.round(convertPrice(range.max, "USD", displayCurrency, settings));

    if (range.min === 0 && convertedMax !== null) {
      return {
        value: `0-${convertedMax}`,
        label: `Under ${convertedMax.toLocaleString()}`,
      };
    }

    if (convertedMax === null) {
      return {
        value: `${convertedMin}-`,
        label: `Above ${convertedMin.toLocaleString()}`,
      };
    }

    return {
      value: `${convertedMin}-${convertedMax}`,
      label: `${convertedMin.toLocaleString()} - ${convertedMax.toLocaleString()}`,
    };
  });
};

const detectVisitorCountry = (settings) => {
  const normalized = normalizeLegacyBranding(settings);
  const enabledCountries = getEnabledCountries(normalized);

  if (typeof Intl !== "undefined") {
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const matchedCountry = enabledCountries.find((country) =>
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

  const defaultCountryName = normalized.general.defaultCountry;
  const enabledDefaultCountry = enabledCountries.find(
    (country) => country.name.toLowerCase() === String(defaultCountryName || "").trim().toLowerCase()
  );

  return enabledDefaultCountry?.name || enabledCountries[0]?.name || defaultCountryName;
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
  getEnabledCountries,
  getProvinceOptions,
  getCityOptions,
  getSuburbOptions,
  findLocationHierarchyByCity,
  getCurrencyOptions,
  getDisplayCurrency,
  getBudgetOptions,
  detectVisitorCountry,
  getCurrencyRate,
  convertPrice,
  formatPriceWithCurrency,
};
