$("documet").ready(function () {
  let url_main = "";
  let url = "";

  chrome.tabs.query(
    { active: true, windowId: chrome.windows.WINDOW_ID_CURRENT },
    function (tabs) {
      
      url = tabs[0].url;
      url_main_item = tabs[0].url.split("/");
      url_main = url_main_item[0] + "//" + url_main_item[1] + url_main_item[2];
      if (url_main.slice(-1) == "/") {
        url_main = url.substring(0, url.length - 1);
      }
    }
  );
  chrome.storage.local.get(["forbid"], function (result) {
    if (result.forbid.find((item) => item == url_main)) {
      $("#forbid_allow").text("allow");
      $("#forbid_allow").css("color", "green");
    } else {
      $("#forbid_allow").text("forbid");
      $("#forbid_allow").css("color", "red");
    }
  });

  $("#clear_store").click(function (e) {
    chrome.runtime.sendMessage({
      clear_store: true,
    });
    refresh();
  });

  $("#forbid_allow").click(function (e) {
    if ($("#forbid_allow").text() == "forbid") {
      chrome.runtime.sendMessage({
        forbid: {
          status: "set",
          url_main,
        },
      });
      $("#forbid_allow").text("allow");
      $("#forbid_allow").css("color", "green");
    } else if ($("#forbid_allow").text() == "allow") {
      chrome.runtime.sendMessage({
        forbid: {
          status: "remove",
          url_main,
        },
      });
      $("#forbid_allow").text("forbid");
      $("#forbid_allow").css("color", "red");
    }
    refresh();
  });

  chrome.storage.local.get(["toogle_active_mode_status"], function (result) {
    new DG.OnOffSwitch({
      el: "#switch-to-mode",
      textOn: "YES",
      checked: result.toogle_active_mode_status,
      textOff: "ON",
      listener: function (name, checked) {
        chrome.runtime.sendMessage({
          toogle_active_mode: checked,
        });
        refresh();
      },
    });
  });

  function refresh() {
    chrome.tabs.getSelected(null, function (tab) {
      var code = "window.location.reload();";
      chrome.tabs.executeScript(tab.id, { code: code });
    });
  }

});
