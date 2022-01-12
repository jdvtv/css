<script>
$function{
.const className.collapseButton=.documentgetElementById("collapse");
.const className.playlist =.documentgetElementById("playlist");

.collapseButton.onclick = function () {
  $if(className.collapseButton = "fas fa-angle-down") {
    className.collapseButton = "fas fa-angle-up";
    className.playlist.style.display = "block";
  }) $else({
    className.collapseButton = "fas fa-angle-down";
    className.playlist.style.display = "none";
  })
};
}};

</script>
