/*
 This code has several bugs in it as well as an unfinished function.
 Your task is to find and fix the bugs and complete the function.
*/

import axios from 'axios';

async function main() {
  console.clear();

  const data = getData();
  const maleReport = buildMaleReport(data);
  printReport(maleReport);

  //const disabilityReport = buildReport(data, "Disabilities per School Type", "disability");
  //printReport(disabilityReport);
}

async function getData() {
  const response = await axios.get("https://data.nashville.gov/resource/j7b8-4fv6.json")
  return response;
}

function buildMaleReport(data) {
  const reportData = data.reduce((rpt, school) => {
    rpt[school.school_level] = rpt[school.school_level] || 0;
    rpt[school.school_level] += school.male;
    return rpt;
  }, {});

  return {
    title: "Males per School Type",
    data: reportData
  };
}

function buildReport(data, title, feature) {

}

function printReport(report) {
  console.log(report.title);
  console.log("----------------------------------------------");
  for (const [type, count] of Object.entries(report.data)) {
    console.log(`${type.padEnd(30)}${count}`);
  }
}


main();