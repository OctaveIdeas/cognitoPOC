import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CognitoService } from '../service/cognito.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {


  frontendRefreshToken: string = '';

  constructor(
    private cognitoService: CognitoService,
    private router: Router
  ) { }

  ngOnInit(): void {
    var parsedSessionToken = JSON.parse(localStorage.getItem("cognitoSession")!)
    this.frontendRefreshToken = parsedSessionToken.AccessToken
  }

  refreshToken() {
    var parsedSessionToken = JSON.parse(localStorage.getItem("cognitoSession")!)

    var refreshToken = {
      "actionType": "refresh_token",
      "ClientId": "4qlcnjgiv690c6m6a3i1do15mr",
      "refresh_token": parsedSessionToken.RefreshToken
    }
    this.cognitoService.loginUser(refreshToken).subscribe((response) => {
      var refresh_access_token = response.AuthenticationResult;
      var refres_token = parsedSessionToken.RefreshToken;
      refresh_access_token["RefreshToken"] = refres_token;
      console.log("Refresh Access Token is :: ", refresh_access_token)
      this.frontendRefreshToken = refresh_access_token.AccessToken
      localStorage.setItem("cognitoSession", JSON.stringify(refresh_access_token))

    })

  }

  signOut() {
    var parsedSessionToken = JSON.parse(localStorage.getItem("cognitoSession")!)

    let signoutRequest = {
      "actionType": "sign_out", "access_token": parsedSessionToken.AccessToken
    }
    this.cognitoService.loginUser(signoutRequest).subscribe(() => {
      console.log("User Logout Successfully")
      localStorage.removeItem("cognitoSession");
      this.router.navigateByUrl("../")
    })

  }

}
