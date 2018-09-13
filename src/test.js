var bubble = function(target){

    var viewportWidth = $(document).width() - 5,
        viewportHeight = $(document).height() - 5; 

    var bubbleWidth = 500, 
        bubbleHeight = 400; 

    var element = $(target.get(0)),
        offset = element.offset(), 
        dimensions = {
            height: element.outerHeight(), 
            width: element.outerWidth()
        }; 

    var bubbleLeft = Math.parseInt(offset.left + dimensions.width / 2 - bubbleWidth / 2),
        bubbleTop = Math.parseInt(offset.top + dimensions.height + 10); 

    bubbleLeft = bubbleLeft > 0 ? bubbleLeft : 0; 
    
    var ele = $('div').css({
        'position': 'fixed',
        'left': 'bubbleLeft',
        'top': 'bubbleTop'
    }).appendTo('body');
}