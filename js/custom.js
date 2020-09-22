$(document).ready(function () {
	
    // Owl Carousel
    var owl = $(".owl-carousel");
    owl.owlCarousel({
        items: 1,
        margin: 10,
        loop: true,
        nav: true
    });
});

$( ".form_radio_btn " ).click(function() {
    url = this.getElementsByTagName("input")[0].value;
    document.location.href = url;
    // $(location).prop('href', this.getElementsByTagName("input")[0].value);
});

function stateChange() {
    var obj = document.getElementById('dropdown');

    obj.style.display =
        (obj.style.display == "none" ? "grid" : "none");
}


function check2() {
	url = $('.offers .active input').val();
    document.location.href = url;
}
$(".buttom__pay").click(function(e) {
    e.preventDefault();
    $(".buttom__pay").removeClass('active_b');
    $(this).addClass('active_b');
});
$(window).load(function() {
  var images = $('img');
    images.each(function(i) {
      $(this).width($(this).width() / 2);
    });
});