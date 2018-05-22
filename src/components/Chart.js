import React from 'react';
import { Doughnut } from 'react-chartjs-2';

const Chart = (props) => {
  const generateDataObject = () => {
    const { options } = props;
    const data = [];
    const labels = [];
    options.forEach((option) => {
      data.push(option.voters.length);
      labels.push(option.text)
    });
    return {
      datasets: [{
        data: data,
        backgroundColor: [
          "salmon","darkgray", "aqua",  "pink", "coral",
          "blue", "purple", "magenta", "red", "green",
        ],
        borderColor: "#f8f8f8",
        borderWidth: 10,
      }],
      labels: labels
    }
  };

  // const options = {
  //   elements: {
  //     point: {
  //       radius: 5,
  //       borderWidth: 1,
  //       pointStyle: 'circle',
  //       hitRadius: 5,
  //       hoverRadius: 5
  //     }
  //   },
  //   legend: {
  //     labels: {
  //       fontColor: "#222222",
  //       fontSize: 16
  //     }
  //   },
  //   maintainAspectRatio: true,
  // };

  return (
    <Doughnut style={{ height: "90%"}} data={generateDataObject()}/>
  )
};

export default Chart


