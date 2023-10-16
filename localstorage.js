$(window).load(function(){
    getColour = localStorage.background;
       $("#body3").addClass(getColour); 
        $('.palette').click(function () {
            $("#body3").removeClass(getColour);
            localStorage.removeItem('background');
            var setColour = $(this).attr("id");
            $("#body3").addClass(setColour);
            localStorage.setItem("background", setColour);
});
});
