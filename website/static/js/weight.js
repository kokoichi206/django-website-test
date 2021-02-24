
function controlsAndDashboards() {

    import {rawData} from './weightData.js';
    var data = google.visualization.arrayToDataTable(rawData);
    
    console.log(data);

  var dashboard = new google.visualization.Dashboard(document.getElementById('dashboard_div'));


  var chartRangeFilter = new google.visualization.ControlWrapper({
    controlType: 'ChartRangeFilter',
    containerId: 'filter_div',
    options: {
      filterColumnIndex: 0,
      ui: {
        chartType: 'ComboChart',
        chartOptions: {
          colors: ['rgb(255, 159, 64)'],
          height: 70
        }
      }
    }
  });


  var ScatterChart = new google.visualization.ChartWrapper({
    chartType: 'ScatterChart',
    containerId: 'chart1_div',
    options: {
      title:'Body weight Since 2020/12/25',
      height: 200,
      hAxis: {
        textPosition: 'none'
      },
      colors: ['rgb(255, 99, 132)']
    }
  });

  var table = new google.visualization.ChartWrapper({
    chartType: 'Table',
    containerId: 'chart6_div',
    options: {
      height: 120,
      width: '70%'
    }
  });


//   dashboard.bind(chartRangeFilter, [ScatterChart, table]);
  dashboard.bind(chartRangeFilter, [ScatterChart, table]);

  dashboard.draw(data);

}
