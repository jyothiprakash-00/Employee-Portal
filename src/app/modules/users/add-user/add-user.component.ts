import { Component } from '@angular/core';
import { UserModel } from '../users.model';
import { Router } from '@angular/router';
import { UserApiService } from '../user-api.service';
import { ToasterService } from 'src/app/services/toaster.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent {
user:UserModel={}
constructor(private api : UserApiService,private router:Router,private toaster:ToasterService){}
addUser(){
this.api.addUserApi(this.user).subscribe({
  next:(res:UserModel)=>{
    console.log(res);
    this.toaster.showSuccess('New User Added successfully')
    this.router.navigateByUrl("/users")
  },
  error:(err:any)=>{
    this.toaster.showError(err.message)
  }
})
}
cancel(){
  this.user={}
}
}
