import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { UserDataProvider } from './user-data';

/*
  Generated class for the BackendProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class BackendProvider {


    constructor(public http: Http, public userService: UserDataProvider) {
    }

    logout() {
        return this.http.get(this.userService.baseUrl + "account/logout")
            .map(res => res.json());
    }
    login(obj) {
        return this.http.get(this.userService.baseUrl + "account/logon?phoneNumber="+obj)
            .map(res => res.json());
    }
    verify(obj) {
        return this.http.post(this.userService.baseUrl + "account/verify", obj)
            .map(res => res.json());
    }
    setImage(obj) {
        return this.http.post(this.userService.baseUrl + "account/setimage", obj)
            .map(res => res.json());
    }
    getProfile() {
        return this.http.get(this.userService.baseUrl + "account/getprofile")
            .map(res => res.json());
    }
    updateProfile(obj) {
        return this.http.post(this.userService.baseUrl + "account/updateprofile", obj)
            .map(res => res.json());
    }

    getActiveSubscription() {
        return this.http.get(this.userService.baseUrl + "subscriptions/getactive")
            .map(res => res.json());
    }
    getSubscriptions(obj) {
        return this.http.post(this.userService.baseUrl + "subscriptions/query",obj)
            .map(res => res.json());
    }
    deleteSubscription(id) {
        return this.http.delete(this.userService.baseUrl + "subscriptions?id="+id)
            .map(res => res.json());
    }
    getPayments(obj) {
        return this.http.post(this.userService.baseUrl + "payments/query",obj)
            .map(res => res.json());
    }
    getSubscriptionPlans() {
        return this.http.get(this.userService.baseUrl + "plans/getpaidplans")
            .map(res => res.json());
    }
    addSubscriptionPlan(id) {
        return this.http.get(this.userService.baseUrl + "subscriptions/add?planId="+id)
            .map(res => res.json());
    }
    confirmPayment(obj) {
        return this.http.post(this.userService.baseUrl + "payments",obj)
            .map(res => res.json());
    }
    getKinds() {
        return this.http.get(this.userService.baseUrl + "kinds")
            .map(res => res.json());
    }
    getTypes(id) {
        return this.http.get(this.userService.baseUrl + "types/getbykind?kindId="+id)
            .map(res => res.json());
    }
    getCategories(id) {
        return this.http.get(this.userService.baseUrl + "categories/getbytype?typeId="+id)
            .map(res => res.json());
    }
    getQuestions(obj) {
        return this.http.post(this.userService.baseUrl + "quiz/getquestions",obj)
            .map(res => res.json());
    }
    markQuestions(obj) {
        return this.http.post(this.userService.baseUrl + "quiz/markquestions",obj)
            .map(res => res.json());
    }
    getResults(obj) {
        return this.http.post(this.userService.baseUrl + "quiz/getresults",obj)
            .map(res => res.json());
    }

    

    

    getNotifications(cnt) {
        return this.http.get(this.userService.baseUrl + "agents/getalerts?count="+cnt)
            .map(res => res.json());
    }

    
    getStats() {
        return this.http.get(this.userService.baseUrl + "public/agentstats")
            .map(res => res.json());
    }

}
