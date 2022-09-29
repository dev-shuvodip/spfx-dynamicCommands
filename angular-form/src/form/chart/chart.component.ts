import { Component, Input, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})

export class ChartComponent implements OnInit {
  stackConfig: any
  stackCanvas: any
  stackCanvasContext: any
  stackChart: any
  @Input('isChartReady') chartReady!: boolean
  @Input('labels') labels: string[] = []
  @Input('completedMileStone') completedMileStone: number[] = []
  @Input('incompleteMileStone') incompleteMileStone: number[] = []

  constructor() {
    Chart.register(...registerables)
    Chart.register(ChartDataLabels)
  }

  ngOnChanges(): void {
    if (this.chartReady) {
      this.PlotStackChart()
    }
  }

  ngOnInit(): void {
    this.PlotStackChart()
  }

  PlotStackChart() {
    var yAxesTicks: number[] = []
    var maxStackCount: number = 0

    this.stackConfig = {
      type: 'bar',
      data: {
        labels: this.labels,
        datasets: [{
          label: 'Completed',
          data: this.completedMileStone,
          backgroundColor: 'red',
          datalabels: {
            color: 'white',
            display: function (context: any): boolean {
              maxStackCount = Math.max(...yAxesTicks)
              return context.dataset.data[context.dataIndex] >= Math.abs(maxStackCount * (5 / 100));
            },
            font: {
              weight: 'bold'
            },
            formatter: (value: number) => Math.round(value).toFixed(0) + '%',
          }
        }, {
          label: 'Incomplete',
          data: this.incompleteMileStone,
          backgroundColor: 'rgb(202, 202, 202)',
          datalabels: {
            color: 'grey',
            display: function (context: any): boolean {
              maxStackCount = Math.max(...yAxesTicks)
              return context.dataset.data[context.dataIndex] >= Math.abs(maxStackCount * (5 / 100));
            },
            font: {
              weight: 'bold'
            },
            formatter: (value: number) => Math.round(value).toFixed(0) + '%',
          }
        }]
      },
      options: {
        indexAxis: 'y',
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'Substantive Status by Process'
          }
        },
        // Core options
        layout: {
          padding: {
            top: 24,
            right: 16,
            bottom: 0,
            left: 8
          }
        },
        elements: {
          line: {
            fill: false
          },
          point: {
            hoverRadius: 7,
            radius: 5
          }
        },
        scales: {
          x: {
            grid: {
              display: false
            },
            stacked: true,
            ticks: {
              crossAlign: 'far',
              min: 0,
              max: 100,
              callback: function (value: string): string {
                yAxesTicks.push(Number(value))
                return value + "%";
              },
              scaleLabel: {
                display: true,
                labelString: "Task Completion"
              }
            }
          },
          y: {
            grid: {
              display: false
            },
            stacked: true,
            scaleLabel: {
              display: true,
              labelString: "Phase"
            }
          }
        }
      }
    }

    this.stackCanvas = document.getElementById('StackChart') as HTMLCanvasElement;
    this.stackCanvas.height = this.labels.length > 20 ? this.labels.length * 100 + 100 : this.stackCanvas.parentElement.offsetHeight;
    this.stackCanvasContext = this.stackCanvas.getContext("2d");

    if (this.stackChart) {
      this.stackChart.destroy();
    }

    this.stackChart = new Chart(this.stackCanvasContext, this.stackConfig);
  }
}

