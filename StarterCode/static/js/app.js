// Get the JSON data
const bbdata = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// Fetch the JSON data and console log it
d3.json(bbdata).then(function(data) {
  console.log(data);
});

// Testing with Sample ID of 940
console.log(data);