jQuery.fn.sortDomElements = (function() {
    return function(comparator) {
        return Array.prototype.sort.call(this, comparator).each(function(i) {
              this.parentNode.appendChild(this);
        });
    };
})();

$(function(){
    if ( $(".timeline").length ) {
        var tlScreenTriggerPos = 0.15;   // trigger position on the screen in relation of the screen height

        var scale = 0;
        $(".timelinePoi").each(function(){
            var time = parseInt($(this).attr("tltime"));
            if ( time > scale ) { scale = time; }
            //console.log(time+", "+scale);
        });
        $(".timelineZone").children().sortDomElements(function(a,b){
            akey = parseInt($(a).attr("tltime"));
            bkey = parseInt($(b).attr("tltime"));
            if (akey == bkey) return 0;
            if (akey > bkey) return -1;
            if (akey < bkey) return 1;
        })
        var timeI = 0;
        $(".timelinePoi").each(function(index, element){
            timeI++;
            var parent = element.parentNode;
            // Add one to bring first (last) entry to the top.
            var parentIndex = (Array.prototype.indexOf.call( parent.children, element)+1);
            console.log( "Parent Index: ", parentIndex );
            var pos =  (1-( parentIndex / parent.children.length ))*100;
//            $(this).css("top",pos+"%");
            $(this).removeClass("active");
            if ( timeI%2==0 ) { $(this).addClass("rightAlign"); }
            //var title = $(this).find(".title").html().split("<span>")[1].split("</span>")[0];
            //var titleTime = title.split(" - ")[0];
            //var titleText = title.split(" - ")[1];
            //$(this).find(".title").html(/*"<span class='time'>"+titleTime+" - </span>"+*/titleText);
            //$(this).append("<span class='time'>"+titleTime+"</span>");
        });
        


        function checkActiveTime() {
            var activeTime;
            var closestTriggerDistance = 100000;
            var triggerOffset = $(window).scrollTop() + $(window).height() * tlScreenTriggerPos ;
            console.log( "scrollTop: ", $(window).scrollTop() );
            console.log( "TriggerPos: ", $(window).height() * tlScreenTriggerPos );
            console.log( "triggerOffset: ", triggerOffset );
            $("#TRIGGER").css("top", triggerOffset+"px")
            $(".timelinePoi").each(function(index, item){
                console.log( $(item).find(".time").text() );
                var triggerDistance = Math.abs( $(this).offset().top - triggerOffset );
                console.log( "triggerDistance: ", triggerDistance );
                if ( triggerDistance < closestTriggerDistance ) {
                    closestTriggerDistance = triggerDistance;
                    activeTime = $(this);
                }
            });
            $(".timelinePoi.active").removeClass("active");
            $(".timelinePoi.previous").removeClass("previous");
            $(".timelinePoi.previous2").removeClass("previous2");
            activeTime.addClass("active");
            if ( $(window).width() > 670 ) {
                activeTime.next(".timelinePoi").addClass("active previous");
                activeTime.next(".timelinePoi").next(".timelinePoi").addClass("active previous2");
            }
            else{
                activeTime.next(".timelinePoi").addClass("active previous");
            }
            console.log("----------------------" );
        }
        $(".timelinePoi").click(function(event){
            if( $(event.currentTarget).hasClass("active") && !($(event.currentTarget).hasClass("previous") ||
                                                               $(event.currentTarget).hasClass("previous2")) ){
                window.location.href = $(event.currentTarget).attr("url");
            }
            else{
                $('html, body').stop(true,false).animate({
                    scrollTop: $(this).offset().top - $(window).height() * tlScreenTriggerPos -10
                }, 1000, "easeOutQuart");
            }
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
