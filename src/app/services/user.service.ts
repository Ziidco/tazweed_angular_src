import { Injectable } from '@angular/core';
import { from } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl: string = "https://www.tazweedservice.ml/rest/api/v1/";
  constructor(private http: HttpClient) {
  }

  // new user method
  signUp(data, customerType: string, X_Request_ID: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Customer-Type': customerType,
      'X-Request-ID': X_Request_ID
    })
    return this.http.post(this.baseUrl + "profile/signup", data, { headers: headers });
  }

  // login method
  signIn(data, customerType: string, X_Request_ID: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Customer-Type': customerType,
      'X-Request-ID': X_Request_ID
    })
    return this.http.post(this.baseUrl + "profile/signin", data, { headers: headers });
  }

  // retrieve one profile data
  getOneProfileData(profileID: string, customerType: string, X_Request_ID: string, token) {


    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Customer-Type': customerType,
      'X-Request-ID': X_Request_ID,
      'auth': token

    })
    return this.http.get(this.baseUrl + "profile/" + profileID, { headers: headers });
  }


  // update user profile
  updateUserProfile(data, profileID: string, customerType: string, X_Request_ID: string, token) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Customer-Type': customerType,
      'X-Request-ID': X_Request_ID,
      'auth': token

    })
    return this.http.put(this.baseUrl + "profile/" + profileID, data, { headers: headers });
  }
  resetPassword(data, customerType: string, X_Request_ID: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Customer-Type': customerType,
      'X-Request-ID': X_Request_ID
    })
    return this.http.post(this.baseUrl + "restPassword", data, { headers: headers });
  }
  resetPasswordInProfile(data, customerType: string, X_Request_ID: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Customer-Type': customerType,
      'X-Request-ID': X_Request_ID
    })
    return this.http.put(this.baseUrl + "profile/update/password", data, { headers: headers });
  }
  isLoggedIn() {
    if (localStorage.getItem("auth")) {
      console.log("---------------- safe route ");

      return true;
    }
    else {
      console.log("---------------- un safe route ");
      return false;
    }
  }
  isPatner() {
    const loggedUser = localStorage.getItem("sessionUserType");
    if (loggedUser == "partner") {
      return true;
    }
    else {
      return false;
    }
  }




  // add Rating
  addRating(data, customerType: string, X_Request_ID: string, token) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Customer-Type': customerType,
      'X-Request-ID': X_Request_ID,
      'auth': token

    })
    return this.http.post(this.baseUrl + "profile/rate", data, { headers: headers });
  }

  // get Rating
  getRating(profileId, customerType: string, X_Request_ID: string, token) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Customer-Type': customerType,
      'X-Request-ID': X_Request_ID,
      'auth': token

    })
    return this.http.get(this.baseUrl + "profile/rate/" + profileId, { headers: headers });

  }


  // add Comment
  addComment(data, customerType: string, X_Request_ID: string, token) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Customer-Type': customerType,
      'X-Request-ID': X_Request_ID,
      'auth': token

    })
    return this.http.post(this.baseUrl + "comment", data, { headers: headers });
  }



  // get Comment
  getComment(jobId,customerType: string, X_Request_ID: string, token) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Customer-Type': customerType,
      'X-Request-ID': X_Request_ID,
      'auth': token

    })
    return this.http.get(this.baseUrl + "comment/" + jobId , { headers: headers });
  }


}
