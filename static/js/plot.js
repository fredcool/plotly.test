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
    var xdata = []; 
    var ydata = [];
    data.forEach(element => {
        xdata.push(element["Geological Time Period"]);
        ydata.push(element["Diet"]);
    });
    var trace = {
        x: xdata,
        y: ydata,
        name: 'Dino Diet',
        type: 'bar'
    };
    
    var layout = {
        title: "Dinosaur",
        xaxis: {
            title: 'Geological Time Period',
            showgrid: false,
            zeroline: false
          },
          yaxis: {
            title: 'Diet',
            showline: false
          }
    };

    var data = [trace];

    Plotly.newPlot("bar-plot", data, layout);
};
