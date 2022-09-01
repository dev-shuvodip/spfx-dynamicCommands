import { Component, Input, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';

@Component({
  selector: 'app-doughnut-chart',
  templateUrl: './doughnut-chart.component.html',
  styleUrls: ['./doughnut-chart.component.css']
})

export class DoughnutChartComponent implements OnInit {
  doughnutConfig: any
  doughnutCanvas: any
  doughnutCanvasContext: any
  doughnutChart: any
  @Input('isDoughnutChartReady') chartReady!: boolean
  @Input('totalEngagements') totalEngagements!: number
  @Input('completedEngagements') completedEngagements!: number

  percentCompletedEngagements!: number
  percentInompleteEngagements!: number

  constructor() {
    Chart.register(...registerables)
  }

  ngOnChanges(): void {
    if (this.chartReady) {
      this.PlotDoughnutChart()
    }
  }

  ngOnInit(): void {
    this.PlotDoughnutChart()
  }

  PlotDoughnutChart() {
    this.percentCompletedEngagements = Math.round((this.completedEngagements / this.totalEngagements) * 100)
    this.percentInompleteEngagements = Math.round(((this.totalEngagements - this.completedEngagements) / this.totalEngagements) * 100)

    this.doughnutConfig = {
      type: 'doughnut',
      data: {
        labels: ['Completed', 'Incomplete'],
        datasets: [{
          label: 'Completed Engagements',
          data: [this.percentCompletedEngagements, this.percentInompleteEngagements],
          backgroundColor: ['red', 'rgb(202, 202, 202)'],
          borderWidth: 0
        }]
      },
      options: {
        rotation: -90,
        circumference: 180,
        legend: {
          display: false
        },
        tooltip: {
          enabled: true
        },
        cutoutPercentage: 75,
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: 'Milestones Completed All Engagements'
          },
          datalabels: {
            display: false
          }
        }
      }
    }

    this.doughnutCanvas = document.getElementById('DoughnutChart') as HTMLCanvasElement;
    this.doughnutCanvasContext = this.doughnutCanvas.getContext("2d");

    if (this.doughnutChart) {
      this.doughnutChart.destroy();
    }

    this.doughnutChart = new Chart(this.doughnutCanvasContext, this.doughnutConfig);
  }
}
