import { Injectable } from '@angular/core';
import { rateInfo } from '@app/types/convertTypes';

@Injectable({
  providedIn: 'root'
})
export class ObjectToArrayService {

  constructor() { }

  public objectTransformToArray(objectForTransform: any, value: string) {
    const dataToReturn: rateInfo[] = [];
    Object.keys(objectForTransform).forEach((key: string) =>{
      const ObjectToAdd = {
        key: key,
        rate: objectForTransform[key][value],
      }
      dataToReturn.push(ObjectToAdd);
    })
    return dataToReturn.reverse();
  }

  public chartDataCreator(array: any) {
    const xAxis: string[] = [];
    const yAxis: number[] = [];
    array.forEach((data: any) => {
      xAxis.push(data.key);
      yAxis.push(data.rate);
    })
    return {xAxis: xAxis, yAxis: yAxis };
  }
}
