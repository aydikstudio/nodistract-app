$('documet').ready(function() {

    chrome.storage.sync.get(['toogle_active_mode_status'], function(result) {
        let status = result.toogle_active_mode_status;

        if(status) {
            $( "div" ).click(function() {
                if($(this).attr('id')) {
                    if($(this).hasClass('block_hide')) {
                        $(this).parent('div').css('position', '');
                        $(this).removeClass('block_hide'); 
                    } else {
                        $(this).attr('title', $(this).attr('id'));
                        $(this).parent('div').css('position', 'relative');
                        $(this).addClass('block_hide'); 
                    }
                }
                    else if($(this).attr('class')) {
                        if($(this).hasClass('block_hide')) {
                            $(this).parent('div').css('position', '');
                            $(this).removeClass('block_hide'); 
                        } else {
                            $(this).attr('title', $(this).attr('class'));
                            $(this).parent('div').css('position', 'relative');
                            $(this).addClass('block_hide'); 
                        }
                    }
                
              });
            
            $('div')
            .mouseover(function() {
                if($(this).attr('id')) {
                    $(this).attr('title', $(this).attr('id'));
                    $(this).parent('div').css('position', 'relative');
                    $(this).addClass('block_hover'); 
                }
                    else if($(this).attr('class')) {
                        $(this).attr('title', $(this).attr('class'));
                        $(this).parent('div').css('position', 'relative');
                        $(this).addClass('block_hover'); 
                    }
            })
            .mouseout(function(){    
                if($(this).hasClass('block_hover')) {
                    $(this).parent('div').css('position', '');
                    $(this).removeClass('block_hover');
                }       
            });
        
            
        }        
      }); 

});