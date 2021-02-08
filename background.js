

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.toogle_active_mode == true || request.toogle_active_mode == false) {
    chrome.storage.local.set({
      toogle_active_mode_status: request.toogle_active_mode
    });
  }

  if (request.clear_store) {
    chrome.storage.local.set({ forbid: [] });
    chrome.storage.local.set({ toogle_active_mode_status: false });
  }

  if (request.forbid) {
    if (request.forbid.status == "set") {
      chrome.storage.local.get(["forbid"], function (result) {
        if (!result.forbid[request.url_main]) {
          chrome.storage.local.set({
            forbid: [...result.forbid, request.forbid.url_main],
          });
        }
      });
    }
    if (request.forbid.status == "remove") {
      let array_banned_sites = [];
      chrome.storage.local.get(["forbid"], function (result) {
        if (result.length > 0) {
          for (let url_item of Object.keys(result.forbid)) {
            if (url_main != url_item) {
              array_banned_sites.push(url_item);
            }
          }
        }
      });

      chrome.storage.local.set({ forbid: [...array_banned_sites] });
    }
  }
});
