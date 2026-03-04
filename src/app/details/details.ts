import { Component, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-details',
  imports: [],
  templateUrl: './details.html',
  styleUrl: './details.css',
})
export class Details {
  id = signal(null)

  constructor(route: ActivatedRoute){
    route.params.subscribe(a =>this.id.set(a['id']))
  }
}
