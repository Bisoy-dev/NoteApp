import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  showProfile: boolean = false;
  constructor(private authService: AuthService) {
    authService.listenProfile()
      .subscribe(val => {
        this.showProfile = val;
      })
  }

  ngOnInit(): void {
    this.showProfile = (!!localStorage.getItem(environment.authTokenStorageName))
  }

}
