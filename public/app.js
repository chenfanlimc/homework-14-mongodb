


var getNewsBtn = $("#get-news-button");
var newsSection = $(".news-articles");
var commentsBtn = $(".view-comments");
var submitComment = $(".submit-comment");

getNewsBtn.on("click", function (event) {
    event.preventDefault();
    $.get("/scrape", function (data) {
        // data.forEach(articles => {
        //     var title = $("<div>");
        //     title.text(articles.title);
        //     newsSection.append(title);
        // });
    }).then(function (result) {
        location.reload();
    })
})

commentsBtn.on("click", function (event) {
    event.preventDefault();
    var thisId = $(this).attr("data-id");
    console.log(thisId)
    $.get("/comments/" + thisId, function (data) {
        // console.log("Viewing Comments, Data output is: " + data);
    })
})

submitComment.on("click", function (event) {
    event.preventDefault();
    var foreign_id = $(this).attr("data-id");
    var text = $('textarea.comment-content_' + foreign_id).val().trim();

    var commentObj = {
        comment_text: text
    };

    $.post("/api/addComment/" + foreign_id, commentObj)
        .then(function (data) {
            // console.log("$.post .then data"+data);
            location.reload();
        });

        $('textarea.comment-content_' + foreign_id).val('');

})