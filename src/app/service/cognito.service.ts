import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PostService } from './post.service';

@Injectable({
  providedIn: 'root'
})
export class CognitoService {

  constructor(private postService: PostService) { }

  loginUser(userCredential: any): Observable<any> {
    return this.postService.createRecord(userCredential);
  }
}
