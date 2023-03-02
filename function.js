<script>
$(document).ready(function () {
 
    /* initially hide product list items */
    $(".jdvtv-list li").hide();
 
    /* highlight matches text */
    var highlight = function (string) {
        $(".jdvtv-list li.match").each(function () {
            var matchStart = $(this).text().toLowerCase().indexOf("" + string.toLowerCase() + "");
            var matchEnd = matchStart + string.length - 1;
            var beforeMatch = $(this).text().slice(0, matchStart);
            var matchText = $(this).text().slice(matchStart, matchEnd + 1);
            var afterMatch = $(this).text().slice(matchEnd + 1);
            $(this).html(beforeMatch + "<em>" + matchText + "</em>" + afterMatch);
        });
    };
 
 
    /* filter products */
    $(".input-jdvtv").on("keyup click input", function () {
        if (this.value.length > 0) {
            $(".jdvtv-list li").removeClass("match").hide().filter(function () {
                return $(this).text().toLowerCase().indexOf($(".input-jdvtv").val().toLowerCase()) != -1;
            }).addClass("match").show();
            highlight(this.value);
            $(".jdvtv-list").show();
        }
        else {
            $(".jdvtv-list, .jdvtv-list li").removeClass("match").hide();
        }
    });
 
 
});
</script>
<script>
$(window).scroll(function() {
    if ($(window).scrollTop() > 10) {
        $('#navbar').addClass('floatingNav');
    } else {
        $('#navbar').removeClass('floatingNav');
    }
});
</script>
<script>
$(window).on('load',function(){
	setTimeout(function(){ // allowing 3 secs to fade out loader
	$('.page-loader,.page-loader2').fadeOut('slow');
	},3500);
});</script>

<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.2/jquery.min.js"></script>
<script>
$( document ).ready(function() {
     setTimeout(carregar, 5000);
});

function carregar() {
    $('footer').show();
}
</script>

<script>
//
const toggle = document.getElementById("toggle");
const nav2 = document.getElementById("nav2");
//
const toggle2 = document.getElementById("toggle2");
const jdvsearch = document.getElementById("jdvsearch");

//
const fonts = document.querySelector(".fonts-group");
const fonts_options = document.querySelectorAll(".fonts-group ");

const allOptions = document.querySelector(".all-options");

const removeActiveFromAll = (all) =>
  all.forEach((option) => option.classList.remove("active"));

const colorsClasses = ["black", "red", "blue", "white"];
const fontsClasses = ["poppins", "montserrat"];

allOptions.addEventListener("click", (e) => {
  if (e.target.dataset.color) {
    removeActiveFromAll(colors_options);
    e.target.classList.add("active");
    document.body.classList.remove(...colorsClasses);
    return document.body.classList.add(e.target.dataset.color);
  } else if (e.target.dataset.font) {
    removeActiveFromAll(fonts_options);
    e.target.classList.add("active");
    document.body.classList.remove(...fontsClasses);
    return document.body.classList.add(e.target.dataset.font);
  }
});

// NAV2
toggle.addEventListener("click", () => nav2.classList.toggle("active"));

//
toggle2.addEventListener("click", () => jdvsearch.classList.toggle("active"));
//
const classes = [];
// if (localStorage.theme !== undefined) {
document.body.classList.add(localStorage.theme || "three");
// }
document.querySelectorAll(".cont ul li").forEach((el, i) => {
  classes.push(el.getAttribute("data-color"));
  el.addEventListener("click", function () {
    document.body.classList.remove(...classes);

document.body.classList.add(el.getAttribute("data-color"));
    localStorage.theme = el.getAttribute("data-color");
  });
});
</script>

<script>
function changeBgColor(color){
    // if provided color, set color to LS
    if (color) window.localStorage.setItem('bgColor', color);
    // if no provided color, check LS for color, and if no color in LS, fail silently
    else if (!(color = window.localStorage.getItem('bgColor'))) return;

    // update the page
    var elements = document.getElementsByClassName("column1")
    for (var i = 0; i < elements.length; i++) {
        elements[i].style.background=color;
    }
}

window.addEventListener('DOMContentLoaded', () => changeBgColor());
</script>

<script>
function changeBgColor2(color){
    // if provided color, set color to LS
    if (color) window.localStorage.setItem('bgColor2', color);
    // if no provided color, check LS for color, and if no color in LS, fail silently
    else if (!(color = window.localStorage.getItem('bgColor2'))) return;

    // update the page
    var elements = document.getElementsByClassName("nav")
    for (var i = 0; i < elements.length; i++) {
        elements[i].style.background=color;
    }
}

window.addEventListener('DOMContentLoaded', () => changeBgColor2());
</script>
