import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ChartDataset } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

export interface chartInfoType{
  xAxis: any;
  yAxis: any;
}

@Component({
  selector: 'app-chart-view',
  templateUrl: './chart-view.component.html',
  styleUrls: ['./chart-view.component.scss']
})
export class ChartViewComponent implements OnInit {
  @Input() chartData: any;
  @ViewChild(BaseChartDirective)
  public chart: BaseChartDirective | undefined;
  public lineChartData: ChartDataset[] = [
    { data: [], label: 'Convert rate' },
  ];
  public lineChartLabels = [];
  public lineChartOptions = {
    responsive: true,
    scales: {
      x: {
          display: false
      },
      y: {
          display: false
      }
  }
  };
  public lineChartColors = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(255,0,0,0.3)',
    },
  ];
  public lineChartType = 'line';
  public lineChartPlugins = [];

  constructor() { }

  ngOnInit() {
    this.lineChartData[0].data = this.chartData['yAxis'];
    this.lineChartLabels = this.chartData['xAxis'];
  }

  public refreshChart(chartInfo: chartInfoType) {
    this.lineChartData[0].data = chartInfo['yAxis'];
    this.lineChartLabels = chartInfo['xAxis'];
    this.chart?.chart?.update();
  }

}
