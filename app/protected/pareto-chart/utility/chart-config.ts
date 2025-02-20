import { ParetoChartData } from "../context/types";

export const getParetoChartData = (data: ParetoChartData) => {


    const sortedRows = [...data.rows].sort(
        (a, b) => b.firstColumnData - a.firstColumnData
        );

    // Compute total sum of all values
    const total = sortedRows
    .map((x) => Number(x.firstColumnData))
    .filter((value) => !isNaN(value)) // Ensure all values are valid numbers
    .reduce((acc: number, value: number) => acc + value, 0);

    let cumulative = 0;
    const cumulativePercentages =  sortedRows.map((row) => {
        cumulative += Number(row.firstColumnData);
        return total ? (cumulative / total) * 100 : 0;
    });
    const cumulativeColors = generateRandomColors(cumulativePercentages.length);

    return {
        labels: sortedRows.map((x) => x.name),
        datasets: [
          {
            type: "bar",
            label: "Values",
            data: sortedRows.map((x) => x.firstColumnData),
            backgroundColor: "rgba(0, 123, 255, 0.5)", // Bar color
            borderColor: "rgba(0, 123, 255, 1)",
            borderWidth: 1,
          },
          {
            type: "line",
            label: "Cumulative Percentage",
            data: cumulativePercentages,
            borderColor: "rgba(255, 99, 132, 1)", // Line color
            borderWidth: 2,
            fill: false,
            yAxisID: "percentage",
            tension: 0.4, // Adds smooth curve effect
            pointBackgroundColor: cumulativeColors, // Different colors for points
            pointRadius: 5, // Make points more visible
            pointStyle: "circle",
          },
        ],
      };

      
}
export const generateRandomColors = (count: number) => {
    return Array.from({ length: count }, () => {
      const r = Math.floor(Math.random() * 255);
      const g = Math.floor(Math.random() * 255);
      const b = Math.floor(Math.random() * 255);
      return `rgb(${r},${g},${b})`;
    });
  };

  export const getParetoChartOptions = (data: ParetoChartData) => {
    const sortedRows = [...data.rows].sort(
        (a, b) => b.firstColumnData - a.firstColumnData
        );
    const total = sortedRows
    .map((x) => Number(x.firstColumnData))
    .filter((value) => !isNaN(value)) // Ensure all values are valid numbers
    .reduce((acc: number, value: number) => acc + value, 0);
    let cumulative = 0;
    const cumulativePercentages =  sortedRows.map((row) => {
        cumulative += Number(row.firstColumnData);
        return total ? (cumulative / total) * 100 : 0;
    });
    return {
        responsive: true,
        // maintainAspectRatio: false, // Allow flexible resizing
        layout: {
          padding: {
            top: 20, // Add extra space to prevent clipping
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: "Frequency",
            },
          },
          percentage: {
            type: "linear",
            position: "right",
            min: 0,
            max: 105, // Increase max limit to avoid clipping at 100%
            title: {
              display: true,
              text: "Cumulative Percentage",
            },
            ticks: {
              callback: function (value: any) {
                return value + "%"; // Show percentage sign on the y-axis
              },
            },
          },
        },
        plugins: {
          annotation: {
            annotations: {
              line1: {
                type: "line",
                yMin: 80,
                yMax: 80,
                borderColor: "rgba(255, 99, 132, 0.5)",
                borderWidth: 2,
                yScaleID: "percentage",
                label: {
                  content: "80% Threshold",
                  enabled: true,
                  position: "end",
                  color: "white",
                  backgroundColor: "rgba(255, 99, 132, 0.7)",
                  padding: 4,
                },
              },
            },
          },
          tooltip: {
            callbacks: {
              label: function (tooltipItem: any) {
                const datasetIndex = tooltipItem.datasetIndex;
                const index = tooltipItem.dataIndex;
                if (datasetIndex === 1) {
                  return ` Cumulative: ${cumulativePercentages[index].toFixed(2)}%`;
                }
                return ` Frequency: ${sortedRows[index].firstColumnData}`;
              },
            },
          },
        },
      };
  }