chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
   chrome.storage.local.set({toogle_active_mode_status: request.toogle_active_mode});
})
