import { Component,OnInit } from '@angular/core';
// import { AuthService } from 'src/app/shared/auth.service';
import{AngularFireAuth} from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { ModalService } from 'src/app/shared/modal.service';
import { GoogleAuthProvider,getAuth, signInWithPopup, } from "firebase/auth";
import firebase from 'firebase/compat/app';
import { AuthService } from "src/app/shared/auth.service";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  email:string='';
  password:string='';
  constructor( private auth: AngularFireAuth, private router:Router,private modalService: ModalService , ){}
  
// login(){
  //   if(this.email==''){
    //     alert('Please enter email');
    //     return;
    //   }
    //   if(this.password==''){
      //     alert('Please enter password');
      //     return;
      //   }
      //   this.auth.login(this.email,this.password);
      //   this.email='';
      //   this.password='';
      // }
      
login(email: string, password: string) {
  
  this.auth
    .signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Successfully logged in, redirect to homepage or other routes.
      this.router.navigate(['/home']);
    })
    .catch((error) => {
    

        this.modalService.setErrorMessage(error.message);
      
    });
}
signInWithGoogle() {
  console.log('Sign in with google');
//   this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
//     .then((result) => {
//       // You can access the user's information here via result.user
//       console.log(result.user);
//     })
//     .catch((error) => {
//       console.error(error);
//     });
// }
const provider = new firebase.auth.GoogleAuthProvider(); // Create a GoogleAuthProvider instance
    
    this.auth.signInWithPopup(provider)
      .then((result) => {
        // You can access the user's information here via result.user
        console.log(result.user);
      })
      .catch((error) => {
        console.error(error);
      });
  }
}

