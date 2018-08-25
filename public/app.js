


var getNewsBtn = $("#get-news-button");
var newsSection = $(".news-articles")

getNewsBtn.on("click", function (event) {
    event.preventDefault();
    $.get("/scrape", function (data) {
        // data.forEach(articles => {
        //     var title = $("<div>");
        //     title.text(articles.title);
        //     newsSection.append(title);
        // });
    }).then(function(result){
        location.reload();
    })
})