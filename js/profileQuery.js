/* Javascript for profile mediaquery */

window.onresize = function(){
    if(window.innerWidth <= 1008){
        $("header").removeAttr("style");
        document.getElementsByClassName("newsfeed")[0].style.width="100%";
        document.getElementsByClassName("albumfeed")[0].style.width="100%";
    }
    
    else{
        $("header").attr("style", "padding: 40px 150px;");
        document.getElementsByClassName("newsfeed")[0].style.width="65%";
        document.getElementsByClassName("albumfeed")[0].style.width="65%";
    }
}