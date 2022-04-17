import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { ConverterResourceService } from '../../services/converterServices/converter-resource.service';
import { NumberValidatorService } from '../../services/converterServices/number-validator.service';
import { StorageService } from '../../services/storage/storage.service';
import * as moment from 'moment';

@Component({
  selector: 'app-convert-view',
  templateUrl: './convert-view.component.html',
  styleUrls: ['./convert-view.component.scss']
})
export class ConvertViewComponent implements OnInit {
  public formBox: FormGroup = new FormGroup({
  });
  public currencies: any[] = [];
  public convertElements: any = {
    amount: null,
    fromCurrency: {
      value: null,
      options: []
    },
    toCurrency: {
      value: null,
      options: []
    }
  };
  public currencyLoading: boolean = true;
  public todayDate: string = moment().format('YYYY-MM-DD');
  public thirtyDaysAgo: string = moment().add(-30, 'days').format('YYYY-MM-DD');
  public convertedRate = {
    originalCurrency: null,
    convertedCurrency: null,
    rate: null,
    amount: null,
  }
  private monthlyRate: any = null;
  public dataID: any = null;
  @Output() newConvert = new EventEmitter<string>();

  constructor(
    private converterResource: ConverterResourceService,
    private fb: FormBuilder,
    private storageService: StorageService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.dataID = this.route.snapshot.paramMap.get('id');
    this.formBox = this.fb.group({
      amount: ['', [
        Validators.required,
        NumberValidatorService.numberValidator
      ],
      ],
      convertControlTo: ['', [
        Validators.required,
      ]],
      convertControlFrom: ['', [
        Validators.required,
      ]],
    });
    this.converterResource.getInfo('symbols').
      subscribe((response) => {
        this.currencyLoading = false;
        if (this.dataID) {
          this.getHistoryInfo();
        }
        Object.keys(response['symbols']).forEach((key) => {
          this.currencies.push(response['symbols'][key]);
          this.clearFilter(this.formBox.controls['convertControlFrom'], 'fromCurrency');
          this.clearFilter(this.formBox.controls['convertControlTo'], 'toCurrency');
        });
      }, () => {

      })
  }

  private getHistoryInfo() {
    const historyInfo = this.storageService.findItem(Number(this.dataID));
    if (historyInfo) {
      this.convertElements.amount = historyInfo['amount'];
      this.convertElements.fromCurrency.value = historyInfo['base'];
      this.convertElements.toCurrency.value = historyInfo['convertCurrency'];
      this.monthlyRate = historyInfo;
      this.arrangeData();
    }
  }

  private _filter(value: string): Array<any> {
    if (!value) {
      value = '';
    }
    const filterValue = value.toLowerCase();
    return this.currencies.filter(option => option['description'].toLowerCase().includes(filterValue));
  }

  public submitClicked() {
    this.convertedRate.rate = null;
    const currencyParamForSending = {
      params: {
        start_date: this.thirtyDaysAgo,
        end_date: this.todayDate,
        symbols: `${this.convertElements.fromCurrency.value},${this.convertElements.toCurrency.value}`,
        base: this.convertElements.fromCurrency.value
      }
    }
    this.converterResource.getInfoWithParam('timeseries', currencyParamForSending)
      .subscribe((response) => {
        this.createConvertData(response);
      })
  }

  public createConvertData(info: any) {
    this.monthlyRate = info;
    delete this.monthlyRate['motd'];
    this.monthlyRate.convertCurrency = this.convertElements.toCurrency.value;
    this.monthlyRate.amount = this.convertElements.amount;
    this.arrangeData();
  }

  public arrangeData() {
    this.storageService.addToStroage(this.monthlyRate);
    this.convertedRate.originalCurrency = this.convertElements.fromCurrency.value;
    this.convertedRate.convertedCurrency = this.convertElements.toCurrency.value;
    this.convertedRate.amount = this.convertElements.amount;
    this.convertedRate.rate = this.monthlyRate['rates'][this.todayDate][this.convertElements.toCurrency.value];
    this.newConvert.emit(this.monthlyRate);
  }


  public reverseValues() {
    const temporaryValue = this.convertElements['fromCurrency'].value;
    this.convertElements['fromCurrency'].value = this.convertElements['toCurrency'].value;
    this.convertElements['toCurrency'].value = temporaryValue;
  }

  public clearFilter(source: AbstractControl, optionsName: string) {
    this.convertElements[optionsName].options = source.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value)),
    );
  }

}
