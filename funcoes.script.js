   <script type="text/javascript">

      var prevScrollpos = window.pageYOffset;
      window.onscroll = function() {

      var currentScrollpos = window.pageYOffset;
      if(prevScrollpos > currentScrollpos) {
            document.getElementById("navbar").style.top = "0";
      } else {
            document.getElementById("navbar").style.top = "-100px";
      }

      prevScrollpos = currentScrollpos;

      }

$(window).scroll(function() {
    if ($(window).scrollTop() > 10) {
        $('#navbar').addClass('floatingNav');
    } else {
        $('#navbar').removeClass('floatingNav');
    }
});
      </script>
