import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserApiService } from '../user-api.service';
import { UserModel } from '../users.model';
import { ToasterService } from 'src/app/services/toaster.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  user:UserModel={}
constructor(private route:ActivatedRoute , private api:UserApiService, private router:Router, private toaster:ToasterService){}
ngOnInit(): void {
  this.route.params.subscribe((res:any)=>{
    // console.log(res);
    const {id} = res
    // api call to get details of id 
    this.getExistingUser(id)
  })
}
getExistingUser(id:any){
  this.api.viewUserApi(id).subscribe((res:any)=>{
    console.log(res);
    this.user = res;
    
  })
}
// edit user
editUser(id:any){
  this.api.updateUserApi(id,this.user).subscribe({
    next:(res:any)=>{
      console.log(res);
      this.toaster.showSuccess('New User updated successfully')
      this.router.navigateByUrl("/users")
    },
    error:(err:any)=>{
      this.toaster.showError(err.error)
    }
  })
  }
  cancel(id:any){
    this.getExistingUser(id)
  }
}
