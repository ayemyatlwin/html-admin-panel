import ApexCharts from "apexcharts";

// ===== chartTotalMember
const chartTotalMember = () => {
  const chartTotalMemberOptions = {
    series: [
      {
        name: "Total Register Users",
        data: [100, 120, 130, 150, 160, 180, 200, 220, 240, 260, 280, 300],
      },
    ],
    colors: ["#3C50E0"], // Blue color for the line
    chart: {
      fontFamily: "Satoshi, sans-serif",
      type: "line", // Line chart type
      height: 350,
      toolbar: {
        show: false,
      },
    },
    stroke: {
      width: 3, // Adjust line thickness
      curve: "smooth", // Smooth curve for the line
    },
    markers: {
      size: 5, // Add markers to data points
      colors: ["#3C50E0"], // Match marker color with line color
      strokeWidth: 1, // No border for markers
    },
    dataLabels: {
      enabled: false, // Disable data labels for cleaner look
    },
    xaxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        style: {
          fontSize: "12px",
          fontFamily: "Satoshi, sans-serif",
          padding: "10px", // Add padding to x-axis labels
        },
      },
    },
    yaxis: {
      // title: {
      //   text: "Total Members",
      //   style: {
      //     fontSize: "12px",
      //     fontFamily: "Satoshi, sans-serif",
      //   },
      // },
      labels: {
        style: {
          fontSize: "12px",
          fontFamily: "Satoshi, sans-serif",
          padding: "10px", // Add padding to y-axis labels
        },
      },
    },
    legend: {
      show: true,
      position: "top",
      horizontalAlign: "left",
      fontFamily: "Satoshi, sans-serif",
      markers: {
        radius: 99,
      },
      itemMargin: {
        horizontal: 20, // Add horizontal spacing between legend items
        vertical: 10, // Add vertical spacing between legend items
      },
      offsetY: 10, // Add vertical spacing between the legend and the chart
    },
    grid: {
      yaxis: {
        lines: {
          show: false,
        },
      },
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      enabled: true,
      style: {
        fontSize: "12px",
        fontFamily: "Satoshi, sans-serif",
        padding: "10px", // Add padding inside the tooltip
      },
      y: {
        formatter: function (val) {
          return val;
        },
      },
    },
  };

  const chartSelector = document.querySelectorAll("#chartTotalMember");

  if (chartSelector.length) {
    const chartMember = new ApexCharts(
      document.querySelector("#chartTotalMember"),
      chartTotalMemberOptions
    );
    chartMember.render();
  }
};

export default chartTotalMember;
