import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, filter, switchMap, take, tap } from 'rxjs/operators';

import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(
        private toastService: ToastrService,
    ) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request);
    }

    private makeToast(error: any) {
        this.toastService.error(
            `${error}`,
            'Eror',
            { toastClass: 'toast ngx-toastr', closeButton: true }
        );
    }
}