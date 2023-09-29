// @ts-nocheck

// import FusionCharts from "fusioncharts";
// import charts from "fusioncharts/fusioncharts.charts";
// import ReactFusioncharts from "react-fusioncharts";

// // Resolves charts dependancy
// charts(FusionCharts);

// const StudentChart=()=>{

// const dataSource = {
//   width: "100%", // Width of the chart
//   height: "400", // Height of the chart

//   chart: {
//     caption: "App Publishing Trend",
//     subcaption: "2012-2016",
//     xaxisname: "Years",
//     yaxisname: "Total number of apps in store",
//     formatnumberscale: "1",

//     plottooltext:
//       "<b>$dataValue</b> apps were available on <b>$seriesName</b> in $label",
//     theme: "candy",
//     drawcrossline: "7"
//   },
//   categories: [
//     {
//       category: [
//         {
//           label: "2012"
//         },
//         {
//           label: "2013"
//         },
//         {
//           label: "2014"
//         },
//         {
//           label: "2015"
//         },
//         {
//           label: "2016"
//         }
//       ]
//     }
//   ],
//   dataset: [
//     {
//       seriesname: "iOS App Store",
//       data: [
//         {
//           value: "125000"
//         },
//         {
//           value: "300000"
//         },
//         {
//           value: "480000"
//         },
//         {
//           value: "800000"
//         },
//         {
//           value: "1100000"
//         }
//       ]
//     },
//     {
//       seriesname: "Google Play Store",
//       data: [
//         {
//           value: "70000"
//         },
//         {
//           value: "150000"
//         },
//         {
//           value: "350000"
//         },
//         {
//           value: "600000"
//         },
//         {
//           value: "1400000"
//         }
//       ]
//     }
//   ]
// };

//     return (
//       <ReactFusioncharts
//         type="mscolumn2d"
//         width="100%"
//         height="100%"
//         dataFormat="JSON"
//         dataSource={dataSource}
//       />
//     );

// }

// export default StudentChart

// STEP 1 - Include Dependencies
// Include react

// Include the react-fusioncharts component
import ReactFC from "react-fusioncharts";

// Include the fusioncharts library
import FusionCharts from "fusioncharts";

// Include the chart type
import mscolumn2d from "fusioncharts/fusioncharts.charts";

// Include the theme as fusion
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";

// Adding the chart and theme as dependency to the core fusioncharts
ReactFC.fcRoot(FusionCharts, mscolumn2d, FusionTheme);

// STEP 2 - Chart Data

// STEP 3 - Creating the JSON object to store the chart configurations
const StudentChart = ({ data, date }: { data: any; date: any }) => {
  let groupedData = {};
  let groupedDataAb = {};

  function numericMonthToStringMonth(monthNumber: number) {
    if (monthNumber >= 1 && monthNumber <= 12) {
      const date = new Date(0, monthNumber - 1);
      return date.toLocaleString("en-US", { month: "long" });
    } else {
      return "Invalid month number";
    }
  }

  const [year, month] = date.split("-");

  let monthfac = +month;

  const monthName = numericMonthToStringMonth(parseInt(monthfac));

  data?.data.attendance.present_users.forEach((entry: { date: any }) => {
    let date = entry.date;
    if (!groupedData[date]) {
      groupedData[date] = [];
    }
    groupedData[date].push(entry);
  });

  const allEntries: string[] = [];

  Object.keys(groupedData).forEach((date, index) => {
    // console.log(`Index: ${index}, Date: ${date}`);

    allEntries.push(date);
  });

  const lengths = [];
  const absenntlength = [];

  for (const key in groupedData) {
    if (Object.hasOwnProperty.call(groupedData, key)) {
      const array = groupedData[key];
      lengths.push({ index: key, length: array.length });
    }
  }

  //absent

  data?.data.absent_users.forEach((entry: { date: any }) => {
    let date = entry.date;
    if (!groupedDataAb[date]) {
      groupedDataAb[date] = [];
    }
    groupedDataAb[date].push(entry);
  });
  for (const key in groupedDataAb) {
    if (Object.hasOwnProperty.call(groupedDataAb, key)) {
      const array = groupedDataAb[key];
      absenntlength.push({ index: key, length: array.length });
    }
  }

  // console.log("ab=", data.to);

  const chartConfigs = {
    type: "mscolumn2d", // The chart type
    width: "400", // Width of the chart
    height: "600", // Height of the chart
    dataFormat: "json", // Data type
    dataSource: {
      // Chart Configuration
      chart: {
        //Set the chart caption
        caption: `Student present in ${monthName}`,
        //Set the chart subcaption
        subCaption: "In MMbbl = One Million barrels",
        //Set the x-axis name
        xAxisName: "Day",
        //Set the y-axis name
        yAxisName: "Number of student",
        numberSuffix: "",
        //Set the theme for your chart
        theme: "fusion",
      },
      // Chart Data
      categories: [
        {
          category: allEntries?.map((data) => {
            return {
              label: data,
            };
          }),
        },
      ],
      dataset: [
        // {
        //   seriesname: "Total student",
        //   data: allEntries.map(() => {
        //     return {
        //       value: data.total_student,
        //     };
        //   }),
        // },
        {
          seriesname: "Present student",
          data: lengths.map((data) => {
            return {
              value: data.length.toString(),
            };
          }),
        },
        {
          seriesname: "Absent student",
          data: absenntlength.map((data) => {
            return {
              value: data.length.toString(),
            };
          }),
        },
      ],
    },
  };

  // STEP 4 - Creating the DOM element to pass the react-fusioncharts component

  return <ReactFC {...chartConfigs} />;
};

export default StudentChart;
