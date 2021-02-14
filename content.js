let url = document.location.href.split("?")[0];
let url_main = "";
let status_block;
if (url.slice(-1) == "/") {
  url = url.substring(0, url.length - 1);
}

url_main_item = url.split("/");
url_main = url_main_item[0] + "//" + url_main_item[1] + url_main_item[2];

let obj = {};

chrome.storage.local.get(["url_block"], function (result) {
  obj = result.url_block.find(
    (item) => item.url == url
  ) || {};

  if (obj.hasOwnProperty('arr')) {
    if (obj.arr.length > 0) {
      obj.arr.forEach(function(item) {
        console.log(item);
        $(item).wrap("block_distact").css("position", "relative");
        $(item).addClass("block_hide");
      });
    }
  }
});

chrome.storage.local.get(["forbid"], function (result) {
  if (result.forbid.find((item) => item == url_main)) {
    status_block = false;
    $("body").html("<div id='forbidden'>Forbidden</div>");
  } else {
    status_block = true;
  }
});

$("documet").ready(function () {
  if (true) {
    chrome.storage.local.get([url], function (result) {
      if (result) {
        $(result).each(function (key, value) {
          value.wrap("block_distact").css("position", "relative");
          value.addClass("block_hide");
        });
      }
    });

    chrome.storage.local.get(["toogle_active_mode_status"], function (result) {
      let status = result.toogle_active_mode_status;
      if (true) {
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
                obj_item_new.push("#" + value + " ");
              });
              obj_string = obj_item_new.join().replace(/,/g, "");
              if (obj.hasClass("block_hide")) {
                chrome.storage.local.get(["url_block"], function (result) {
                  let arr = [];
                  arr = result.filter(function (item, index) {
                    return item != obj.attr("id");
                  });

                  saveBannedUrl(url,  obj_string, 'delete');
                });
                obj.parent("block_distact").css("position", "");
                obj.removeClass("block_hide");
              } else {
                chrome.storage.local.get(["url_block"], function (result) {
                  saveBannedUrl(url,  obj_string, 'add');
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
              obj_string = obj_item_new.join().replace(/,/g, "").replace('.block_hover','');
              if (obj.hasClass("block_hide")) {
                chrome.storage.local.get(["url_block"], function (result) {
                  let arr = [];
                  arr = result.filter(function (item, index) {
                    return item != obj_string;
                  });
                  saveBannedUrl(url,  obj_string, 'delete');
                });
                obj.parent("block_distact").css("position", "");
                obj.removeClass("block_hide");
              } else {
                chrome.storage.local.get(["url_block"], function (result) {
                  saveBannedUrl(url,  obj_string, 'add');
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



    function saveBannedUrl(url, obj, act) {
      chrome.runtime.sendMessage({
        block_site: {
          url,
          obj,
          act
        }
      });
    }
  }
});
