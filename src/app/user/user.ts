import { Component, signal } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule, MatSuffix } from '@angular/material/input';
import { routes } from '../app.routes';
import { Router, RouterLink } from '@angular/router';
import axios from 'axios';
import {MatSelectModule} from '@angular/material/select';
import { FlightService } from '../services/flight.service';
import { Loading } from "../loading/loading";
import Swal from 'sweetalert2'
import { Alerts } from '../alerts';
import { Utils } from '../utils';
import { FlightModel } from '../../models/flight.model';
import { MatListModule } from "@angular/material/list";

@Component({
  selector: 'app-user',
  imports: [MatButtonModule, MatCardModule, MatInputModule, MatIconModule, FormsModule, MatSelectModule, Loading, MatSuffix, MatListModule, RouterLink],
  templateUrl: './user.html',
  styleUrl: './user.css',
})
export class User {
  public activeUser = AuthService.getActiveUser()
  destinations = signal<string[]>([])
  recommended = signal<FlightModel[]>([])
  oldPassword = ''
  newPassword = ''
  passRepeat = ''
  public hide1 = true;
  public hide2 = true;
  public hide3 = true;

  constructor(private router : Router , public utils : Utils){
    if(!this.activeUser){
      this.router.navigate(['/login'])
    }

    FlightService.getDestinations()
    .then(rsp => this.destinations.set(rsp.data))

    FlightService.getFlightsByDestination(this.activeUser!.destination)
    .then(rsp => this.recommended.set(rsp.data.content))
  }

    

    updateUser(){
      Alerts.confirm('Are you sure you want to save changes ?', ()=>{
          AuthService.updateActiveUser(this.activeUser!)
          Alerts.success('User updated successfuly')

          // da bi se bez refresh prikazalo nakon save
          FlightService.getFlightsByDestination(this.activeUser!.destination)
          .then(rsp => this.recommended.set(rsp.data.content))
          

        })
      
    }

    updatePassword(){

        Alerts.confirm('Are you sure you want to change password ?',()=>{
          if(this.oldPassword != this.activeUser?.password){
          Alerts.error('Incorrect old password')
          return
        }
        if(this.newPassword != this.passRepeat){
          Alerts.error('Passwords dont match')
          return
        }
        if(this.newPassword == this.oldPassword){
          Alerts.error('New password cannot be the same as the old one')
          return
        }

        AuthService.updateActiveUserPassword(this.newPassword)
        Alerts.success('Password updated succsesfuly')
        AuthService.logout()
        this.router.navigate(['/login'])

        })

    }
  
}
