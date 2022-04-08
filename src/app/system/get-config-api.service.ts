import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class GetConfigApiService {
  private readonly _apiUrlData = new BehaviorSubject<any>('');
  public readonly apiUrlData$ = this._apiUrlData.asObservable();

  constructor(private http: HttpClient) {}

  public getUrlData(): string {
    return this._apiUrlData.getValue();
  }

  public getUrl$(): Observable<any> {
    if (!environment.production) {
      this._apiUrlData.next(window.location.origin);
      return this.apiUrlData$;
    }

    return this.http.get('/assets/configuration/api_url', { responseType: 'text' }).pipe(
      map((url) => {
        this._apiUrlData.next(url);
        return url;
      })
    );
  }
}
