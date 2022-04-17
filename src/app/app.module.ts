import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { ToastrModule } from 'ngx-toastr';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ConvertorComponent } from './pages/convertor/convertor.component';
import { HistoryComponent } from './pages/history/history.component';
import { HeaderComponent } from './components/header/header.component';
import { TableViewComponent } from './components/table-view/table-view.component';
import { ChartViewComponent } from './components/chart-view/chart-view.component';
import { ConvertViewComponent } from './components/convert-view/convert-view.component';

import { NgChartsModule } from 'ng2-charts';
import { JwtInterceptor } from './services/httpServices/jwtInterceptor';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ConvertorComponent,
    HistoryComponent,
    TableViewComponent,
    ChartViewComponent,
    ConvertViewComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    MatSelectModule,
    MatRadioModule,
    MatTableModule,
    MatIconModule,
    ToastrModule,
    NgxSkeletonLoaderModule,
    NgChartsModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    // { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
