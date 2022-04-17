import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../services/storage/storage.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {
  public tableData = [];
  historyColumns: string[] = ['Date', 'Event', 'Actions'];

  constructor(
    private storageService: StorageService,
  ) { }

  ngOnInit(): void {
    this.tableData = this.storageService.getHistoryData();
  }

  public removeHistory(index: number) {
    this.storageService.removeItemFormStorage(index);
    const dataToPush = this.storageService.getHistoryData();
    this.tableData = dataToPush;
  }

}
