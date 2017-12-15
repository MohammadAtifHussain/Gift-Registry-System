$(document).ready(function(){

  var token = null;
  if(document.cookie.match(/session2=(.*?)username/g)!=null){
    token = document.cookie.match(/session2=(.*?)username/g).toString();
    token = token.replace("session2=","");
  }

  $("#form-register").click(function(){
     // alert("The paragraph was clicked.");
      var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://localhost:5051/signup?token="+token+"&username="+$('#form-signup-username').val()+"&password="+$('#form-signup-password').val()+"&firstname="+$('#form-signup-firstname').val()+"&lastname="+$('#form-signup-lastname').val()+"&email="+$('#form-signup-email').val(),
        "method": "POST",
        "headers": {
          "cache-control": "no-cache",
          "postman-token": "ac4c0af7-c823-b83f-4b44-8b751393d7c7"
        }
      }

      $.ajax(settings).done(function (response) {
        //alert(JSON.stringify(response, null, 2));
        console.log(response);
        window.location.href = 'index.html';
      });

  });

});
//
//     $('.button-checkbox').each(function () {
//
//         // Settings
//         var $widget = $(this),
//             $button = $widget.find('button'),
//             $checkbox = $widget.find('input:checkbox'),
//             color = $button.data('color'),
//             settings = {
//                 on: {
//                     icon: 'glyphicon glyphicon-check'
//                 },
//                 off: {
//                     icon: 'glyphicon glyphicon-unchecked'
//                 }
//             };
//
//         // Event Handlers
//         $button.on('click', function () {
//             $checkbox.prop('checked', !$checkbox.is(':checked'));
//             $checkbox.triggerHandler('change');
//             updateDisplay();
//         });
//         $checkbox.on('change', function () {
//             updateDisplay();
//         });
//
//         // Actions
//         function updateDisplay() {
//             var isChecked = $checkbox.is(':checked');
//
//             // Set the button's state
//             $button.data('state', (isChecked) ? "on" : "off");
//
//             // Set the button's icon
//             $button.find('.state-icon')
//                 .removeClass()
//                 .addClass('state-icon ' + settings[$button.data('state')].icon);
//
//             // Update the button's color
//             if (isChecked) {
//                 $button
//                     .removeClass('btn-default')
//                     .addClass('btn-' + color + ' active');
//             }
//             else {
//                 $button
//                     .removeClass('btn-' + color + ' active')
//                     .addClass('btn-default');
//             }
//         }
//
//         // Initialization
//         function init() {
//
//             updateDisplay();
//https
//             // Inject the icon if applicable
//             if ($button.find('.state-icon').length == 0) {
//                 $button.prepend('<i class="state-icon ' + settings[$button.data('state')].icon + '"></i>');
//             }
//         }
//         init();
//     });
// });
