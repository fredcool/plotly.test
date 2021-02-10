$(document).ready(function() {

    // $('#selDataset').change(function() {
    //     doWork();

    // });
    doWork();

});

function doWork() {
    d3.csv("static/data/kaggle.csv").then(function(data) {
        console.log(data);


        makePlot(data);
        makeFilters(data);

    });
}

//poplulate the drop down list

function makeFilters(data) {

    data.map(x => x["Ref Pubyr"]).forEach(function(val) {
        var newOption = `<option>${val}</option>`;
        $('#decade').append(newOption);
    });

    // function makeStackedAreaChart(data) {
    //     var filter = $("#decade").val();
    //     if (filter != "All") {
    //         if (filter == "2010") {
    //             data = data.filter(x => (x["Ref Pubyr"] >= 2010) & (x["Ref Pubyr"] < 2020))
    //         } else if (filter == "2000") {
    //             data = data.filter(x => (x["Ref Pubyr"] >= 2000) & (x["Ref Pubyr"] < 2010))
    //         } else if (filter == "1990") {
    //             data = data.filter(x => (x["Ref Pubyr"] >= 1990) & (x["Ref Pubyr"] < 2000))
    //         } else if (filter == "1980") {
    //             data = data.filter(x => (x["Ref Pubyr"] >= 1980) & (x["Ref Pubyr"] < 1990))
    //         } else if (filter == "1970") {
    //             data = data.filter(x => (x["Ref Pubyr"] >= 1970) & (x["Ref Pubyr"] < 1980))
    //         } else if (filter == "1960") {
    //             data = data.filter(x => (x["Ref Pubyr"] >= 1960) & (x["Ref Pubyr"] < 1970))
    //         } else if (filter == "1950") {
    //             data = data.filter(x => (x["Ref Pubyr"] >= 1950) & (x["Ref Pubyr"] < 1960))
    //         } else if (filter == "1940") {
    //             data = data.filter(x => (x["Ref Pubyr"] >= 1940) & (x["Ref Pubyr"] < 1950))
    //         } else if (filter == "1930") {
    //             data = data.filter(x => (x["Ref Pubyr"] >= 1930) & (x["Ref Pubyr"] < 1940))
    //         } else if (filter == "1920") {
    //             data = data.filter(x => (x["Ref Pubyr"] >= 1920) & (x["Ref Pubyr"] < 1930))
    //         } else if (filter == "1910") {
    //             data = data.filter(x => (x["Ref Pubyr"] >= 1910) & (x["Ref Pubyr"] < 1920))
    //         } else if (filter == "1900") {
    //             data = data.filter(x => (x["Ref Pubyr"] >= 1900) & (x["Ref Pubyr"] < 1910))
    //         } else if (filter == "1890") {
    //             data = data.filter(x => (x["Ref Pubyr"] >= 1890) & (x["Ref Pubyr"] < 1900))
    //         } else if (filter == "1880") {
    //             data = data.filter(x => (x["Ref Pubyr"] >= 1880) & (x["Ref Pubyr"] < 1890))
    //         } else if (filter == "1870") {
    //             data = data.filter(x => (x["Ref Pubyr"] >= 1870) & (x["Ref Pubyr"] < 1880))
    //         } else if (filter == "1860") {
    //             data = data.filter(x => (x["Ref Pubyr"] >= 1860) & (x["Ref Pubyr"] < 1870))
    //         } else if (filter == "1850") {
    //             data = data.filter(x => (x["Ref Pubyr"] >= 1850) & (x["Ref Pubyr"] < 1860))
    //         } else if (filter == "1840") {
    //             data = data.filter(x => (x["Ref Pubyr"] >= 1840) & (x["Ref Pubyr"] < 1850))
    //         } else if (filter == "1830") {
    //             data = data.filter(x => (x["Ref Pubyr"] >= 1830) & (x["Ref Pubyr"] < 1840))
    //         }
    //     }
}




function makePlot(data) {


    var xdata = [...new Set(data.map(x => x["Geological Time Period"]))]
    var ycarn = [];
    var ypisc = [];
    var yherb = [];
    var yomni = [];
    var ymixed1 = [];
    var ymixed2 = [];

    xdata.forEach(thing => {
        var group = data.filter(x => x["Geological Time Period"] === thing);
        ycarn.push(group.filter(x => x.Diet === "carnivore").length);
        ypisc.push(group.filter(x => x.Diet === "piscivore").length);
        yherb.push(group.filter(x => x.Diet === "herbivore").length);
        yomni.push(group.filter(x => x.Diet === "omnivore").length);
        ymixed1.push(group.filter(x => x.Diet === "carnivore, omnivore").length);
        ymixed2.push(group.filter(x => x.Diet === "herbivore, omnivore").length);
    });



    var trace1 = {
        x: xdata,
        y: ycarn,
        name: 'Carnivore',
        type: 'bar'
    };

    var trace2 = {
        x: xdata,
        y: yherb,
        name: 'Herbivore',
        type: 'bar'
    };

    var trace3 = {
        x: xdata,
        y: ypisc,
        name: 'Piscivore',
        type: 'bar'
    };


    var trace4 = {
        x: xdata,
        y: yomni,
        name: 'Omnivore',
        type: 'bar'
    };

    var trace5 = {
        x: xdata,
        y: ymixed2,
        name: 'Herbivore & Omnivore',
        type: 'bar'
    };

    var trace6 = {
        x: xdata,
        y: ymixed1,
        name: 'Carnivore & Omnivore',
        type: 'bar'
    };

    var layout = {
        title: "Dinosaur",
        barmode: 'stack',
        xaxis: {
            title: 'Geological Time Period',
        },
        yaxis: {
            title: 'Numer of Dinosaur for Diet',
        }
    };



    var traces = [trace1, trace2, trace3, trace4, trace5, trace6];


    Plotly.newPlot("bar-plot", traces, layout);
};