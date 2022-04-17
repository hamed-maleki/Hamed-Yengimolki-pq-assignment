export interface convertingInfo {
    success: boolean;
    timeseries: boolean;
    id: any;
    base: string;
    start_date: string;
    end_date: string;
    rates: any;
    convertCurrency: string;
    amount: string;
}

export interface rateInfo { key: string; rate: any; }