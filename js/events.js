
$(document).ready(function() {
  

  // var urlString = location.search;
  var urlParams = parseURLParams(location.search);
  $redirect_txt = '';

  var lokal_name = urlParams.lokal[0]
  var lokal_page_id = urlParams.pageId[0] 
  var link = '';

  console.log(lokal_name)
  console.log(lokal_page_id)

  document.title = lokal_name;

  
//   FOR edit view per lokal 
  var unique = + new Date();
  fetch("js/views.json?ver="+unique)
    .then(response => {
      return response.json();
    })
    .then(function(data) { 
      $redirect_txt = data.jsonData[lokal_page_id-1].redirect_text;

      // SET LINK from json
      link = data.jsonData[lokal_page_id-1].link;
      $('.main-event').append('<a  id="hidden-link" class="hidden-link" href="'+link+'" target="_blank"></a>'); 

      
      var image = data.jsonData[lokal_page_id-1].image;
      $(".append-image").append(''+
        '<img class="img-fluid mx-auto d-block shadow-lg p-3 mb-5 bg-body rounded"src="img/'+image+'" alt=""></img>'+
      '')

      // minus 1 since the page starts fromm 1 and index of array starts from 0
      data.jsonData[lokal_page_id-1].viewData.forEach(setViews);  

      function setViews(item, index) {  
        if(lokal_name == item.lokal){ 
          $('.lokal_view').text(item.views) 
          $('.lokal_name').text(item.lokal) 
        }
      }
          
    }).catch(function(error) {
            console.log(error);
    });
    

    $('.thanks-note').hide();
    $('.instruction-note').hide();

    $('.post-img').removeAttr('disabled');


    // var link ='https://youtu.be/My-lxET30Ro';
    // $('.main-event').append('<a  id="hidden-link" class="hidden-link" href="'+link+'" target="_blank"></a>'); 
     
$('.post-btn').click(function() {

   loadingFunction();
    
     // window.open("https://youtu.be/vkIqKiLgm6Y", "_blank"); 
    $('.main-event').hide(); 
    $('.instruction-note').show(); 
    
     $( "#hidden-link" ).trigger( "click" );
     document.getElementById('hidden-link').click();

    setInterval(function()
    {   
        $('.load-end').text('DONE ! Please wait your view to be update by Google Team ')
        $.LoadingOverlay("hide", true); //remmove the loading overlay
        $('.instruction-note').hide();
        $('.thanks-note').show();
        // alert("Hello"); 

    }, 200000); 
        // 1sec = 1000
        // 1min = 60000
        // 3 minutes = 180000
        // 4 minutes 200000
        // 5 minutes = 300000
        // 10 min = 600000
  });
  function parseURLParams(url) {
    var queryStart = url.indexOf("?") + 1,
        queryEnd   = url.indexOf("#") + 1 || url.length + 1,
        query = url.slice(queryStart, queryEnd - 1),
        pairs = query.replace(/\+/g, " ").split("&"),
        parms = {}, i, n, v, nv;

    if (query === url || query === "") return;

    for (i = 0; i < pairs.length; i++) {
        nv = pairs[i].split("=", 2);
        n = decodeURIComponent(nv[0]);
        v = decodeURIComponent(nv[1]);

        if (!parms.hasOwnProperty(n)) parms[n] = [];
        parms[n].push(nv.length === 2 ? v : null);
    }
    return parms;
}

  function loadingFunction(){ 
//  Sending view from Youtube "Uploading data from Google Firebase ""DONE ! Please wait your view to be update by Team " 
 
    var customElement =  '<div class="cm-spinner"></div>'
    
    $.LoadingOverlay("show", {
        background: "rgb(203, 225, 245, 0.3)", 
        image: "",
        custom           : customElement,
        customAnimation  : "",
        customAutoResize : true,
        customResizeFactor: 2 
    }); 
    // $('.load-start').text('Sending view from Youtube') 
    $('.load-start').text($redirect_txt) 
    
    setInterval(function()
    { 
        
        $('.load-start').text('Uploading data from Google Firebase')
        // $.LoadingOverlay("show", {
        //     background: "rgb(203, 225, 245, 0.3)", 
        //     image: "",
        //     custom           : customElement,
        //     customAnimation  : "",
        //     customAutoResize : true,
        //     customResizeFactor: 2,
        //     customOrder: 2,
        //     text: "Uploading data from Google Firebase",
        //     textColor: "#202020",
        //     textOrder: 3,
        //     textResizeFactor: 0.3,
        //     textAutoResize: true,
        //     direction: "column"
        // });

    }, 180000); 
        // 1sec = 1000
        // 1min = 60000
        // 3min = 180000
        // 5 minutes = 300000
        // 10 min = 600000  
  }
  
  
    
});

