/* Asynchronous Javascript across all pages */

function launchPosts(amount){
    document.getElementsByClassName("showmore")[0].style.display="block";
    if(postFeed - amount > -1){
        for(var x = postFeed; x > postFeed - amount; x--){       
            var thepost = document.createElement("div");
            $(thepost).addClass("post");
            
            var heading = document.createElement("h3");
            $(heading).text(posts[x].title);
            
            var username = document.createElement("span");
            $(username).addClass("byline");
            $(username).attr("onclick", "passId(" + posts[x].userId + ")");
            $(username).text("by @" + users[posts[x].userId - 1].username);
            
            var paragraph = document.createElement("p");
            $(paragraph).text(posts[x].body);
            
            var thecomments = document.createElement("span");
            $(thecomments).addClass("comment");
            $(thecomments).text("0 comment");
            
            
            $(thepost).append(heading);
            $(thepost).append(username);
            $(thepost).append(paragraph);
            //$(thepost).append(thecomments);
            
            $(thepost).insertBefore("header .showmore");
        }
        
        postFeed -= amount;
    }
    
    else{
        for(var x = postFeed; x >= 0; x--){       
            var thepost = document.createElement("div");
            $(thepost).addClass("post");
            
            var heading = document.createElement("h3");
            $(heading).text(posts[x].title);
            
            var username = document.createElement("span");
            $(username).addClass("byline");
            $(username).attr("onclick", "passId(" + posts[x].userId + ")");
            $(username).text("by @" + users[posts[x].userId - 1].username);
            
            var paragraph = document.createElement("p");
            $(paragraph).text(posts[x].body);
            
            var thecomments = document.createElement("span");
            $(thecomments).addClass("comment");
            $(thecomments).text("0 comment");
            
            
            $(thepost).append(heading);
            $(thepost).append(username);
            $(thepost).append(paragraph);
            //$(thepost).append(thecomments);
            
            $(thepost).insertBefore("header .showmore");
        }
        
        postFeed = 0;
        document.getElementsByClassName("showmore")[0].style.display="none";
    }
}

function launchUsers(){
    for(var x = 0; x < users.length; x++)
    {
        var container = document.createElement("div");
        var newline = document.createElement("br");
        
        var image = document.createElement("img");
        $(image).attr("src", "svg/user" + (x+1) + ".svg");
        
        var username = document.createElement("span");
        $(container).attr("onclick", "passId(" + users[x].id + ")");
        $(username).addClass("username");
        $(username).text("@" + users[x].username);
        
        $(container).append(image);
        $(container).append(newline);
        $(container).append(username);
        
        $(".users-container").append(container);
    }
}

function passId(value){
    localStorage.setItem("userid", value);
    window.location.href="profile.html";
}

function passAlbumId(value){
    localStorage.setItem("albumid", value);
    window.location.href="photos.html";
}

function launchUser(){
    var pic = document.createElement("div");
    $(pic).addClass("profile-pic-thumbnail");
    $(pic).attr("style", "background-image: url(\"svg/user" + (users[localStorage.getItem("userid") - 1].id) + ".svg\")");
    
    var nameContainer = document.createElement("div");
    
    var name = document.createElement("h4");
    $(name).text(users[localStorage.getItem("userid") - 1].name);
    
    var userName = document.createElement("span");
    $(userName).text("@" + users[localStorage.getItem("userid") - 1].username);
    
    $(nameContainer).append(name);
    $(nameContainer).append(userName);
    
    $(".profile").append(pic);
    $(".profile").append(nameContainer);
    
    launchProfileInfo();
}

function launchProfileInfo(){
    var labels = ["Email", "Address", "Phone", "Website", "Company"];
    
    addEmail();
    addAddress();
    addPhone();
    addWebsite();
    addCompany();
}

function addEmail(){
    var headerrule = document.createElement("hr");
    var label = document.createElement("h5");
    var desc = document.createElement("span");
    
    $(label).text("Email");
    $(desc).text(users[localStorage.getItem("userid") - 1].email);
    $(".profile").append(label);
    $(".profile").append(desc);
    $(".profile").append(headerrule);
}

function addAddress(){
    var headerrule = document.createElement("hr");
    var label = document.createElement("h5");
    var desc = document.createElement("span");
    
    $(label).text("Address");
    $(desc).text(users[localStorage.getItem("userid") - 1].address.street + ", " + users[localStorage.getItem("userid") - 1].address.suite + ", " + 
                users[localStorage.getItem("userid") - 1].address.city + ", " + users[localStorage.getItem("userid") - 1].address.zipcode);
    $(".profile").append(label);
    $(".profile").append(desc);
    $(".profile").append(headerrule);
}

