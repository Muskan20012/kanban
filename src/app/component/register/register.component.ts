import { Component } from '@angular/core';
// import { AuthService } from 'src/app/shared/auth.service';
import { AngularFireAuth } from '@angular/fire//compat/auth';
import { Router } from '@angular/router';
import { ModalService } from 'src/app/shared/modal.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
//   email:string='';
//   password:string='';
// constructor( private auth: AuthService){}

// register(){
//   if(this.email==''){
//     alert('Please enter email');
//     return;
//   }
//   if(this.password==''){
//     alert('Please enter password');
//     return;
//   }
//   this.auth.register(this.email,this.password);
//   this.email='';
//   this.password='';
// }
constructor(private auth: AngularFireAuth, private router: Router, private modalService:ModalService) {}

register(email: string, password: string) {
  this.auth
    .createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Successfully registered, redirect to login page.
      this.router.navigate(['/login']);
      console.log(userCredential);
    })
    .catch((error) => {
      this.modalService.setErrorMessage(error.message);

    });
}
}
