import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserLogin } from 'src/app/models/userLogin.model';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  errMessage: any
  hide: boolean = false;
  submit: boolean = false;
  form: FormGroup
  constructor(private snackBar: MatSnackBar, private _authService: AuthService) {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required])
    })
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.submit = true;
      this.errMessage = null
      this.onLogin()
    } else {
      this.snackBar.open('Please put email and password', 'Invalid input')
    }
  }

  onLogin(): void {
    const user: UserLogin = {
      email: this.form.controls['email'].value,
      password: this.form.controls['password'].value
    }
    this._authService.login(user)
      .subscribe((res) => {
        this.submit = false
        console.log(res)
        localStorage.setItem(environment.authTokenStorageName, res.token.toString())
        this._authService.showProfile(true);
      }, (err) => {
        this.submit = false
        console.log(err)
        this.errMessage = err;
      })
  }

}
