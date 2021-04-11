import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {

  }

  onLoginButtonTap(email: string, password: string) {
    this.authService.login(email, password).subscribe((res: HttpResponse<any>) => {
      console.log(res);
      // this.router.navigate([res.body.role +"/" + res.body._id]);
      alert('Wrong username or password');

    },(err) =>{
      alert('Wrong username or password');
    });
}

}
