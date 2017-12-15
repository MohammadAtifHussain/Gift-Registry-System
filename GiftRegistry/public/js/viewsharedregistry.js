$(document).ready(function(){

  $('#logout').on('click',function(){


    var settings = {
      "async": true,
      "crossDomain": true,
      "url": "https://localhost:5051/deleteToken",
      "method": "POST",
      "headers": {
        "cache-control": "no-cache",
        "postman-token": "ac4c0af7-c823-b83f-4b44-8b751393d7c7"
      }
    }
      //$(this).attr('id').prop("onclick", null);
      $.ajax(settings).done(function (response) {
     // alert(JSON.stringify(response));

      alert('You have been logged out. ');
      window.location.href = 'index.html';
      document.cookie = 'session1=;expires=Thu, 01 Jan 1970 00:00:01 GMT;'
//$(this).click("disabled",true);

    });



  });

  $('#edit_reg').on('click',function(){
    window.location.href = 'customer-viewregistry.html';
  });

  $('#share_reg').on('click',function(){
    $('#shareModal').modal('show');
  });


  $('#make_public').on('click',function(){
    $('#publicModal').modal('show');
    var username = document.cookie.match(/session1=(.*?)username/g).toString();
    //alert(typeof(username));
    username = username.replace("username","").replace("session1=","");
    var settings = {
      "async": true,
      "crossDomain": true,
      "url": "https://localhost:5051/makePublicRegistry?username="+username,
      "method": "POST",
      "headers": {
        "cache-control": "no-cache",
        "postman-token": "ac4c0af7-c823-b83f-4b44-8b751393d7c7"
      }
    }
      //$(this).attr('id').prop("onclick", null);
      $.ajax(settings).done(function (response) {
     // alert(JSON.stringify(response));
        $('#publicModal').modal('show');
  //$(this).click("disabled",true);

    });



  });


$('#customer_home').on('click',function(){
    window.location.href = 'customer.html';
    });

  $("body").on("click", "tr", function () {

    if($(this).find('.purchaser').text()!='None'){
      alert('Item has already been assigned to user: '+$(this).find('.purchaser').text()+'. You can\'t assign it agin.' );
    }

    else{
    var friendusername = document.cookie.match(/session1=(.*?)username/g).toString();
   // alert(typeof(username));
    friendusername = username.replace("username","").replace("session1=","");
    var myusername=$(this).attr('id');
    var id = $(this).find('.id').text();
    console.log(this);

    var settings = {
      "async": true,
      "crossDomain": true,
      "url": "https://localhost:5051/assignItem?username="+myusername+"&friendusername="+friendusername+"&id="+id,
      "method": "POST",
      "headers": {
        "cache-control": "no-cache",
        "postman-token": "ac4c0af7-c823-b83f-4b44-8b751393d7c7"
      }
    }
      //$(this).attr('id').prop("onclick", null);
      $.ajax(settings).done(function (response) {
     // alert(JSON.stringify(response));

      alert('Item has been assigned to you. ');
      location.reload();
//$(this).click("disabled",true);

    });
        }
  });


  $('#form-share-username-submit').on('click',function(){
    var currentusername = document.cookie.match(/session1=(.*?)username/g).toString();
   // alert(typeof(currentusername));
    currentusername = currentusername.replace("username","").replace("session1=","");
    var settings = {
      "async": true,
      "crossDomain": true,
      "url": "https://localhost:5051/shareRegistry?myusername="+currentusername+"&friendusername="+$('#form-share-username').val(),
      "method": "POST",
      "headers": {
        "cache-control": "no-cache",
        "postman-token": "ac4c0af7-c823-b83f-4b44-8b751393d7c7"
      }
    }

    $.ajax(settings).done(function (response) {
     // alert(JSON.stringify(response));
      alert('Registry Shared With ' +$('#form-share-username').val());
      $('#shareModal').modal('hide');
    });


    });


  var username = document.cookie.match(/session1=(.*?)username/g).toString();
  //alert(typeof(username));
  username = username.replace("username","").replace("session1=","");

  if(username==null){
    alert("You are being redirected to the homepage as you haven't signed in");
    window.location.href = 'index.html';
  }

  var settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://localhost:5051/selectFriendRegistry?friendusername="+username,
    "method": "POST",
    "headers": {
      "cache-control": "no-cache",
      "postman-token": "ac4c0af7-c823-b83f-4b44-8b751393d7c7"
    }
  }

  $.ajax(settings).done(function (response) {
    Object.keys(response).forEach(function(key,index) {
      populateTable(response[index].myusername);
    });
    // for (var i = 0; i < response.length; i++) {
    //   populateTable(response[i]);
    //    }
    console.log(response);
  });

  var populateTable = function(username){

    var settings = {
      "async": true,
      "crossDomain": true,
      "url": "https://localhost:5051/viewFriendRegistry?friendusername="+username,
      "method": "POST",
      "headers": {
        "cache-control": "no-cache",
        "postman-token": "ac4c0af7-c823-b83f-4b44-8b751393d7c7"
      }
    }

    $.ajax(settings).done(function (response) {
      var table = '<table id='+response[0].username+' class="display" cellspacing="0" width="100%"><thead><tr><th>Id</th><th>Name</th><th>Category</th><th>Brand</th><th>Price</th><th>Color</th><th>Purchaser</th></tr></thead><tbody>';
      for (var i = 0; i < response.length; i++) {
             table+="<tr id=\""+response[0].username+"\"><td id=\""+response[0].username+"\" class=\"id\">" + response[i].ProductId + "</td>";
             table+="<td id=\""+response[0].username+"\" class=\"name\">" + response[i].ProductName + "</td>";
             table+="<td id=\""+response[0].username+"\" class=\"category\">" + response[i].ProductCategory + "</td>";
             table+="<td id=\""+response[0].username+"\" class=\"brand\">" + response[i].ProductBrand + "</td>";
             table+="<td id=\""+response[0].username+"\" class=\"price\">" + response[i].ProductPrice + "</td>";
             table+="<td id=\""+response[0].username+"\" class=\"color\">" + response[i].ProductColor + "</td>";
             table+="<td id=\""+response[0].username+"\" class=\"purchaser\">" + response[i].purchaser + "</td></tr>";
         }
         table+='</tbody></table>';
         $('#exampleTable').append('<h1 style="font-size: 20px;margin-bottom: 4%;margin-top: 4%;">'+response[0].username+'\'s Registry</h1>');
         $('#exampleTable').append(table)
         $('#'+response[0].username).DataTable( {
             "order": [[ 3, "desc" ]]
         } );
      console.log(response);
    });
  }


  $("body").on("dblclick", "#example > tbody > tr", function () {
    var settings = {
      "async": true,
      "crossDomain": true,
      "url": "https://localhost:5051/deleteRegistryItem?id="+$(this).find('.id').text(),
      "method": "POST",
      "headers": {
        "cache-control": "no-cache",
        "postman-token": "ac4c0af7-c823-b83f-4b44-8b751393d7c7"
      }
    }

    $.ajax(settings).done(function (response) {
      //alert(JSON.stringify(response, null, 2));
      alert('Item deleted successfully from your registry. ');
    });
  });
  $('#form-user-profile-submit').on('click',function(){

    var settings = {
      "async": true,
      "crossDomain": true,
      "url": "https://localhost:5051/editProfile?username="+$('#form-profile-username').val()+"&firstname="+$('#form-profile-first-name').val()+"&lastname="+$('#form-profile-last-name').val()+"&emailid="+$('#form-profile-emailid').val(),
      "method": "POST",
      "headers": {
        "cache-control": "no-cache",
        "postman-token": "ac4c0af7-c823-b83f-4b44-8b751393d7c7"
      }
    }

    $.ajax(settings).done(function (response) {
      //alert(JSON.stringify(response));
      alert('Profile Updated. ');
      $('#userprofile').modal('hide');
    });


    });
    $('#viewprofile').on('click',function(){
    var username = document.cookie.match(/session1=(.*?)username/g).toString();
    //alert(typeof(username));
    username = username.replace("username","").replace("session1=","");
    //alert(username);
    var settings = {
      "async": true,
      "crossDomain": true,
      "url": "https://localhost:5051/viewProfile?username="+username,
      "method": "POST",
      "headers": {
        "cache-control": "no-cache",
        "postman-token": "ac4c0af7-c823-b83f-4b44-8b751393d7c7"
      }
    }

    $.ajax(settings).done(function (response) {
     // alert(JSON.stringify(response));
      $('#form-profile-username').val(response[0].Username);
      $('#form-profile-first-name').val(response[0].firstname);
      $('#form-profile-last-name').val(response[0].lastname);
      $('#form-profile-emailid').val(response[0].Email_Id);
      $('#form-profile-role').val(response[0].Role);
      $('#userprofile').modal('show');
    });


  });

});
