import { Inject, Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormGroup, FormControl, FormBuilder, NgForm } from '@angular/forms';
import { Validators } from '@angular/forms';
import { DbService } from '../../services/db.service';
import { User } from '../../models/user';
import * as _ from 'lodash';
import { SigninFormComponent } from '../signin-form/signin-form.component';




@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.css']
})


export class SignupFormComponent{

  userInfo:User[]=[];
  form: FormGroup;
  showSuccessMessage: boolean;
  serverErrorMessages: string;
  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  
 constructor(private fb: FormBuilder,public dialog: MatDialog,
  private dialogRef: MatDialogRef<SignupFormComponent>,
  @Inject(MAT_DIALOG_DATA) data, private service:DbService) {} 


  
  openSignInDialog(){
    const dialogRef = this.dialog.open(SigninFormComponent, {
      width: '550px',
      
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
     
    });
  }

  postUser(form: NgForm){
    this.service.postUser(form.value).subscribe(
      res =>{
        this.showSuccessMessage=true;
        setTimeout(()=> this.showSuccessMessage =false,4000);
        this.resetForm(form);
        this.userInfo=form.value;
      }, 
      err=>{
        if(err.status==422){
       
         this.serverErrorMessages = err.error.message;
         
          
        }else{
          this.serverErrorMessages='Something went wrong, please contact admin...';
          
        }
      }
    )
   }
   resetForm(form: NgForm){
    this.service.selectedUser={
      name: "",
      email: "",
      password: "",
    };
    form.resetForm();
    this.serverErrorMessages='';

  }
  save() {
    this.dialogRef.close(this.form.value);
}

close() {
    this.dialogRef.close();
}
}
