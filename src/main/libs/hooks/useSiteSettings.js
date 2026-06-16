import { useEffect, useState } from "react";
import { _fetchSiteSettings } from "../functions/fetches";
import { normalizeLegacyBranding, normalizeSiteSettings } from "../data/siteSettings";

export default function useSiteSettings() {
  const [siteSettings, setSiteSettings] = useState(normalizeSiteSettings());
  const [siteSettingsLoaded, setSiteSettingsLoaded] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const loadSettings = async () => {
      const result = await _fetchSiteSettings();

      if (!isMounted) {
        return;
      }

      if (result?.success === 1 && result.data) {
        setSiteSettings(normalizeLegacyBranding(result.data));
      } else {
        setSiteSettings(normalizeSiteSettings());
      }

      setSiteSettingsLoaded(true);
    };

    loadSettings();

    return () => {
      isMounted = false;
    };
  }, []);

  return {
    siteSettings,
    siteSettingsLoaded,
  };
}
