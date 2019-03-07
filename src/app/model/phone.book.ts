import {Entry} from './entry';

export class PhoneBook {
  name: string;
  entries: Entry[];

  constructor(name: string, entries: Entry[]) {
    this.name = name;
    this.entries = entries;
  }


}
