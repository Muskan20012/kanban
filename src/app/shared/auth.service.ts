import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { GoogleAuthProvider } from '@firebase/auth';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private fireauth: AngularFireAuth,private router:Router) { }
  login(email:string,password:string){
    return this.fireauth.signInWithEmailAndPassword(email,password).then(()=>{
      localStorage.setItem('token','true');
      this.router.navigate(['home']);
    },err =>{
      alert('Email or Password is incorrect');
      this.router.navigate(['login']);
    }

    )
  } 
  register(email:string,password:string){
    return this.fireauth.createUserWithEmailAndPassword(email,password).then(()=>{
      alert('Register Success');
      this.router.navigate(['login']);
    },err =>{
      alert('Email or Password is incorrect');
      this.router.navigate(['register']);
    }
    )
  }
  logout(){
    return this.fireauth.signOut().then(()=>{
      localStorage.removeItem('token');
      this.router.navigate(['login']);
    })
  }
}
