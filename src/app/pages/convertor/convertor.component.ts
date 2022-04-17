import { Component, OnInit, ViewChild } from '@angular/core';
import { ObjectToArrayService } from '@app/services/objectServices/object-to-array.service';
import { ChartViewComponent } from '@app/components/chart-view/chart-view.component';
import { convertingInfo, rateInfo } from '@app/types/convertTypes';

export interface chartDataType {
  xAxis: any;
  yAxis: any;
}

@Component({
  selector: 'app-convertor',
  templateUrl: './convertor.component.html',
  styleUrls: ['./convertor.component.scss']
})
export class ConvertorComponent implements OnInit {
  @ViewChild('chartView') chartView: ChartViewComponent | undefined;
  public convertTableData: rateInfo[] = [];
  public convertChartData: chartDataType = {xAxis: null, yAxis: null};
  public allRatesArray: any = null;
  public tableSize: string = '7';
  public viewType = 'table';

  constructor(
    private objectTreansformService: ObjectToArrayService
  ) { }

  ngOnInit(): void {
  }

  public updateConvertInfo(convertData: any) {
    this.allRatesArray = convertData;
    this.convertTableData = this.sliceUpArray(convertData);
    this.convertChartData = this.objectTreansformService.chartDataCreator(this.convertTableData);
  }

  public sliceUpArray(convertData: convertingInfo) {
    return this.objectTreansformService.objectTransformToArray(convertData['rates'], convertData['convertCurrency']).slice(0, Number(this.tableSize));
  }
  public resizeTableData() {
    this.convertTableData = this.sliceUpArray(this.allRatesArray);
    this.convertChartData = this.objectTreansformService.chartDataCreator(this.convertTableData);
    if (this.viewType === 'chart') {
      this.chartView?.refreshChart(this.convertChartData);
    }
  }

}
