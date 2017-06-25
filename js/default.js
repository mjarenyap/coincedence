/* Default script for all pages */
var posts, albums, photos, users;
var postFeed = 0, photoFeed = 0, albumFeed = 0;

window.onscroll = function(){
    checkScroll();
};

function readyHomePage(){
    localStorage.setItem("albumid", -1);
    
    $.get("https://jsonplaceholder.typicode.com/posts", function(data){
        posts = data;
        postFeed = posts.length - 1;
    });
    
    $.get("https://jsonplaceholder.typicode.com/albums", function(data){
        albums = data;
    });
    
    $.get("https://jsonplaceholder.typicode.com/photos", function(data){
        photos = data;
    });
    
    $.get("https://jsonplaceholder.typicode.com/users", function(data){
        users = data;
    });
    
  	document.getElementsByClassName("photofeed")[0].style.display="flex";
    setTimeout(function(){
        launchPosts(10);
      	launchPhotos(33);
        launchUsers();
    }, 1500);
}

function readyProfilePage(){
    localStorage.setItem("albumid", -1);
    $.get("https://jsonplaceholder.typicode.com/users/" + localStorage.getItem("userid") + "/posts", function(data){
        posts = data;
        postFeed = posts.length - 1;
    });
  
  	$.get("https://jsonplaceholder.typicode.com/users/" + localStorage.getItem("userid") + "/albums", function(data){
        albums = data;
    });
  
  	$.get("https://jsonplaceholder.typicode.com/users/" + localStorage.getItem("userid") + "/photos", function(data){
        photos = data;
    });
    
    $.get("https://jsonplaceholder.typicode.com/users/", function(data){
        users = data;
    });
    
    setProfileDefault();
    setTimeout(function(){
        launchPosts(5);
        launchAlbums();
        launchUser();
    }, 1500);
}

function readyPhotoPage(){
    if(localStorage.getItem("albumid") != -1){
        $.get("https://jsonplaceholder.typicode.com/albums/" + localStorage.getItem("albumid"), function(data){
            albums = data; 
        });

        $.get("https://jsonplaceholder.typicode.com/albums/" + localStorage.getItem("albumid") + "/photos", function(data){
            photos = data;
        });   
    }
    
    else{
        $.get("https://jsonplaceholder.typicode.com/albums", function(data){
            albums = data; 
        });

        $.get("https://jsonplaceholder.typicode.com/photos", function(data){
            photos = data;
        });
    }
    
    $.get("https://jsonplaceholder.typicode.com/users", function(data){
        users = data;
    });
    
    $.get("https://jsonplaceholder.typicode.com/posts", function(data){
        posts = data;
    });
    
    setTimeout(function(){
        launchPhotos(-1);
    }, 1500);
}

function checkScroll(){
    if(document.body.scrollTop > 200)
        $("#top").addClass("reveal-top");
        
    else $("#top").removeClass("reveal-top");
}

function backToTop(){
    $("body").animate({scrollTop: 0}, 500);
}

function preventScrolling(state){
    if(state == true)
        document.getElementsByTagName("body")[0].style.overflowY = "hidden";
    
    else document.getElementsByTagName("body")[0].style.overflowY = "auto";
}

function showPopUp(state, photoid){
    if(state == true){
        $("#popup-container").empty();
        var closebutton = document.createElement("img");
        var thephoto = document.createElement("img");
        var thetitle = document.createElement("h3");
        var thealbumtitle = document.createElement("p");
        var theuser = document.createElement("p");
        
        $(closebutton).attr("src", "images/close.png");
        $(closebutton).attr("onclick", "showPopUp(false, -1)");
        $(closebutton).addClass("close");
        $(thephoto).attr("src", photos[(photoid - photos[0].id)].url);
        $(thetitle).text(photos[(photoid - photos[0].id)].title);
        
        if(albums.length > 1){
            $(thealbumtitle).append("<span>Album: </span>" + albums[photos[photoid-1].albumId - 1].title);
            $(thealbumtitle).attr("onclick", "passAlbumId(" + albums[photos[photoid-1].albumId-1].id + ")"); 
            $(theuser).append("<span>Uploaded by: </span>@" + users[albums[photos[photoid-1].albumId-1].userId-1].username);
            $(theuser).attr("onclick", "passId(" + users[albums[photos[photoid-1].albumId-1].userId-1].id + ")");
        }
        
        else{
            $(thealbumtitle).append("<span>Album: </span>" + albums.title);
            $(thealbumtitle).attr("onclick", "passAlbumId(" + albums.id + ")");
            $(theuser).append("<span>Uploaded by: </span>@" + users[albums.userId-1].username);
            $(theuser).attr("onclick", "passId(" + albums.userId + ")");
        }
        
        $("#popup-container").append(closebutton);
        $("#popup-container").append(thephoto);
        $("#popup-container").append("<br/>");
        $("#popup-container").append(thetitle);
        $("#popup-container").append(thealbumtitle);
        $("#popup-container").append(theuser);
        
        document.getElementById("popup-container").style.top = "0";
    }
    
    else document.getElementById("popup-container").style.top = "100%";
}

function search(state){
    if(state == true){
        var found = false;
        $("#searchfeed").empty();
        var input = document.getElementsByClassName("search")[0].value;
        $("#searchfeed").show(500);
        
        for(var x = 0; x < posts.length; x++){
            if(posts[x].title.includes(input)){
                found = true;
                var postResult = document.createElement("p");
                $(postResult).text(posts[x].title);
                $(postResult).attr("onclick", "passId(" + posts[x].userId + ")");
                $(postResult).append("<span> (post)</span>");
                $("#searchfeed").append(postResult);
                $("#searchfeed").append("<hr/>");
            }
        }
        
        for(var x = 0; x < users.length; x++){
            if(users[x].username.includes(input)){
                found = true;
                var userResult = document.createElement("p");
                $(userResult).text(users[x].username);
                $(userResult).attr("onclick", "passId(" + users[x].id + ")");
                $(userResult).append("<span> (user)</span>");
                $("#searchfeed").append(userResult);
                $("#searchfeed").append("<hr/>");
            }
        }
        
        for(var x = 0; x < albums.length; x++){
            if(albums[x].title.includes(input)){
                found = true;
                var albumResult = document.createElement("p");
                $(albumResult).text(albums[x].title);
                $(albumResult).attr("onclick", "passAlbumId(" + albums[x].id + ")");
                $(albumResult).append("<span> (album)</span>");
                $("#searchfeed").append(albumResult);
                $("#searchfeed").append("<hr/>");
            }
        }
        
        for(var x = 0; x < photos.length; x++){
            if(photos[x].title.includes(input)){
                found = true;
                var photoResult = document.createElement("p");
                $(photoResult).text(photos[x].title);
                $(photoResult).attr("onclick", "showPopUp(true, " + photos[x].id + ")");
                $(photoResult).append("<span> (photo)</span>");
                $("#searchfeed").append(photoResult);
                $("#searchfeed").append("<hr/>");
            }
        }
        
        if(found == false){
            var noresults = document.createElement("p");
            $(noresults).text("No results for \"" + input + "\"");
            $("#searchfeed").append(noresults);
        }
    }
    
    else{
        setTimeout(function(){
            $("#searchfeed").hide(500);
            $("#searchfeed").empty();
            document.getElementsByClassName("search")[0].value = "";
        }, 300);
    }
}