$(document).ready(function(){
    $('#right').click(function(){
        $('.weather').animate({
            scrollTop: 0
        })
    });
    $('#nextdaysTwo').click(function(){
        $('#next-days').addClass('notactive');
        $('#next-days').removeClass('active');
    })
})
