$(document).ready(function() {

    doWork();
});


function doWork() {
    d3.csv("static/data/kaggle.csv").then(function(data) {
        console.log(data);
        makePlot(data);
    });
}

function makePlot(data) {
    var trace = {
        x: data["Geological Time Period"],
        y: data.Diet,
        name: 'Dino Diet',
        type: 'bar'
    };
    var layout = {
        title: "Dinosaur"
    };

    var data = [trace];
    console.log(data);

    Plotly.newPlot("bar-plot", trace, layout);
};