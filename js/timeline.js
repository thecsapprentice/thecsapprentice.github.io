$(function(){
  if ( $(".timeline").length ) {
    var tlScreenTriggerPos = 0.15;   // trigger position on the screen in relation of the screen height

    var scale = 0;
    $(".timelinePoi").each(function(){
      var time = parseInt($(this).attr("tltime"));
      if ( time > scale ) { scale = time; }
      console.log(time+", "+scale);
    });
    var timeI = 0;
    $(".timelinePoi").each(function(){
      timeI++;
      var pos =  (1-( $(this).attr("tltime") / scale ))*100;
      $(this).css("top",pos+"%").removeClass("active");
      if ( timeI%2==0 ) { $(this).addClass("rightAlign"); }
      var title = $(this).find(".title").html().split("<span>")[1].split("</span>")[0];
      var titleTime = title.split(" - ")[0];
      var titleText = title.split(" - ")[1];
      $(this).find(".title").html(/*"<span class='time'>"+titleTime+" - </span>"+*/titleText);
      $(this).append("<span class='time'>"+titleTime+"</span>");
    });
    function checkActiveTime() {
      var activeTime;
      var closestTriggerDistance = 100000;
      var triggerOffset = $(window).scrollTop() + $(window).height() * tlScreenTriggerPos ;
      $(".timelinePoi").each(function(){
        var triggerDistance = Math.abs( $(this).offset().top - triggerOffset );
        if ( triggerDistance < closestTriggerDistance ) {
          closestTriggerDistance = triggerDistance;
          activeTime = $(this);
        }
      });
      $(".timelinePoi.active").removeClass("active");
      $(".timelinePoi.previous").removeClass("previous");
      activeTime.addClass("active");
      if ( $(window).width() > 668 ) {
        activeTime.prev(".timelinePoi").addClass("active previous");
      }
    }
    $(".timelinePoi").click(function(){
      $('html, body').stop(true,false).animate({
        scrollTop: $(this).offset().top - $(window).height() * tlScreenTriggerPos -10
      }, 1000, "easeOutQuart");
    });
    checkActiveTime();
    $(window).load(function(){
      checkActiveTime();
    });
    $(window).scroll(function(){
      checkActiveTime();
    });
    $(window).resize(function(){
      checkActiveTime();
    });

  }

});
