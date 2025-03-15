import ApexCharts from "apexcharts";

// ===== chartTotalPolicyCustomer
const chartTotalPolicyCustomer = () => {
  const chartTotalPolicyCustomerOptions = {
    series: [
      {
        name: "Total Policy Customers",
        data: [50, 70, 90, 120, 100, 150, 130, 180, 200, 170, 190, 220],
      },
    ],
    colors: ["#10B981"], // Green color for the line
    chart: {
      fontFamily: "Satoshi, sans-serif",
      type: "line", // Change type to "line"
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
      colors: ["#10B981"], // Match marker color with line color
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
      //   text: "Total Policy Customers",
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

  const chartSelector = document.querySelectorAll("#chartTotalPolicyCustomer");

  if (chartSelector.length) {
    const chartPolicyCustomer = new ApexCharts(
      document.querySelector("#chartTotalPolicyCustomer"),
      chartTotalPolicyCustomerOptions
    );
    chartPolicyCustomer.render();
  }
};

export default chartTotalPolicyCustomer;