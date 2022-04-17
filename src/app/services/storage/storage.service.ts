import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor() { }

  public addToStroage(rate: any) {
    const storagedConverted = window.localStorage.getItem('convertedRates');
    let dataToSave = [];
    if (storagedConverted) {
      dataToSave = JSON.parse(storagedConverted);
    }
    rate.id = dataToSave.length;
    dataToSave.push(rate);
    window.localStorage.setItem('convertedRates', JSON.stringify(dataToSave));
  }
  public getHistoryData() {
    const storagedConverted = window.localStorage.getItem('convertedRates');
    let dataToReturn = [];
    if (storagedConverted) {
      dataToReturn = JSON.parse(storagedConverted);
    }
    return dataToReturn;
  }

  public removeItemFormStorage(index: number) {
    const storagedConverted = window.localStorage.getItem('convertedRates');
    let dataToSave = [];
    if (storagedConverted) {
      dataToSave = JSON.parse(storagedConverted);
    }
    dataToSave.splice(index, 1);
    window.localStorage.setItem('convertedRates', JSON.stringify(dataToSave));
  }

  public findItem(id: number) {
    const storagedConverted = window.localStorage.getItem('convertedRates');
    let foundItem = null;
    let dataToSearch = [];
    if (storagedConverted) {
      dataToSearch = JSON.parse(storagedConverted);
    }

    dataToSearch.forEach((history: any) => {
      if (id === history.id) {
        foundItem = history;
      }
    })
     return foundItem;
  }
}
