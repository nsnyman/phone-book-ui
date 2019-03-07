import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {ContactComponent} from './contact/contact.component';
import {ContactListComponent} from './contact-list/contact-list.component';
import {HttpClientModule} from '@angular/common/http';
import {ContactService} from './services/contact.service';
import {AddContactModalComponent} from './add-contact-modal/add-contact-modal.component';
import {AppRoutingModule} from './app-routing.module';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    ContactComponent,
    ContactListComponent,
    AddContactModalComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule.forRoot()
  ],
  providers: [ContactService],
  bootstrap: [AppComponent],
  entryComponents: [
    AddContactModalComponent
  ]
})
export class AppModule {
}
