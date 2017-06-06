 $(document).ready(function(){
 var isAuth = false;
 var errorBox = $(".alert-danger");
 var successBox = $(".alert-success");

 successBox.slideUp(1);
 errorBox.slideUp(1);

 $("#login").click(function(){

    // console.log({username : $("#username").val(), password : $("#password").val()});

    $.post("/login", {username : $("#username").val(), password : $("#password").val()} , function(data){
    // $("#info").append("<p>" + data['status'] + " || " + data['msg'] + "</p>")
      if(data['status']){
        successBox.slideUp(1);
        errorBox.slideUp(1);
        successBox.html(data['msg']).slideDown(500);
        getInfo();
     }
      else{
        successBox.slideUp(1);
        errorBox.html(data['msg']).slideDown(500);
        getInfo();
      }
   })
 })

 $("#signup").click(function(){
    $.post("/signup", {username : $("#signupUser").val(), password : $("#signupPass").val()} , function(data){
    // $("#info").append("<p>" + data['status'] + " || " + data['msg'] + "</p>")
    if(data['status']){
     successBox.css('display','none');
     errorBox.css('display','none');
     successBox.html(data['msg']).slideDown(500);
      }
    })
 })

 $("#submitComment").click(function(){
     if(isAuth){
         $.post("/submitComment" , {msg: $("#msg").val()}, function(data){
         console.log(data);
         // $("#info").append("<p>" + data['status'] + " || " + data['msg'] + "</p>")
         getComments();
         });
    }
    else{
        alert("nanana!!!");
    }
 });

 $("#logout").click(function(){
         $.post("/logout", function(data){
             // $("#info").append("<p>" + data['status'] + " || " + data['msg'] + "</p>")
             if(data['status']){
                 successBox.slideUp(1);
                 errorBox.slideUp(1);
                 successBox.html(data['msg']).slideDown(500);
                 getInfo();
             }
         })
     });


 var getInfo = function(){
    $("#commnetBox").empty();

    $.post("/getInfo", function(data){
    if(data['status']){
      isAuth = true;
      getComments();
      $("#auth").html(JSON.stringify(data['status']));
    }
    else{
      $("#auth").html("unKnown user!!");
    }
    });
 }

 var getComments = function(){
  $.post("/getComments", {}, function(data){
  // console.log(data);
  // for(var attr in data){
  //     $("#commnetBox").append("<p>" + attr + " mige : " + data[attr].toString() + "</p>")
  // }
  data.forEach(function(cm, index){
  console.log(index,cm);
  $("#commnetBox").append("<p>" + cm.user + " mige : " + cm.text + "</p>")
    });
   });
 }


 getInfo();
 });