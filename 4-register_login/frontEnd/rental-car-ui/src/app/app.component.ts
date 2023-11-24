import { Component } from '@angular/core';
import { StorageService } from './auth/services/storage/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'rental-car-ui';

  isCustomerLoggedIn:boolean = StorageService.isCustomerLoggedIn();
  isAdminLoggedIn:boolean = StorageService.isAdminLoggedIn();

  constructor(private router:Router){}

  ngOnInit(){
    this.router.events.subscribe(event =>{
      this.isCustomerLoggedIn = StorageService.isCustomerLoggedIn();
      this.isAdminLoggedIn = StorageService.isAdminLoggedIn();
    })
  }


  logout(){
    StorageService.signOut();
    sessionStorage.removeItem("emailAtive")
    this.router.navigateByUrl("/login");
  }


}
