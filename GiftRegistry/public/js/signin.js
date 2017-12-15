$(document).ready(function(){

    $('#forgotpassword').on('click',function(){
      $('#exampleModal').modal('show');
    });

    $('#forgotpassword').hover(function() {
          $(this).css('cursor','pointer');
      });

    $("#forgot-submit").click(function(){
        //alert("The paragraph was clicked.");
        var settings = {
          "async": true,
          "crossDomain": true,
          "url": "https://localhost:5051/forgotPassword?username="+$('#forgot-username').val(),
          "method": "POST",
          "headers": {
            "cache-control": "no-cache",
            "postman-token": "ac4c0af7-c823-b83f-4b44-8b751393d7c7",
          }
        }

        $.ajax(settings).done(function (response) {
          //alert(JSON.stringify(response, null, 2));
          updateNewPassword(response[0].Username,response[0].newpassword);
          $('#exampleModal').modal('hide');
        });

    });

    var updateNewPassword = function(username,password){
      var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://localhost:5051/changePassword?username="+username+"&password="+password,
        "method": "POST",
        "headers": {
          "cache-control": "no-cache",
          "postman-token": "ac4c0af7-c823-b83f-4b44-8b751393d7c7"
        }
      }

      $.ajax(settings).done(function (response) {

        //alert(JSON.stringify(response, null, 2));
      });
    }

    $("#signinbutton").click(function(){
        //alert("The paragraph was clicked.");
        var settings = {
          "async": true,
          "crossDomain": true,
          "url": "https://localhost:5051/submit?username="+$('#username').val()+"&password="+$('#password').val(),
          "method": "POST",
          "headers": {
            "cache-control": "no-cache",
            "postman-token": "ac4c0af7-c823-b83f-4b44-8b751393d7c7"
          }
        }

        $.ajax(settings).done(function (response) {
          //alert(JSON.stringify(response, null, 2));
            //If response is gzip, unzip first

          if(response.Role==null){
          alert("Please Enter The Correct Username and Password!");
          }

          if(response.Role=='admin'){

            document.cookie="session1="+$('#username').val()+"username";
            document.cookie="session2="+response.token;

            window.location.href = 'admin2.html';
          }
          if(response.Role=='user'){

            document.cookie="session1="+$('#username').val()+"username";
            document.cookie="session2="+response.token;

            window.location.href = 'customer.html';
          }
          console.log(response);

      });

    });
});
