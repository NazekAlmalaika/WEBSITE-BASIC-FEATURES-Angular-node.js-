import { Component, Inject, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { DbService } from '../../services/db.service';
import { SignupFormComponent } from '../../forms/signup-form/signup-form.component';
import { User } from '../../models/user';
import * as _ from 'lodash';
import { ContactFormComponent } from '../../forms/contact-form/contact-form.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {}
  openSignUpDialog() {
    const dialogRef = this.dialog.open(SignupFormComponent, {
      width: '550px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }
  openContactDialog() {
    const dialogRef = this.dialog.open(ContactFormComponent, {
      width: '700px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }
}
