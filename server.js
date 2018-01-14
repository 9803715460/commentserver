

var url = 'https://newsapi.org/v2/top-headlines?' +
          'sources=bbc-news&' +
          'apiKey=87544ed0f1414c1b9bf3cd45bb1d217a';

var req = new Request(url);

fetch(req)
    .then(function(response) {
        console.log(response.json());
    })