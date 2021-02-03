import { Injectable } from '@angular/core';
import { BehaviorSubject, from } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  activeAccount= new BehaviorSubject<boolean>(false);
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
      // console.log("---------------- safe route ");

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



 // get balance
 getBalance(profileId, customerType: string, X_Request_ID: string, token) {
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'X-Customer-Type': customerType,
    'X-Request-ID': X_Request_ID,
    'auth': token

  })
  return this.http.get(this.baseUrl + "profile/balance/" + profileId, { headers: headers });

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

  // get profile messages
  // https://www.tazweedservice.ml/rest/api/v1/admin/message/:profileId
  getProfileMessages(profileId,customerType: string, X_Request_ID: string, token) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Customer-Type': customerType,
      'X-Request-ID': X_Request_ID,
      'auth': token

    })
    return this.http.get(this.baseUrl + "admin/message/" + profileId , { headers: headers });
  }



  /* admin part ===============
  ============================== */

  // get statistics
  getStatistics(customerType: string, X_Request_ID: string, token) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Customer-Type': customerType,
      'X-Request-ID': X_Request_ID,
      'auth': token

    })
    return this.http.get(this.baseUrl + "admin/statistics" , { headers: headers });
  }


   // get all partners
   getAllPartners(customerType: string, X_Request_ID: string, token) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Customer-Type': customerType,
      'X-Request-ID': X_Request_ID,
      'auth': token

    })
    return this.http.get(this.baseUrl + "admin/profile?customerType=partner" , { headers: headers });
  }

   // get all clients
   getAllClients(customerType: string, X_Request_ID: string, token) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Customer-Type': customerType,
      'X-Request-ID': X_Request_ID,
      'auth': token

    })
    return this.http.get(this.baseUrl + "admin/profile?customerType=client" , { headers: headers });
  }

  // https://www.tazweedservice.ml/rest/api/v1/admin/profile/profileID



  // updata profile by admin

     // updata profile
     updateProfileByAdmin(profileId,newStatus,customerType: string, X_Request_ID: string, token) {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'X-Customer-Type': customerType,
        'X-Request-ID': X_Request_ID,
        'auth': token
  
      })
      return this.http.put(this.baseUrl + "admin/profile/"+profileId,newStatus , { headers: headers });
    }


    // send message to user

    sendMessageToUser(data,customerType: string, X_Request_ID: string, token) {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'X-Customer-Type': customerType,
        'X-Request-ID': X_Request_ID,
        'auth': token
  
      })
      return this.http.post(this.baseUrl + "admin/message",data , { headers: headers });
    }



    // send message to category

    sendMessageToCategory(data,customerType: string, X_Request_ID: string, token) {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'X-Customer-Type': customerType,
        'X-Request-ID': X_Request_ID,
        'auth': token
  
      })
      return this.http.post(this.baseUrl + "admin/message",data , { headers: headers });
    }


     // get all messages sent by admin

     getAllAdminMessages(customerType: string, X_Request_ID: string, token) {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'X-Customer-Type': customerType,
        'X-Request-ID': X_Request_ID,
        'auth': token
  
      })
      return this.http.get(this.baseUrl + "admin/message" , { headers: headers });
    }


    // get unpaid Balance

    // https://www.tazweedservice.ml/rest/api/v1/admin/unpaid/balance
    getUnpaidBalance(customerType: string, X_Request_ID: string, token) {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'X-Customer-Type': customerType,
        'X-Request-ID': X_Request_ID,
        'auth': token
  
      })
      return this.http.get(this.baseUrl + "admin/unpaid/balance" , { headers: headers });
    }
    // https://www.tazweedservice.ml/rest/api/v1/admin/balance/:partnerId
// update unpaid Balance
    updateUnpaidBalance(data,partnerId,customerType: string, X_Request_ID: string, token) {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'X-Customer-Type': customerType,
        'X-Request-ID': X_Request_ID,
        'auth': token
  
      })
      return this.http.put(this.baseUrl + "admin/balance/" + partnerId,data , { headers: headers });
    }


  // get expired jobs

  getExpiredJobs(customerType: string, X_Request_ID: string, token) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Customer-Type': customerType,
      'X-Request-ID': X_Request_ID,
      'auth': token

    })
    return this.http.get(this.baseUrl + "admin/job/expired" , { headers: headers });
  }



}
