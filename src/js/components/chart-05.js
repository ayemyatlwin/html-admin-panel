import ApexCharts from "apexcharts";

// ===== chartTwo
const chart05 = () => {
  const chartFiveOptions = {
    series: [
      {
        name: "Self-Binding Policies",
        data: [44, 55, 41, 67, 22, 43, 65, 30, 50, 60, 70, 80], // Example data for Total Views
      },
      {
        name: "Admin Assisted Binding Policies",
        data: [13, 23, 20, 8, 13, 27, 15, 20, 25, 30, 35, 40], // Example data for Total Profit
      },
    ],
    colors: ["#1A56DB", "#60A5FA"],
    chart: {
      type: "bar",
      height: 335,
      stacked: true,
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
    },

    responsive: [
      {
        breakpoint: 1536,
        options: {
          plotOptions: {
            bar: {
              borderRadius: 0,
              columnWidth: "25%",
            },
          },
        },
      },
    ],
    plotOptions: {
      bar: {
        horizontal: false,
        borderRadius: 0,
        columnWidth: "25%",
        borderRadiusApplication: "end",
        borderRadiusWhenStacked: "last",
      },
    },
    dataLabels: {
      enabled: false,
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
    },
    yaxis: {
      tickAmount: 6, // Number of ticks on the y-axis
      min: 0, // Minimum value on the y-axis
      max: 120, // Maximum value on the y-axis
      labels: {
        formatter: function (value) {
          // Customize y-axis labels to show specific values
          const ticks = [0, 20, 40, 60, 80, 100, 120];
          if (ticks.includes(value)) {
            return value;
          }
          return ""; // Hide other labels
        },
      },
    },
    legend: {
      position: "top",
      horizontalAlign: "left",
      fontFamily: "Satoshi",
      fontWeight: 500,
      fontSize: "14px",

      markers: {
        radius: 99,
      },
    },
    fill: {
      opacity: 1,
    },
  };

  const chartSelector = document.querySelectorAll("#chartFive");

  if (chartSelector.length) {
    const chartFive = new ApexCharts(
      document.querySelector("#chartFive"),
      chartFiveOptions
    );
    chartFive.render();
  }
};

export default chart05;
