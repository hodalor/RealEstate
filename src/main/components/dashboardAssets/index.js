import { useEffect } from "react";

const dashboardStyles = [
  "/assets2/plugins/bootstrap/css/bootstrap.min.css",
  "/assets2/plugins/jquery-datatable/dataTables.bootstrap4.min.css",
  "/assets2/css/main.css",
  "/assets2/css/color_skins.css",
];

const dashboardScripts = [
  "/assets2/bundles/libscripts.bundle.js",
  "/assets2/bundles/vendorscripts.bundle.js",
  "/assets2/bundles/mainscripts.bundle.js",
];

const loadScript = (src) =>
  new Promise((resolve, reject) => {
    const existing = document.querySelector(`script[data-dashboard-asset="true"][src="${src}"]`);

    if (existing) {
      resolve();
      return;
    }

    const script = document.createElement("script");
    script.src = src;
    script.async = false;
    script.dataset.dashboardAsset = "true";
    script.onload = () => resolve();
    script.onerror = () => reject(new Error(`Failed to load ${src}`));
    document.body.appendChild(script);
  });

export default function DashboardAssets() {
  useEffect(() => {
    const previousTheme = document.body.getAttribute("data-theme");
    const previousClassName = document.body.className;
    const previousStyle = document.body.getAttribute("style");

    document.body.setAttribute("data-theme", "light");
    document.body.classList.add("theme-purple", "dashboard-mode");
    document.body.style.fontFamily = "Mazzard H, Poppins, sans-serif";

    dashboardStyles.forEach((href) => {
      const existing = document.querySelector(`link[data-dashboard-asset="true"][href="${href}"]`);

      if (existing) {
        return;
      }

      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = href;
      link.dataset.dashboardAsset = "true";
      document.head.appendChild(link);
    });

    let isCancelled = false;

    (async () => {
      for (const src of dashboardScripts) {
        if (isCancelled) {
          break;
        }

        try {
          // Load in order because the dashboard bundle expects globals from earlier scripts.
          // eslint-disable-next-line no-await-in-loop
          await loadScript(src);
        } catch (error) {
          console.error(error);
        }
      }
    })();

    return () => {
      isCancelled = true;

      document.querySelectorAll('[data-dashboard-asset="true"]').forEach((element) => {
        element.remove();
      });

      if (previousTheme) {
        document.body.setAttribute("data-theme", previousTheme);
      } else {
        document.body.removeAttribute("data-theme");
      }

      document.body.className = previousClassName;

      if (previousStyle !== null) {
        document.body.setAttribute("style", previousStyle);
      } else {
        document.body.removeAttribute("style");
      }
    };
  }, []);

  return null;
}
