import { Component, Input, OnInit } from '@angular/core';
import { rateInfo } from '@app/types/convertTypes';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

@Component({
  selector: 'app-table-view',
  templateUrl: './table-view.component.html',
  styleUrls: ['./table-view.component.scss']
})

export class TableViewComponent implements OnInit {
  @Input() tableData: rateInfo[] = [];
  rateColumns: string[] = ['Date', 'Exchange Rate'];
  statisticsColumn: string[] = ['Statistics', 'Operation'];
  public statisticData = [
    {
      'description': 'Lowest',
    },
    {
      'description': 'Highest',
    },
    {
      'description': 'Avarage',
    },
  ]

  constructor() { }

  ngOnInit(): void {
  }

  public calculateDes(statistic: string) {
    let returningValue = 0;
    let min = this.tableData[0].rate;
    let max = this.tableData[0].rate;
    let avarage = 0;
    let index = this.tableData.length;

    while (index--) {
      min = this.tableData[index].rate < min ? this.tableData[index].rate : min;
      max = this.tableData[index].rate > max ? this.tableData[index].rate : max;
      avarage = avarage + this.tableData[index].rate;
    }
    switch (statistic) {
      case 'Lowest':
        returningValue = min;
        break;
      case 'Highest':
        returningValue = max;
        break;
      default:
        returningValue = avarage / this.tableData.length
    }
    return returningValue;
  }

}
