// A $( document ).ready() block.
$(document).ready(function() {
    
    
    var maxLength = 140;
    $('textarea').keyup(function() {
        
    var length = $(this).val().length;
   
    $('#chars').text(length);
        
    });
});

