$(function() {

    $('#i1-container').remove();

    var url = "https://www.google.com.tw/"
    var iframe_container = `<div id="i1-container" class="previewer-iframe-container draggable" ></div>`;
    var iframe = `<iframe id = "i1" src="${url}" class="previewer-iframe" > <iframe>`;
    var close_btn = `<button id="i1-close-btn"><svg viewbox="0 0 40 40"><path class="close-x" d="M 10,10 L 30,30 M 30,10 L 10,30" /></svg></button>`;

    $('body').append(iframe_container)
    $('#i1-container').append(iframe);
    $('#i1-container').append(close_btn);

    interact('.draggable')
        .draggable({
            inertia: true,
            onstart: function(event) {
                $('#i1').hide()
            },
            onmove: dragMoveListener,
            onend: function(event) {
                $('#i1').show();
            }
        });

    function dragMoveListener(event) {
        var target = event.target,
            // keep the dragged position in the data-x/data-y attributes
            x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
            y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

        // translate the element
        target.style.webkitTransform =
            target.style.transform =
            'translate(' + x + 'px, ' + y + 'px)';

        // update the posiion attributes
        target.setAttribute('data-x', x);
        target.setAttribute('data-y', y);
    }

    /**
     *  event handling
     */
    var drag_href = undefined;
    $("body").on("dragstart", function(e) {
        drag_href = e.target.href
        $("#i1").hide();
    })

    $("body").on("dragend", function(e) {
        $("#i1").show();
    })

    $("body").on("drop", "#i1-container", function(e) {
        console.log(e)
        console.log("asdasdasdasdas", drag_href)
        if (drag_href) {
            $("#i1").attr('src', drag_href);
        }
        drag_href = undefined;
    })

    $("html").on("dragover", function(event) {
        event.preventDefault();
        event.stopPropagation();
    });

    $("#i1-close-btn").click(function() {
        $('#i1-container').remove();
        event.preventDefault();
        event.stopPropagation();
    });


});