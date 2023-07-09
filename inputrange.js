
rangeInput = document.getElementById("myRange");
corpo = document
    .getElementsByClassName("corpo")[0];
    
rangeInput.addEventListener("change", function() {
    corpo.style.filter = "brightness(" + rangeInput.value + "%)";
});
