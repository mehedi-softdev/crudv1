// popup msg show action start
let resetPopupWindow = () => {
    $(".message").css("visibility", "hidden");
    $(".message").css("left", "-100%");
}

let showPopupMsg = () => {
    $(".message").css("visibility", "visible");
    $(".message").css("left", "0px");

    setInterval(resetPopupWindow, 2000);
}
// popup msg show action end