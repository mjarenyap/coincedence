/* Javascript for home mediaquery */

window.onresize = function(){
    if(window.innerWidth <= 1008){
        $(".newsfeed").removeAttr("onmouseover");
        $(".newsfeed").removeAttr("onmouseout");
    }
    
    else{
        $(".newsfeed").attr("onmouseover", "preventScrolling(true)");
        $(".newsfeed").attr("onmouseout", "preventScrolling(false)");
    }
}