import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PostService {

  readonly URL: string = 'https://xxxxxxxx.execute-api.us-east-1.amazonaws.com/lambda'

  constructor(private http: HttpClient) { }

  createRecord(payload: any) {
    return this.http
      .post(`${this.URL}`, payload)
      .pipe(map((res: any) => res));
  }
}
