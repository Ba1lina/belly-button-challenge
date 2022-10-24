// Get the JSON data
const bbdata = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// Fetch the JSON data and console log it
d3.json(bbdata).then(function(data) {
  console.log(data);

// Use the JSON Data to create some constant variables
  const id = data.names;
    id.forEach((sample) => {
      selector.append("option")
      .text(sample)
      .property("value", sample);
      });
    let starter = id[0];
    metadata(starter);
    console.log(starter);
});

// Testing with Sample ID of 940
console.log(id[0]);