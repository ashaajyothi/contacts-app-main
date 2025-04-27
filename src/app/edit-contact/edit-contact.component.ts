import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ContactsService } from '../contacts/contacts.service';
import {Router} from '@angular/router';
import { phoneTypeValues, addressTypeValues } from '../contacts/contact.model';  
import { restrictedWords, restrictedWords1 } from '../validators/restricted-words.validator';

@Component({
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.css']
})
export class EditContactComponent implements OnInit {
  phoneTypes = phoneTypeValues;
  addressTypes = addressTypeValues;
  contactForm = this.fb.nonNullable.group({
    id: '',
    personal: false,
    firstName : ['', [Validators.required, Validators.minLength(3)]], //new FormControl('', Validators.required),
    lastName : '',
    dateOfBirth : '',
    favoritesRanking : <number | null> null,
    phone: this.fb.nonNullable.group({
      phoneNumber: '',
      phoneType: '',
    }),
    address: this.fb.nonNullable.group({
      streetAddress: ['', Validators.required],
      city : ['', Validators.required],
      state: ['', Validators.required],
      postalCode: ['', Validators.required],
      addressType: '',
    }),
    //notes: ['', restrictedWords]
    notes: ['', restrictedWords1(['foo','bar'])]
  });
  
  /*firstName = new FormControl();
  lastName = new FormControl();
  dateOfBirth = new FormControl();
  favoritesRanking = new FormControl();*/

  constructor(private route: ActivatedRoute, private contactsService: ContactsService, private router: Router, private fb: FormBuilder ) { }

  ngOnInit() {
    const contactId = this.route.snapshot.params['id'];
    if (!contactId) return

    this.contactsService.getContact(contactId).subscribe((contact) => {
      if(!contact) return
      /*This is with FormBuider */
      this.contactForm.setValue(contact);

      /*This is to save only few values on the form*/
      /*const names = {firstName: contact.firstName, lastName: contact.lastName};
      this.contactForm.patchValue(names);*/

      /*Saving with FormControl*/
      /*this.contactForm.controls.id.setValue(contact.id);
      this.contactForm.controls.firstName.setValue(contact.firstName);
      this.contactForm.controls.lastName.setValue(contact.lastName);
      this.contactForm.controls.dateOfBirth.setValue(contact.dateOfBirth);
      this.contactForm.controls.favoritesRanking.setValue(contact.favoritesRanking);
      this.contactForm.controls.phone.controls.phoneNumber.setValue(contact.phone.phoneNumber);
      this.contactForm.controls.phone.controls.phoneType.setValue(contact.phone.phoneType);
      this.contactForm.controls.address.controls.streetAddress.setValue(contact.address.streetAddress);
      this.contactForm.controls.address.controls.city.setValue(contact.address.city);
      this.contactForm.controls.address.controls.state.setValue(contact.address.state);
      this.contactForm.controls.address.controls.postalCode.setValue(contact.address.postalCode);
      this.contactForm.controls.address.controls.addressType.setValue(contact.address.addressType);*/


      /*this.firstName.setValue(contact.firstName);
      this.lastName.setValue(contact.lastName);
      this.dateOfBirth.setValue(contact.dateOfBirth);
      this.favoritesRanking.setValue(contact.favoritesRanking);*/
    })
  }

  get firstName(){
    return this.contactForm.controls.firstName;
  }

  get notes(){
    return this.contactForm.controls.firstName;
  }

  saveContact() {
    this.contactsService.saveContact(this.contactForm.getRawValue()).subscribe({next: () => this.router.navigate(['/contacts'])});
    console.log(this.contactForm.controls.firstName.value)
    console.log(this.contactForm.controls.lastName.value)
    console.log(this.contactForm.controls.dateOfBirth.value)
    console.log(this.contactForm.controls.favoritesRanking.value)
    console.log(this.contactForm.controls.phone.controls.phoneNumber.value);
  }
}
function firstName() {
  throw new Error('Function not implemented.');
}