function addPhone(){
    var headerrule = document.createElement("hr");
    var label = document.createElement("h5");
    var desc = document.createElement("span");
    
    $(label).text("Phone");
    $(desc).text(users[localStorage.getItem("userid") - 1].phone);
    $(".profile").append(label);
    $(".profile").append(desc);
    $(".profile").append(headerrule);
}

function addWebsite(){
    var headerrule = document.createElement("hr");
    var label = document.createElement("h5");
    var desc = document.createElement("span");
    
    $(label).text("Website");
    $(desc).text(users[localStorage.getItem("userid") - 1].website);
    $(".profile").append(label);
    $(".profile").append(desc);
    $(".profile").append(headerrule);
}

function addCompany(){
    var headerrule = document.createElement("hr");
    var label = document.createElement("h5");
    var name = document.createElement("span");
    var phrase = document.createElement("span");
    var bs = document.createElement("span");
    var newline = document.createElement("br");
    var newline1 = document.createElement("br");
    
    $(label).text("Company");
    $(name).text(users[localStorage.getItem("userid") - 1].company.name);
    $(".profile").append(label);
    $(".profile").append(name);
    
    $(".profile").append(newline);
    $(phrase).text(users[localStorage.getItem("userid") - 1].company.catchPhrase);
    $(".profile").append(phrase);
    
    $(".profile").append(newline1);
    $(bs).text(users[localStorage.getItem("userid") - 1].company.bs);
    $(".profile").append(bs);
}

function launchPhotos(amount){
    if(amount != -1)
        document.getElementsByClassName("showmore")[1].style.display="block";
    
	if(photos.length - photoFeed > amount && amount != -1){
    	for(var x = photoFeed; x < photoFeed + amount; x++){
            var thephoto = document.createElement("div");
            $(thephoto).attr("style", "background-image: url(\"" + photos[x].thumbnailUrl + "\");");
            $(thephoto).attr("onclick", "showPopUp(true, " + photos[x].id + ")");
            $(".photofeed").append(thephoto);
        }
      	
      	photoFeed += amount;
    }
  
  	else{
        if(localStorage.getItem("albumid") != -1)
            $("#albumname").text(albums.title);
    	for(var x = photoFeed; x < photos.length; x++){ 	
            var thephoto = document.createElement("div");
            if(amount == -1){
                $(thephoto).attr("width", "293px");
            }
            
            $(thephoto).attr("style", "background-image: url(\"" + photos[x].thumbnailUrl + "\");");
            $(thephoto).attr("onclick", "showPopUp(true, " + photos[x].id + ")");
            $(".photofeed").append(thephoto);
        }
    }
}

function launchAlbums(){
	for(var i = albums.length - 1; i >= 0; i--){
      	var thealbum = document.createElement("div");
      	var thetitle = document.createElement("h3");
      
      	$(thetitle).text(albums[i].title);  
        $(thealbum).append(thetitle);
        $(thealbum).addClass("container");
        $(thealbum).attr("onclick", "passAlbumId(" + albums[i].id + ")");
      	$(".albumfeed").append(thealbum);
    }
}

function setProfileDefault(){
    document.getElementsByClassName("newsfeed")[0].style.overflowY = "auto";
    document.getElementsByClassName("newsfeed")[0].style.height = "inherit";
    document.getElementsByClassName("newsfeed")[0].style.width = "65%";
    document.getElementsByTagName("header")[0].style.padding = "40px 150px";
}

function profileTab(action){
	if(action == 1){
    	document.getElementsByClassName("newsfeed")[0].style.display = "flex";
      	document.getElementsByClassName("photofeed")[0].style.display = "none";
      	document.getElementsByClassName("albumfeed")[0].style.display = "none";
        
        $(".newsfeed").addClass("column-start");
        $("#posts").addClass("active");
        $("#albums").removeClass("active");
    }
  
  	else{
        document.getElementsByClassName("albumfeed")[0].style.display = "flex";
        document.getElementsByClassName("newsfeed")[0].style.display = "none";
        document.getElementsByClassName("photofeed")[0].style.display = "none";
        
        $(".albumfeed").addClass("column-start");
        $("#albums").addClass("active");
        $("#posts").removeClass("active");
    }
}