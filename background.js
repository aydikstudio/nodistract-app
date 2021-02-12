chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (
    request.toogle_active_mode == true ||
    request.toogle_active_mode == false
  ) {
    chrome.storage.local.set({
      toogle_active_mode_status: request.toogle_active_mode,
    });
  }

  if (request.clear_store) {
    if (confirm("Are you sure to clear store?")) {
      chrome.storage.local.set({ forbid: [] });
      chrome.storage.local.set({ toogle_active_mode_status: false });
      chrome.storage.local.set({ url_block: [] });
    }
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

  if (request.block_site) {
    if (request.block_site.act == "delete") {
      let all_url = [];
      let array_banned_blocks_sites = {
        url: "",
        arr: [],
      };
      chrome.storage.local.get(["url_block"], function (result) {
        all_url = result;
        if (result.length > 0) {
          for (let url_item of Object.keys(result.url)) {
            if (
              result.block_site.url.find(
                (item) => item == request.block_site.obj
              )
            ) {
              array_banned_blocks_sites.arr.push(url_item);
            }

            array_banned_blocks_sites.url = request.block_site.url;
          }
        }
      });
      console.log([...all_url, array_banned_blocks_sites]);

      chrome.storage.local.set({
        url_block: [...all_url, array_banned_blocks_sites],
      });
    }

    if (request.block_site.act == "add") {
      let all_url = [];
      let array_banned_blocks_sites = {
        url: request.block_site.url,
        arr: [],
      };
      chrome.storage.local.get(["url_block"], function (result) {
        all_url = result.url_block.filter(
          (item) => item.url != request.block_site.url
        );
        let obj = result.url_block.find(
          (item) => item.url == request.block_site.url
        );

        if (obj.arr.length > 0) {
          for (let url_item of Object.keys(obj.arr)) {
            console.log(url_item)
            array_banned_blocks_sites.arr.push(url_item);
          }
        }
        array_banned_blocks_sites.arr.push(request.block_site.obj);
        save(all_url, array_banned_blocks_sites);
      });
    }
  }

  function save(all_url, arr) {
    // console.log(all_url);
    // console.log(arr);
    chrome.storage.local.set({
      url_block: [...all_url, arr],
    });
  }
});
