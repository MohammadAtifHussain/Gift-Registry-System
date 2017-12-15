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

  $('#example').hover(function() {
        $(this).css('cursor','pointer');
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


  $("body").on("click", "#example > tbody > tr", function () {
    $('#form-update-id').val($(this).find('.id').text());
    $('#form-update-name').val($(this).find('.name').text());
    $('#form-update-category').val($(this).find('.category').text());
    $('#form-update-brand').val($(this).find('.brand').text());
    $('#form-update-price').val($(this).find('.price').text());
    $('#form-update-color').val($(this).find('.color').text());
    $('#updateModal').modal('show');

    //alert(JSON.stringify($(this).find('.name').text(), null, 2));
  });

  var username = document.cookie.match(/session1=(.*?)username/g);
  //alert(username);
  if(username==null){
    alert("You are being redirected to the homepage as you haven't signed in");
    window.location.href = 'index.html';
    // alert(username[0].replace("session1","").replace("username",""));
    // document.cookie = 'session1=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  }
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
   // alert(JSON.stringify(response, null, 2));
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
      "url": "https://localhost:5051/enterItemInCatalog?name="+$('#form-name').val()+"&category="+$('#form-category').val()+"&brand="+$('#form-brand').val()+"&price="+$('#form-price').val()+"&color="+$('#form-color').val(),
      "method": "POST",
      "headers": {
        "cache-control": "no-cache",
        "postman-token": "ac4c0af7-c823-b83f-4b44-8b751393d7c7"
      }
    }

    $.ajax(settings).done(function (response) {
      $('#exampleModal').modal('hide');
      alert("Reload Page for changes to be displayed.  ");
      location.reload();
    });

  });

  $("#form-update").click(function(){
    var settings = {
      "async": true,
      "crossDomain": true,
      "url": "https://localhost:5051/updateItemInCatalog?id="+$('#form-update-id').val()+"&name="+$('#form-update-name').val()+"&category="+$('#form-update-category').val()+"&brand="+$('#form-update-brand').val()+"&price="+$('#form-update-price').val()+"&color="+$('#form-update-color').val(),
      "method": "POST",
      "headers": {
        "cache-control": "no-cache",
        "postman-token": "ac4c0af7-c823-b83f-4b44-8b751393d7c7"
      }
    }

    $.ajax(settings).done(function (response) {
      $('#updateModal').modal('hide');
      alert("Reload Page for changes to be displayed.  ");
      location.reload();
    });

  });

  $("#form-delete").click(function(){
    var settings = {
      "async": true,
      "crossDomain": true,
      "url": "https://localhost:5051/deleteItemInCatalog?id="+$('#form-update-id').val(),
      "method": "POST",
      "headers": {
        "cache-control": "no-cache",
        "postman-token": "ac4c0af7-c823-b83f-4b44-8b751393d7c7"
      }
    }

    $.ajax(settings).done(function (response) {
      $('#updateModal').modal('hide');
      alert("Reload Page for changes to be displayed.  ");
      location.reload();
    });

  });

});
