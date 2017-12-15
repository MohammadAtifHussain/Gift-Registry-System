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

  $('#view_shared_reg').on('click',function(){
    window.location.href = 'viewsharedregistry.html';
  });

  $('#customer_home').on('click',function(){
      window.location.href = 'customer.html';
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

  $('#filter-button').on('click',function(){

    //alert(JSON.stringify(completetable,null,2));
    completetable = completeTable1;
    dataTable.clear();

    //$('#example_wrapper').remove();
    //$('#example tbody').empty();
    //var tabletemplate = '<table id="example1" class="display" cellspacing="0" width="100%"><thead><tr><th>Id</th><th>Name</th><th>Category</th><th>Brand</th><th>Price</th><th>Color</th><th>Purchaser</th></tr></thead><tbody></tbody></table>';
    //$('#createtable').append(tabletemplate);

    var newcompletetable = [];
    if($('#filter-category').val()){
      //alert(JSON.stringify(completetable.length,null,2));
      for (var i = 0; i < completetable.length; i++) {
        //alert($('#filter-category').val()+completetable[i].ProductCategory);
        if($('#filter-category').val()==completetable[i].ProductCategory){
        newcompletetable.push(completetable[i]);
      }
    }

    completetable=newcompletetable;
    }


    newcompletetable = [];

    if($('#filter-brand').val()){
      for (var i = 0; i < completetable.length; i++) {
        //alert($('#filter-brand').val()+completetable[i].ProductBrand);
        if($('#filter-brand').val()==completetable[i].ProductBrand){
        newcompletetable.push(completetable[i]);
      }
    }
    completetable=newcompletetable;
    }


    newcompletetable = [];

    if($('#filter-color').val()){
      for (var i = 0; i < completetable.length; i++) {
        //alert($('#filter-color').val()+completetable[i].ProductColor);
        if($('#filter-color').val()==completetable[i].ProductColor){
        newcompletetable.push(completetable[i]);
      }
    }
    completetable=newcompletetable;
    }

    newcompletetable = [];

    if($('#filter-price-min').val()){
      //alert(JSON.stringify(completetable.length));
      for (var i = 0; i < completetable.length; i++) {
        //alert($('#filter-price-min').val()+completetable[i].ProductPrice+" "+Number($('#filter-price-min').val())+" "+Number($('#filter-price-max').val()));
        if(Number($('#filter-price-min').val())<=completetable[i].ProductPrice && Number($('#filter-price-max').val())>=completetable[i].ProductPrice){
        newcompletetable.push(completetable[i]);
      }
    }
    completetable=newcompletetable;
    }

    //alert(JSON.stringify(completetable));
    if(completetable.length==0){
      dataTable.clear();
      $("#example tr td").remove();
      alert('No results found. ')
    }

        for (var i = 0; i < completetable.length; i++) {
               tr = $('<tr/>');
                 dataTable.row.add( [
                     completetable[i].ProductId,
                     completetable[i].ProductName,
                     completetable[i].ProductCategory,
                     completetable[i].ProductBrand,
                     completetable[i].ProductPrice,
                     completetable[i].ProductColor,
                     completetable[i].purchaser
                 ] ).draw();
              //    tr.append("<td class=\"id\">" + completetable[i].ProductId + "</td>");
              //    tr.append("<td class=\"name\">" + completetable[i].ProductName + "</td>");
              //    tr.append("<td class=\"category\">" + completetable[i].ProductCategory + "</td>");
              //    tr.append("<td class=\"brand\">" + completetable[i].ProductBrand + "</td>");
              //    tr.append("<td class=\"price\">" + completetable[i].ProductPrice + "</td>");
              //    tr.append("<td class=\"color\">" + completetable[i].ProductColor + "</td>");
              //    tr.append("<td class=\"purchaser\">" + completetable[i].purchaser + "</td>");
              //    $('#example1 tbody').append(tr);
              //  $('#example1').DataTable( {
              //      "order": [[ 3, "desc" ]]
              //  } );
           }
  });


  $('#form-share-username-submit').on('click',function(){
    var currentusername = document.cookie.match(/session1=(.*?)username/g).toString();
    //alert(typeof(currentusername));
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
      //alert(JSON.stringify(response));
      alert('Profile Updated. ');
      $('#userprofile').modal('hide');
    });


    });


  var username = document.cookie.match(/session1=(.*?)username/g).toString();
  //alert(typeof(username));
  username = username.replace("username","").replace("session1=","");

  if(username==null){
    alert("You are being redirected to the homepage as you haven't signed in");
    window.location.href = 'index.html';
    // alert(username[0].replace("session1","").replace("username",""));
    // document.cookie = 'session1=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  }

  var settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://localhost:5051/viewRegistry?username="+username,
    "method": "POST",
    "headers": {
      "cache-control": "no-cache",
      "postman-token": "ac4c0af7-c823-b83f-4b44-8b751393d7c7"
    }
  }

  var completetable =  null;
  var completeTable1 = null;
  var dataTable = null;
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
           tr.append("<td class=\"purchaser\">" + response[i].purchaser + "</td>");
           $('#example tbody').append(tr);
           completetable = response;
           completeTable1 = response;
       }
       dataTable = $('#example').DataTable( {
         "bDestroy": true,
           "order": [[ 3, "desc" ]]
       } );
    console.log(response);
  });

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

});
