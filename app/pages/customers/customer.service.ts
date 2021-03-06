import { Injectable }     from '@angular/core';
import { Http, Response, Headers, RequestOptions}  from '@angular/http';
import { Customer }       from './customer';
import { Observable }     from 'rxjs/Observable';


@Injectable()
export class CustomerService {
  constructor(private http: Http) { }

  private customerURL = 'app/heroes';  // URL to web API


  getCustomers(): Observable<Customer[]> {
    return this.http.get(this.customerURL)
      .map(this.extractData)
      .catch(this.handleError);
  }

  getCustomer(id){
    return this.customers(id)
  }

  addCustomer(name: string): Observable<Customer> {
    let body = JSON.stringify({ name });
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(this.customerURL, body, options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  private extractData(res: Response) {
    let body = res.json();
    this.customers = body;
    return body.data || {};
  }

  private handleError(error: any) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }
}
