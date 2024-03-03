if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker
        .register(`./sw.js`)
        .then((registration) => {
          console.log("Service worker registered");
        })
        .catch((error) => {
          console.log("Error registering service worker", error);
        });
    });
  }