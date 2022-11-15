// Get the JSON data
const bbdata = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// Fetch the JSON data and console log it
d3.json(bbdata).then(function(data) {
  console.log(data);
});

function init() {
  // Select the dropdown element
  var selector = d3.select("#selDataset");
  
  // Populate the dropdown with subject ID's from the list of sample Names
    d3.json((bbdata)).then((data) => {
      var subjectIds = data.names;
      subjectIds.forEach((id) => {
        selector
        .append("option")
        .text(id)
        .property("value", id);
      });
    
    // Use the first subject ID from the names to build initial plots
    const firstSubject = subjectIds[0];
    updateCharts(firstSubject);
    updateMetadata(firstSubject);
  });
}

function updateMetadata(sample) {
  d3.json((bbdata)).then((data) => {
      var metadata = data.metadata;
      var filterArray = metadata.filter(sampleObject => sampleObject.id == sample);
      var result = filterArray[0];
      var metaPanel = d3.select("#sample-metadata");
      metaPanel.html("");
      Object.entries(result).forEach(([key, value]) => {
          metaPanel.append("h6").text(`${key.toUpperCase()}: ${value}`)
      })  

// Use `Object.entries` to add each key and value pair to the metaPanel
// Hint: Inside the loop, you will need to use d3 to append new
// tags for each key-value in the metadata.
  });
}

function updateCharts(sample) {    
  d3.json((bbdata)).then((data) => {
  var samples = data.samples;
  var filterArray = samples.filter(sampleObject => sampleObject.id == sample);
  var result = filterArray[0];
  var sample_values = result.sample_values;
  var otu_ids = result.otu_ids;
  var otu_labels = result.otu_labels;
  var metadata = data.metadata;   
  var filterArray2 = metadata.filter(sampleObject => sampleObject.id == sample);
  var result2 = filterArray2[0];
  var wash_freq = result2.wfreq;

  // Bubble Chart
  var trace1 = {
      x: otu_ids,
      y: sample_values,
      text: otu_labels,
      mode: 'markers',
      marker: {
      size: sample_values,
      color: otu_ids,
      colorscale:"Electric"
      }
  };
  var data = [trace1];
  var layout = {
      title: 'Bacteria Cultures per Sample',
      showlegend: false,
      hovermode: 'closest',
      xaxis: {title:"OTU (Operational Taxonomic Unit) ID " +sample},
      margin: {t:30}
  };
  Plotly.newPlot('bubble', data, layout); 

  // Bar Chart
  var trace1 = {
      x: sample_values.slice(0,10).reverse(),
      y: otu_ids.slice(0,10).map(otuID => `OTU ${otuID}`).reverse(),
      text: otu_labels.slice(0,10).reverse(),
      name: "Greek",
      type: "bar",
      orientation: "h"
  };
  var data = [trace1];
  var layout = {
      title: "Top Ten OTUs for Individual " +sample,
      margin: {l: 100, r: 100, t: 100, b: 100}
  };
  Plotly.newPlot("bar", data, layout);  

    // Gauge
    var data = [
      {
        type: "indicator",
        mode: "gauge+number",
        value: wash_freq,
        title: { text: "Belly Button Washing Frequency", font: {size: 24 } },
        gauge: {
          axis: { range: [null, 9], tickwidth: 1, showticklabels: false, ticks: "" },
          bgcolor: "white",
          bar: { color: "darkblue", thickness:0 },
          borderwidth: 0,
          bordercolor: "gray",
          steps: [
            { range: [0, 1], color: 'rgba(248,243,236,255)' },
            { range: [1, 2], color: 'rgba(244,241,228,255)' },
            { range: [2, 3], color: 'rgba(233,231,201,255)' },
            { range: [3, 4], color: 'rgba(229,232,176,255)' },
            { range: [4, 5], color: 'rgba(213,229,153,255)' },
            { range: [5, 6], color: 'rgba(183,205,143,255)' },
            { range: [6, 7], color: 'rgba(139,192,134,255)' },
            { range: [7, 8], color: 'rgba(137,188,141,255)' },
            { range: [8, 9], color: 'rgba(132,181,137,255)' },
          ]
        }
      }
    ];
    
    var layout = {
      width: 500,
      height: 400,
      margin: { t: 25, r: 25, l: 25, b: 25 },
      paper_bgcolor: "white",
    
    };
    
    Plotly.newPlot('gauge', data, layout);
  });
}

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  updateCharts(newSample);
  updateMetadata(newSample);
}

// Initialize the dashboard
init();