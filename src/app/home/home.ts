import { Component, signal } from '@angular/core';
import axios from 'axios';
import { FlightModel } from '../../models/flight.model';
import { RouterLink } from "@angular/router";
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import { Utils } from '../utils';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  imports: [RouterLink, MatCardModule , MatButtonModule , MatIconModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  service = AuthService
  flights = signal<FlightModel[]>([])

  constructor(public utils: Utils){
    axios.get<FlightModel[]>('https://flight.pequla.com/api/flight/list?type=departure')
    .then(rsp => {

      const sorted = rsp.data.sort((a1,a2)=> new Date(a1.scheduledAt).getTime() - new Date(a2.scheduledAt).getTime())
      this.flights.set(rsp.data)
  })

}

}
