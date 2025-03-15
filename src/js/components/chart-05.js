import ApexCharts from "apexcharts";

// ===== chartTwo
const chart05 = () => {
  const chartTwoOptions = {
    series: [
      {
        name: "Total Views",
        data: [44, 55, 41, 67, 22, 43, 65, 30, 50, 60, 70, 80], // Example data for Total Views
      },
      {
        name: "Total Profit",
        data: [13, 23, 20, 8, 13, 27, 15, 20, 25, 30, 35, 40], // Example data for Total Profit
      },
      {
        name: "Total Users",
        data: [10, 15, 12, 18, 20, 22, 25, 30, 35, 40, 45, 50], // Example data for Total Users
      },
    ],
    colors: ["#1A56DB", "#60A5FA", "#BFDBFE"],
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

  const chartSelector = document.querySelectorAll("#chartTwo");

  if (chartSelector.length) {
    const chartTwo = new ApexCharts(
      document.querySelector("#chartFive"),
      chartTwoOptions
    );
    chartTwo.render();
  }
};

export default chart05;
