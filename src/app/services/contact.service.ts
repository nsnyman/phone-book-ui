import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {PhoneBook} from '../model/phone.book';
import {Entry} from '../model/entry';

@Injectable()
export class ContactService {

  constructor(private http: HttpClient) {

  }

  getEntries(): Observable<PhoneBook> {
    return this.http.get<PhoneBook>('/v1/phone-book/entries');
  }

  searchEntries(name: string): Observable<PhoneBook> {
    return this.http.get<PhoneBook>('/v1/phone-book/entries?name=' + name);
  }

  createContact(entry: Entry) {
    return this.http.post<Entry>('/v1/phone-book/entries', entry);
  }
}
