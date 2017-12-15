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

  $('#view_shared_reg').on('click',function(){
    window.location.href = 'viewsharedregistry.html';
  });

  $('#customer_home').on('click',function(){
    window.location.href = 'customer.html';
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

  $("body").on("click", "#example > tbody > tr", function () {
    var username = document.cookie.match(/session1=(.*?)username/g).toString();
    //alert(typeof(username));
    username = username.replace("username","").replace("session1=","");
    var settings = {
      "async": true,
      "crossDomain": true,
      "url": "https://localhost:5051/enterRegistryItem?username="+username+"&id="+$(this).find('.id').text()+
      "&name="+$(this).find('.name').text()+
      "&category="+$(this).find('.category').text()+
      "&brand="+$(this).find('.brand').text()+
      "&price="+$(this).find('.price').text()+
      "&color="+$(this).find('.color').text(),
      "method": "POST",
      "headers": {
        "cache-control": "no-cache",
        "postman-token": "ac4c0af7-c823-b83f-4b44-8b751393d7c7"
      }
    }

    $.ajax(settings).done(function (response) {
      //alert(JSON.stringify(response, null, 2));
      alert('Item added successfully to your registry. ');
    });
  });

 /* var username = document.cookie.match(/session1=(.*?)username/g);
  if(username==null){
    alert("You are being redirected to the homepage as you haven't signed in");
    window.location.href = 'index.html';
    // alert(username[0].replace("session1","").replace("username",""));
    // document.cookie = 'session1=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  }*/
  var settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://localhost:5051/getCatalogDetails",
    "method": "POST",
    "headers": {
      "cache-control": "no-cache",
      "postman-token": "ac4c0af7-c823-b83f-4b44-8b751393d7c7"
    }
  }

  $.ajax(settings).done(function (response) {
    //alert(JSON.stringify(response, null, 2));
    for (var i = 0; i < response.length; i++) {
           tr = $('<tr/>');
           tr.append("<td class=\"id\">" + response[i].ProductId + "</td>");
           tr.append("<td class=\"name\">" + response[i].ProductName + "</td>");
           tr.append("<td class=\"category\">" + response[i].ProductCategory + "</td>");
           tr.append("<td class=\"brand\">" + response[i].ProductBrand + "</td>");
           tr.append("<td class=\"price\">" + response[i].ProductPrice + "</td>");
           tr.append("<td class=\"color\">" + response[i].ProductColor + "</td>");
           $('#example tbody').append(tr);
       }
       $('#example').DataTable( {
           "order": [[ 3, "desc" ]]
       } );
    console.log(response);
  });

  $("#form-submit").click(function(){
    var settings = {
      "async": true,
      "crossDomain": true,
      "url": "https://localhost:5051/enterItemInCatalog?name="+$('#form-name').val()+"&price="+$('#form-price').val()+"&quantity="+$('#form-quantity').val()+"&description="+$('#form-description').val(),
      "method": "POST",
      "headers": {
        "cache-control": "no-cache",
        "postman-token": "ac4c0af7-c823-b83f-4b44-8b751393d7c7"
      }
    }

    $.ajax(settings).done(function (response) {
    });

  });

  $("#form-update").click(function(){
    var settings = {
      "async": true,
      "crossDomain": true,
      "url": "https://localhost:5051/updateItemInCatalog?name="+$('#form-update-name').val()+"&price="+$('#form-update-price').val()+"&quantity="+$('#form-update-quantity').val()+"&description="+$('#form-update-description').val(),
      "method": "POST",
      "headers": {
        "cache-control": "no-cache",
        "postman-token": "ac4c0af7-c823-b83f-4b44-8b751393d7c7"
      }
    }

    $.ajax(settings).done(function (response) {
      $('#updateModal').modal('hide');
      alert("Reload Page for changes to be displayed.  ");

    });

  });

  $("#form-delete").click(function(){
    var settings = {
      "async": true,
      "crossDomain": true,
      "url": "https://localhost:5051/deleteItemInCatalog?name="+$('#form-update-name').val(),
      "method": "POST",
      "headers": {
        "cache-control": "no-cache",
        "postman-token": "ac4c0af7-c823-b83f-4b44-8b751393d7c7"
      }
    }

    $.ajax(settings).done(function (response) {
      $('#updateModal').modal('hide');
      alert("Reload Page for changes to be displayed.  ");

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
      $('#form-share-username-submit').on('click',function(){

    var currentusername = document.cookie.match(/session1=(.*?)username/g).toString();
    //alert(typeof(currentusername));
    currentusername = currentusername.replace("username","").replace("session1=","");
        if($('#form-share-username').val() === 'public' || $('#form-share-username').val() === 'Public')
        {
alert('Hello');
    var settings = {
      "async": true,
      "crossDomain": true,
      "url": "https://localhost:5051/shareRegistryPublic?myusername="+currentusername+"&friendusername="+$('#form-share-username').val(),
      "method": "POST",
      "headers": {
        "cache-control": "no-cache",
        "postman-token": "ac4c0af7-c823-b83f-4b44-8b751393d7c7"
      }
    }

    $.ajax(settings).done(function (response) {
      //alert(JSON.stringify(response));
      alert('Registry Shared With ' +$('#form-share-username').val());
      $('#shareModal').modal('hide');
    });

        }
        else
{
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
      //alert(JSON.stringify(response));
      alert('Registry Shared With ' +$('#form-share-username').val());
      $('#shareModal').modal('hide');
    });

}
    });
});
