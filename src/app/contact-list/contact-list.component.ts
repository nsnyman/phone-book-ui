import {Component, Input, OnInit} from '@angular/core';
import {Entry} from '../model/entry';
import {ContactService} from '../services/contact.service';
import {NgbAlertConfig, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {AddContactModalComponent} from '../add-contact-modal/add-contact-modal.component';
import {FormBuilder, FormGroup} from '@angular/forms';
import {isUndefined} from 'util';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})
export class ContactListComponent implements OnInit {

  @Input() entries: Entry[] = [];

  searchForm: FormGroup;
  message = '';
  showMessage = false;
  alertType = '';

  constructor(private contactService: ContactService,
              private modalService: NgbModal,
              private formBuilder: FormBuilder,
              private alertConfig: NgbAlertConfig) {
    this.createForm();
  }

  ngOnInit() {
    this.getPhoneBookEntries();
  }

  private createForm() {
    this.searchForm = this.formBuilder.group({
      searchParam: '',
    });
  }

  searchEntries() {
    this.contactService.searchEntries(this.searchForm.value.searchParam)
      .subscribe(
        (data) => this.entries = data.entries,
        (error) => {
          this.errorMessage(error.error.message);
        });
  }

  getPhoneBookEntries() {
    this.contactService.getEntries().subscribe(
      (data) => this.entries = data.entries,
      (error) => {
        this.errorMessage(error.error.message);
      });
  }


  openFormModal() {
    const modalRef = this.modalService.open(AddContactModalComponent);
    modalRef.result.then((result) => {
      this.contactService.createContact(result).subscribe(
        (data) => {
          this.getPhoneBookEntries();
          this.successMessage('Contact added successfully');
        },
        (error) => {
          this.errorMessage(error.error.message);
        });
    }).catch((error) => {
      console.log(error);
    });
  }

  errorMessage(error: string) {
    if (isUndefined(error)) {
      this.message = 'Internal Server Error';
    } else {
      this.message = error;
    }
    this.alertType = 'danger';
    this.alertConfig.dismissible = true;
    this.showMessage = true;
  }

  successMessage(success: string) {
    this.alertType = 'success';
    this.alertConfig.dismissible = true;
    this.message = success;
    this.showMessage = true;
  }

  closeAlert() {
    this.message = '';
    this.showMessage = false;
  }
}
