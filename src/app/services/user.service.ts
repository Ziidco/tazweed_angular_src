import { Injectable } from '@angular/core';
import { BehaviorSubject, from } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  activeAccount = new BehaviorSubject<boolean>(false);
  messageToRead = new BehaviorSubject<any>("");
  selectedUser = new BehaviorSubject<any>("");
  baseUrl: string = "https://www.tazweedservice.ml/rest/api/v1/";
  // baseUrl:string = "https://www.tazwedservices.net/rest/api/v1/";   
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


  // get profile invoice

  getOneProfileInvoice(profileID: string, customerType: string, X_Request_ID: string, token) {


    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Customer-Type': customerType,
      'X-Request-ID': X_Request_ID,
      'auth': token

    })
    // console.log(this.baseUrl + "profile/invoice/" + profileID);
    
    return this.http.get(this.baseUrl + "profile/invoice/" + profileID, { headers: headers });
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
    else if (localStorage.getItem("auth")) {
      return false;
    }
    else {
      // console.log("---------------- un safe route ");
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

  isClient() {
    const loggedUser = localStorage.getItem("sessionUserType");
    if (loggedUser == "client") {
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


  getBalanceDetails(profileId, customerType: string, X_Request_ID: string, token) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Customer-Type': customerType,
      'X-Request-ID': X_Request_ID,
      'auth': token

    })
    return this.http.get(this.baseUrl + "profile/balance/details/" + profileId, { headers: headers });

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
  getComment(jobId, customerType: string, X_Request_ID: string, token) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Customer-Type': customerType,
      'X-Request-ID': X_Request_ID,
      'auth': token

    })
    return this.http.get(this.baseUrl + "comment/" + jobId, { headers: headers });
  }

  // get profile messages
  // https://www.tazweedservice.ml/rest/api/v1/admin/message/:profileId
  getProfileMessages(profileId, customerType: string, X_Request_ID: string, token) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Customer-Type': customerType,
      'X-Request-ID': X_Request_ID,
      'auth': token

    })
    return this.http.get(this.baseUrl + "admin/messages/" + profileId, { headers: headers });
    ///messages/{profileId}
  }


  getAllMessagesFromSpecificProfile(profileId, fromId, customerType: string, X_Request_ID: string, token) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Customer-Type': customerType,
      'X-Request-ID': X_Request_ID,
      'auth': token

    })
    console.log(this.baseUrl + "admin/message/" + profileId + "?fromId=" + fromId);
    return this.http.get(this.baseUrl + "admin/message/" + profileId + "?fromId=" + fromId, { headers: headers });


  }

  ///message/{profileId}

  /* admin part ===============
  ============================== */

  // add country

  addCountry(data, customerType: string, X_Request_ID: string, token) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Customer-Type': customerType,
      'X-Request-ID': X_Request_ID,
      'auth': token

    })
    return this.http.post(this.baseUrl + "admin/config/country", data, { headers: headers });
  }

  editCountry(countryId: string, data, customerType: string, X_Request_ID: string, token) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Customer-Type': customerType,
      'X-Request-ID': X_Request_ID,
      'auth': token

    })
    console.log(this.baseUrl + "admin/config/country/" + countryId);

    return this.http.put(this.baseUrl + "admin/config/country/" + countryId, data, { headers: headers });


  }


  deleteCountry(countryId: string, customerType: string, X_Request_ID: string, token) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Customer-Type': customerType,
      'X-Request-ID': X_Request_ID,
      'auth': token

    })
    return this.http.delete(this.baseUrl + "admin/config/country/" + countryId, { headers: headers });
  }

  // get statistics
  getStatistics(customerType: string, X_Request_ID: string, token) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Customer-Type': customerType,
      'X-Request-ID': X_Request_ID,
      'auth': token

    })
    return this.http.get(this.baseUrl + "admin/statistics", { headers: headers });
  }


  // get all partners
  getAllPartners(customerType: string, X_Request_ID: string, token) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Customer-Type': customerType,
      'X-Request-ID': X_Request_ID,
      'auth': token

    })
    return this.http.get(this.baseUrl + "admin/profile?customerType=partner", { headers: headers });
  }
  getAllPartnersByEmail(email,customerType: string, X_Request_ID: string, token) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Customer-Type': customerType,
      'X-Request-ID': X_Request_ID,
      'auth': token

    })
    return this.http.get(this.baseUrl + "admin/profile?customerType=partner&email=" + email, { headers: headers });
  }
  getAnyUserByAnyWord(searchValue,customerType: string, X_Request_ID: string, token) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Customer-Type': customerType,
      'X-Request-ID': X_Request_ID,
      'auth': token

    })
    console.log(this.baseUrl + "admin/profile?searchValue=" + searchValue);
    
    return this.http.get(this.baseUrl + "admin/profile?searchValue=" + searchValue, { headers: headers });
  }

  // get all clients
  getAllClients(customerType: string, X_Request_ID: string, token) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Customer-Type': customerType,
      'X-Request-ID': X_Request_ID,
      'auth': token

    })
    return this.http.get(this.baseUrl + "admin/profile?customerType=client", { headers: headers });
  }
  getAllClientsByEmail(email,customerType: string, X_Request_ID: string, token) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Customer-Type': customerType,
      'X-Request-ID': X_Request_ID,
      'auth': token

    })
    
    return this.http.get(this.baseUrl + "admin/profile?customerType=client&email=" + email, { headers: headers });
  }
  // get all tax invoice
  getAllTax(customerType: string, X_Request_ID: string, token) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Customer-Type': customerType,
      'X-Request-ID': X_Request_ID,
      'auth': token

    })
    return this.http.get(this.baseUrl + "taxInvoiceInfo", { headers: headers });
  }
  // add tax invoice
  addTax(data, customerType: string, X_Request_ID: string, token) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Customer-Type': customerType,
      'X-Request-ID': X_Request_ID,
      'auth': token

    })
    return this.http.post(this.baseUrl + "taxInvoiceInfo", data, { headers: headers });
  }


  // edit tax invoice
  editTax(data, customerType: string, X_Request_ID: string, token, taxId) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Customer-Type': customerType,
      'X-Request-ID': X_Request_ID,
      'auth': token

    })
    return this.http.put(this.baseUrl + "taxInvoiceInfo/" + taxId, data, { headers: headers });
  }



  ///taxInvoiceInfo/{_id}



  // updata profile by admin

  // updata profile
  updateProfileByAdmin(profileId, newStatus, customerType: string, X_Request_ID: string, token) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Customer-Type': customerType,
      'X-Request-ID': X_Request_ID,
      'auth': token

    })
    return this.http.put(this.baseUrl + "admin/profile/" + profileId, newStatus, { headers: headers });
  }


  // send message to user

  sendMessageToUser(data, customerType: string, X_Request_ID: string, token) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Customer-Type': customerType,
      'X-Request-ID': X_Request_ID,
      'auth': token

    })
    return this.http.post(this.baseUrl + "admin/message", data, { headers: headers });
  }



  // send message to category

  sendMessageToCategory(data, customerType: string, X_Request_ID: string, token) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Customer-Type': customerType,
      'X-Request-ID': X_Request_ID,
      'auth': token

    })
    return this.http.post(this.baseUrl + "admin/message", data, { headers: headers });
  }


  // get all messages sent by admin

  getAllAdminMessages(customerType: string, X_Request_ID: string, token) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Customer-Type': customerType,
      'X-Request-ID': X_Request_ID,
      'auth': token

    })
    return this.http.get(this.baseUrl + "admin/message", { headers: headers });
  }


  // get unpaid Balance

  // https://www.tazweedservice.ml/rest/api/v1/promoCodes
  getUnpaidBalance(customerType: string, X_Request_ID: string, token) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Customer-Type': customerType,
      'X-Request-ID': X_Request_ID,
      'auth': token

    })
    return this.http.get(this.baseUrl + "admin/unpaid/balance", { headers: headers });
  }
  // update unpaid Balance
  updateUnpaidBalance(data, partnerId, customerType: string, X_Request_ID: string, token) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Customer-Type': customerType,
      'X-Request-ID': X_Request_ID,
      'auth': token

    })
    return this.http.put(this.baseUrl + "admin/balance/" + partnerId, data, { headers: headers });
  }


  // get expired jobs

  getExpiredJobs(customerType: string, X_Request_ID: string, token) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Customer-Type': customerType,
      'X-Request-ID': X_Request_ID,
      'auth': token

    })
    return this.http.get(this.baseUrl + "admin/job/expired?fields=projectTitle,status,iconName,totalCost,createdAt,firstName,lastName,_id", { headers: headers });
  }


  // update unpaid Balance
  updateMessage(messageId, customerType: string, X_Request_ID: string, token) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Customer-Type': customerType,
      'X-Request-ID': X_Request_ID,
      'auth': token

    })
    return this.http.put(this.baseUrl + "admin/update/message/" + messageId, { "read": true }, { headers: headers });
  }


  // add visit 
  //customerType: string, X_Request_ID: string, token
  addVisit() {
    // const headers = new HttpHeaders({
    //   'Content-Type': 'application/json',
    //   'X-Customer-Type': customerType,
    //   'X-Request-ID': X_Request_ID,
    //   'auth': token

    // })
    return this.http.post(this.baseUrl + "visitors/increment", {});

    //{ headers: headers }
  }

  signOut(customerType: string, X_Request_ID: string, token) {


    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Customer-Type': customerType,
      'X-Request-ID': X_Request_ID,
      'auth': token

    })
    return this.http.get(this.baseUrl + "profile/signout/token", { headers: headers });

  }

  getJobTypes(customerType: string, X_Request_ID: string, token) {


    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Customer-Type': customerType,
      'X-Request-ID': X_Request_ID,
      'auth': token

    })
    return this.http.get(this.baseUrl + "jobType", { headers: headers });

  }



  // promo code by admin

  // Add promo code
  addPromocode(data, customerType: string, X_Request_ID: string, token) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Customer-Type': customerType,
      'X-Request-ID': X_Request_ID,
      'auth': token

    })
    return this.http.post(this.baseUrl + "promoCodes", data, { headers: headers });
  }

  getAllPromocodes(customerType: string, X_Request_ID: string, token) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Customer-Type': customerType,
      'X-Request-ID': X_Request_ID,
      'auth': token

    })
    return this.http.get(this.baseUrl + "promoCodes", { headers: headers });
  }

  getOnePromocode(promoCodeId, customerType: string, X_Request_ID: string, token) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Customer-Type': customerType,
      'X-Request-ID': X_Request_ID,
      'auth': token

    })
    console.log(this.baseUrl + "promoCodes/" + promoCodeId);

    return this.http.get(this.baseUrl + "promoCodes/" + promoCodeId, { headers: headers });
  }

  getPromocodeStatistics(promoCodeId, customerType: string, X_Request_ID: string, token) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Customer-Type': customerType,
      'X-Request-ID': X_Request_ID,
      'auth': token

    })
    console.log(this.baseUrl + "statistics/promocode/" + promoCodeId);

    return this.http.get(this.baseUrl + "statistics/promocode/" + promoCodeId, { headers: headers });
  }


  checkPromoCodeValidity(code, customerType: string, X_Request_ID: string, token) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Customer-Type': customerType,
      'X-Request-ID': X_Request_ID,
      'auth': token

    })
    return this.http.get(this.baseUrl + "promoCodes/check/" + code, { headers: headers });
  }

  checkPromoCodeValidityInProject(code, customerType: string, X_Request_ID: string, token, X_Job_Type, x_user_email) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Customer-Type': customerType,
      'X-Request-ID': X_Request_ID,
      'auth': token,
      'X-Job-Type': X_Job_Type,
      'x-user-email': x_user_email

    })
    // console.log(this.baseUrl + "promoCodes/job/check/" + code);

    return this.http.get(this.baseUrl + "promoCodes/job/check/" + code, { headers: headers });
  }


  UpdatePromocode(promoCodeId, data, customerType: string, X_Request_ID: string, token) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Customer-Type': customerType,
      'X-Request-ID': X_Request_ID,
      'auth': token

    })
    return this.http.put(this.baseUrl + "promoCode/" + promoCodeId, data, { headers: headers });
  }


  deketePromocode(promoCodeId, customerType: string, X_Request_ID: string, token) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Customer-Type': customerType,
      'X-Request-ID': X_Request_ID,
      'auth': token

    })
    return this.http.delete(this.baseUrl + "promoCode/" + promoCodeId, { headers: headers });
  }


  getProfilePromoCodes(userEmail, customerType: string, X_Request_ID: string, token) {
    // console.log(this.baseUrl + "profile/promoCodes/" + userEmail);

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Customer-Type': customerType,
      'X-Request-ID': X_Request_ID,
      'auth': token

    })
    return this.http.get(this.baseUrl + "profile/promoCodes/" + userEmail, { headers: headers });
  }


  getOneProject(projectId, customerType: string, X_Request_ID: string, token, x_user_email) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Customer-Type': customerType,
      'X-Request-ID': X_Request_ID,
      'auth': token,
      'X-User-Email': x_user_email

    })
    console.log(this.baseUrl + "job/profile/" + projectId);

    return this.http.get(this.baseUrl + "job/profile/" + projectId, { headers: headers });
  }


  getCountries() {
    return this.http.get("https://restcountries.eu/rest/v2/all");
  }


  getPartnerBalanceHistory(partnerId, customerType: string, X_Request_ID: string, token) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Customer-Type': customerType,
      'X-Request-ID': X_Request_ID,
      'auth': token

    })
    console.log(this.baseUrl + "admin/balance/" + partnerId);

    return this.http.get(this.baseUrl + "admin/balance/" + partnerId, { headers: headers });
  }



  getAllAdminsProfile(customerType: string, X_Request_ID: string, token) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Customer-Type': customerType,
      'X-Request-ID': X_Request_ID,
      'auth': token

    })
    // console.log(this.baseUrl + "admin/profile");

    return this.http.get(this.baseUrl + "admin/profile?customerType=admin", { headers: headers });
  }



  deleteUserProfile(profileId, customerType: string, X_Request_ID: string, token) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Customer-Type': customerType,
      'X-Request-ID': X_Request_ID,
      'auth': token

    })

    return this.http.delete(this.baseUrl + "profile/" + profileId, { headers: headers });
  }

  //https://www.tazweedservice.ml/rest/api/v1/profile/:_id



  getTime() {
    // console.log(this.baseUrl + "currentTime/");

    return this.http.get(this.baseUrl + "currentTime/");
  }


  getCountriesPublic() {
    // console.log(this.baseUrl + "countries");

    return this.http.get(this.baseUrl + "admin/config/country");


  }
  getCountriesCode() {
    // console.log(this.baseUrl + "countries");

    return this.http.get(this.baseUrl + "profile/country/code");


  }


  // Credit Balance Part

  addCreditBalance(data, customerType: string, X_Request_ID: string, token) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Customer-Type': customerType,
      'X-Request-ID': X_Request_ID,
      'auth': token

    })
    return this.http.post(this.baseUrl + "profile/client/balance", data, { headers: headers });
  }

  askForBalance(data, customerType: string, X_Request_ID: string, token) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Customer-Type': customerType,
      'X-Request-ID': X_Request_ID,
      'auth': token

    })
    return this.http.post(this.baseUrl + "profile/balance/ask", data, { headers: headers });
  }


  getAskingForBalanceRequests(customerType: string, X_Request_ID: string, token) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Customer-Type': customerType,
      'X-Request-ID': X_Request_ID,
      'auth': token

    })

    return this.http.get(this.baseUrl + "profile/balance/ask/details" , { headers: headers });
  }

  getAskingForBalanceRequestsPerProfile(customerType: string, X_Request_ID: string, token,profileId) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Customer-Type': customerType,
      'X-Request-ID': X_Request_ID,
      'auth': token

    })

    return this.http.get(this.baseUrl + "profile/balance/ask/details?profileId=" + profileId , { headers: headers });
  }



  updateAskingForBalance(data,balanceId, customerType: string, X_Request_ID: string, token) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Customer-Type': customerType,
      'X-Request-ID': X_Request_ID,
      'auth': token

    })
    console.log(this.baseUrl + "profile/balance/ask/" + balanceId);
    
    return this.http.put(this.baseUrl + "profile/balance/ask/" + balanceId, data, { headers: headers });
  }


  getClientCreditBalance(clientId, customerType: string, X_Request_ID: string, token) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Customer-Type': customerType,
      'X-Request-ID': X_Request_ID,
      'auth': token

    })

    return this.http.get(this.baseUrl + "profile/client/balance/" + clientId, { headers: headers });
  }



  /* Admin Balance Part */


  generateOtp(data, customerType: string, X_Request_ID: string, token) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Customer-Type': customerType,
      'X-Request-ID': X_Request_ID,
      'auth': token

    })

    // console.log(this.baseUrl + "admin/balance/otp");

    return this.http.post(this.baseUrl + "admin/balance/otp", data, { headers: headers });
  }

  addBalanceToClientByAdmin(data, customerType: string, X_Request_ID: string, token) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Customer-Type': customerType,
      'X-Request-ID': X_Request_ID,
      'auth': token

    })
    console.log(this.baseUrl + "admin/profile/balance");

    return this.http.post(this.baseUrl + "admin/profile/balance", data, { headers: headers });
  }



  getSingleBill(jobId, customerType: string, X_Request_ID: string, token) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Customer-Type': customerType,
      'X-Request-ID': X_Request_ID,
      'auth': token

    })

    //profile/invoice/job/:jobId
    console.log(this.baseUrl + "profile/invoice/job/" + jobId);


    return this.http.get(this.baseUrl + "profile/invoice/job/" + jobId, { headers: headers });
  }



  generateBillsByDuration(data, customerType: string, X_Request_ID: string, token) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Customer-Type': customerType,
      'X-Request-ID': X_Request_ID,
      'auth': token

    })
    console.log(this.baseUrl + "admin/invoices");

    return this.http.post(this.baseUrl + "admin/invoices", data, { headers: headers });
  }





  getOneProjectActivityLog(projectId, customerType: string, X_Request_ID: string, token) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Customer-Type': customerType,
      'X-Request-ID': X_Request_ID,
      'auth': token,

    })

    return this.http.get(this.baseUrl + "activityLog/job/" + projectId, { headers: headers });
  }


  // contact

  //admin/contactForm


  contactAdmin(data) {

    return this.http.post(this.baseUrl + "contactForm", data);
  }

  getContactData(customerType: string, X_Request_ID: string, token) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Customer-Type': customerType,
      'X-Request-ID': X_Request_ID,
      'auth': token

    })

    return this.http.get(this.baseUrl + "contactForm" , { headers: headers });
  }


  addNewService(data, customerType: string, X_Request_ID: string, token) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Customer-Type': customerType,
      'X-Request-ID': X_Request_ID,
      'auth': token

    })

    return this.http.post(this.baseUrl + "dynamic/service", data, { headers: headers });
  }

  getAllServices(customerType: string, X_Request_ID: string, token) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Customer-Type': customerType,
      'X-Request-ID': X_Request_ID,
      'auth': token

    })

    return this.http.get(this.baseUrl + "dynamic/service", { headers: headers });
  }


  deleteService(serviceId: string, customerType: string, X_Request_ID: string, token) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Customer-Type': customerType,
      'X-Request-ID': X_Request_ID,
      'auth': token

    })
    return this.http.delete(this.baseUrl + "dynamic/service/" + serviceId, { headers: headers });
  }


  
  updateService(serviceId: string,data, customerType: string, X_Request_ID: string, token) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Customer-Type': customerType,
      'X-Request-ID': X_Request_ID,
      'auth': token

    })
    return this.http.put(this.baseUrl + "dynamic/service/" + serviceId,data, { headers: headers });
  }


  

