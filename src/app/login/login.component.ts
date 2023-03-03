import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CognitoService } from '../service/cognito.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form!: FormGroup;
  isSubmitted: boolean = false;


  constructor(
    private formBuilder: FormBuilder,
    private cognitoService: CognitoService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  onSubmit() {
    this.isSubmitted = true;

    const loginRequest = {
      "actionType": "initiate_auth",
      "ClientId": "4qlcnjgiv690c6m6a3i1do15mr",
      "Username": this.form.controls['username'].value,
      "Password": this.form.controls['password'].value
    }
    this.cognitoService.loginUser(loginRequest).subscribe((response: any) => {
      console.log("Response ,", response.AuthenticationResult)
      localStorage.setItem("cognitoSession", JSON.stringify(response.AuthenticationResult))
      this.router.navigateByUrl("/dashboard")
    })


  }


}

