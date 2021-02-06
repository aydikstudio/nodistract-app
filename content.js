$("documet").ready(function () {
  let url = document.location.href.split("?")[0];

  chrome.storage.local.get([url], function (result) {
    console.log(result);
    if (result) {
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
            let obj_string = "";
            let obj_item = obj.attr("id").split(" ");
            let obj_item_new = [];
            $.each(obj_item, function (index, value) {
              obj_item_new.push("." + value + " ");
            });
            obj_string = obj_item_new.join().replace(/,/g, "");
            if (obj.hasClass("block_hide")) {
              chrome.storage.local.get(['url_block'], function (result) {
                let arr = [];
                arr = result.filter(function (item, index) {
                  return item != obj.attr("id");
                });

                saveLocal('url_block', url, arr, 0)
              });
              obj.parent("block_distact").css("position", "");
              obj.removeClass("block_hide");
            } else {
              chrome.storage.local.get(['url_block'], function (result) {
                saveLocal('url_block', url, result, obj_string)
              });
              obj.wrap("block_distact").css("position", "relative");
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
              chrome.storage.local.get(['url_block'], function (result) {
                let arr = [];
                arr = result.filter(function (item, index) {
                  return item != obj_string;
                });
                saveLocal('url_block', url, arr, 0);
              });
              obj.parent("block_distact").css("position", "");
              obj.removeClass("block_hide");
            } else {
              chrome.storage.local.get(['url_block'], function (result) {
                saveLocal('url_block', url, [], obj_string)
              });
              obj.wrap("block_distact").css("position", "relative");
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
              obj.parent("div").css("position", "relative");
              obj.addClass("block_hover");
            } else if (obj.attr("class")) {
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


  function saveLocal(id, url, arr_old, obj) {
   
    if(obj == 0) {
      chrome.storage.local.set({ url: [...arr_old] });
    } else {
      chrome.storage.local.set({ url: [...arr_old, obj] });
    } 
  }
});
