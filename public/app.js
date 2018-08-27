


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
    $.get("/comments/" + thisId, function (data) {
        console.log("Viewing Comments, Data output is: " + data);
    })
})

submitComment.on("click", function (event) {
    event.preventDefault();
    var text = $('textarea#comment-content').val();

})