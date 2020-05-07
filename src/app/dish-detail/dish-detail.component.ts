import { Component, OnInit, Input } from '@angular/core';
import { Dish } from  '../shared/dish'
import { DishService } from '../services/dish.service';

import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-dish-detail',
  templateUrl: './dish-detail.component.html',
  styleUrls: ['./dish-detail.component.scss']
})
export class DishDetailComponent implements OnInit {

  dish: Dish;

  constructor(private dishservice: DishService,
    private route: ActivatedRoute,
    private location: Location) { }

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    
    this.dishservice.getDish(id)
      .subscribe(dish => this.dish = dish);
    
    // this.dish = this.dishservice.getDish(id);
  }

  goBack(): void {
    this.location.back();
  }

}