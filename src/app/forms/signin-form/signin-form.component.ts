import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormGroup, FormControl, FormBuilder, NgForm } from '@angular/forms';
import { Validators } from '@angular/forms';
import { DbService } from '../../services/db.service';
import { User } from '../../models/user';
import { SignupFormComponent } from '../signup-form/signup-form.component';

@Component({
  selector: 'app-signin-form',
  templateUrl: './signin-form.component.html',
  styleUrls: ['./signin-form.component.css']
})
export class SigninFormComponent implements OnInit {

  userInfo:User[]=[];
  form: FormGroup;
  showSuccessMessage: boolean;
  serverErrorMessages: string;
  
  
  constructor(private fb: FormBuilder,public dialog: MatDialog,
    private dialogRef: MatDialogRef<SigninFormComponent>,
    @Inject(MAT_DIALOG_DATA) data, private service:DbService) { }

  ngOnInit(): void {
  }

  openSignUpDialog(){
    const dialogRef = this.dialog.open(SignupFormComponent, {
      width: '550px',
      
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
     
    });
  }
  
  login(form: NgForm){
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
