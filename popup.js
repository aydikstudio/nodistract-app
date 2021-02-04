$('documet').ready(function() {

    chrome.storage.sync.get(['toogle_active_mode_status'], function(result) {
        if(result.toogle_active_mode_status) {
            $('#switch-to-mode').attr('checked', 'checked');
        } else {
            $('#switch-to-mode').removeAttr('checked');
        }

        new DG.OnOffSwitch({
            el: '#switch-to-mode',
            textOn: 'YES',
            textOff: 'ON',
            listener:function(name, checked){
                chrome.runtime.sendMessage({
                    toogle_active_mode: checked
                })
            }
        });
      }); 


})

