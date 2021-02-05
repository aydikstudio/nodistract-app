$("documet").ready(function () {
  let url = document.location.href.split("?")[0];

  chrome.storage.local.get([url], function (result) {
    if (result) {
      console.log(result);
      $(result).each(function (key, value) {
        value.parent("div").css("position", "relative");
        value.addClass("block_hide");
      });
    }
  });

  chrome.storage.local.get(["toogle_active_mode_status"], function (result) {
    let status = result.toogle_active_mode_status;
    if (status) {
      $("a").each(function () {
        $(this).removeAttr("href");
      });
      $(document).click(function (e) {
        let obj = $(e.target);
        if (obj) {
          if (obj.attr("id")) {
            if (obj.hasClass("block_hide")) {
              let obj_string = "";
              let obj_item = obj.attr("id").split(" ");
              let obj_item_new = [];
              $.each(obj_item, function (index, value) {
                obj_item_new.push("." + value + " ");
              });
              obj_string = obj_item_new.join().replace(/,/g, "");

              chrome.storage.local.get([url], function (result) {
                let arr = [];
                arr = result.filter(function (item, index) {
                  return item != obj.attr("id");
                });

                chrome.storage.local.set({ url: [...arr, obj_string] });
              });
              obj.parent("div").css("position", "");
              obj.removeClass("block_hide");
            } else {
              chrome.storage.local.set({ url: [obj.attr("id")] });
              obj.parent("div").css("position", "relative");
              obj.addClass("block_hide");
            }
          } else if (obj.attr("class")) {
            let obj_string = "";
            let obj_item = obj.attr("class").split(" ");
            let obj_item_new = [];
            $.each(obj_item, function (index, value) {
              obj_item_new.push("." + value + " ");
            });
            obj_string = obj_item_new.join().replace(/,/g, "");
            if (obj.hasClass("block_hide")) {
              chrome.storage.local.get([url], function (result) {
                let arr = [];
                arr = result.filter(function (item, index) {
                  return item != obj_string;
                });
                chrome.storage.local.set({ url: [...arr, obj_string] });
              });
              obj.parent("div").css("position", "");
              obj.removeClass("block_hide");
            } else {
              chrome.storage.local.get([url], function (result) {
                chrome.storage.local.set({ url: [...result, obj_string] });
              });
              obj.parent("div").css("position", "relative");
              obj.addClass("block_hide");
            }
          }
        }
      });

      $(document)
        .mouseover(function (e) {
          let obj = $(e.target);
          if (obj) {
            if (obj.attr("id")) {
              obj.attr("title", obj.attr("id"));
              obj.parent("div").css("position", "relative");
              obj.addClass("block_hover");
            } else if (obj.attr("class")) {
              obj.attr("title", obj.attr("class"));
              obj.parent("div").css("position", "relative");
              obj.addClass("block_hover");
            }
          }
        })
        .mouseout(function (e) {
          let obj = $(e.target);
          if (obj) {
            if (obj.hasClass("block_hover")) {
              obj.parent("div").css("position", "");
              obj.removeClass("block_hover");
            }
          }
        });
    }
  });
});