getCommonFields(customerType: string, X_Request_ID: string, token) {
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'X-Customer-Type': customerType,
    'X-Request-ID': X_Request_ID,
    'auth': token

  })
  
  return this.http.get(this.baseUrl + "commonFields", { headers: headers });
}
  getServiceDataByName(serviceName,customerType: string, X_Request_ID: string, token) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Customer-Type': customerType,
      'X-Request-ID': X_Request_ID,
      'auth': token

    })
    // console.log(this.baseUrl + "dynamic/service?serviceName=" + serviceName);
    
    return this.http.get(this.baseUrl + "dynamic/service?serviceName=" + serviceName, { headers: headers });
  }

  getAllServicesDynamic(customerType: string, X_Request_ID: string, token) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Customer-Type': customerType,
      'X-Request-ID': X_Request_ID,
      'auth': token

    })
    // console.log(this.baseUrl + "dynamic/service?serviceName=" + serviceName);
    
    return this.http.get(this.baseUrl + "dynamic/service", { headers: headers });
  }


  
  addNewBalanceTemplete(data, customerType: string, X_Request_ID: string, token) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Customer-Type': customerType,
      'X-Request-ID': X_Request_ID,
      'auth': token

    })

    return this.http.post(this.baseUrl + "profile/balance/account", data, { headers: headers });
  }

  editBalanceTemplete(balanceId,data, customerType: string, X_Request_ID: string, token) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Customer-Type': customerType,
      'X-Request-ID': X_Request_ID,
      'auth': token

    })

    return this.http.put(this.baseUrl + "profile/balance/account/" + balanceId, data, { headers: headers });
  }


  getAllBalancetempletes(profileId,customerType: string, X_Request_ID: string, token) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Customer-Type': customerType,
      'X-Request-ID': X_Request_ID,
      'auth': token

    })
    
    return this.http.get(this.baseUrl + "profile/balance/account/profile/" + profileId, { headers: headers });
  }

  getBalancetempleteDetails(balanceId,customerType: string, X_Request_ID: string, token) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Customer-Type': customerType,
      'X-Request-ID': X_Request_ID,
      'auth': token

    })
    console.log(this.baseUrl + "profile/balance/account/" + balanceId);
    
    return this.http.get(this.baseUrl + "profile/balance/account/" + balanceId, { headers: headers });
  }

  deleteBalanceTemplete(balaneId, customerType: string, X_Request_ID: string, token) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Customer-Type': customerType,
      'X-Request-ID': X_Request_ID,
      'auth': token

    })
    return this.http.delete(this.baseUrl + "profile/balance/account/" + balaneId, { headers: headers });
  }



}
