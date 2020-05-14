import { Component, OnInit, Input, ViewChild, Inject } from '@angular/core';
import { Dish } from  '../shared/dish'
import { DishService } from '../services/dish.service';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { switchMap } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Comment } from '../shared/comment'
import { DISHES } from '../shared/dishes'
import { MatFormField } from '@angular/material'
import { visibility, expand } from '../animations/app.animation';


@Component({
  selector: 'app-dish-detail',
  templateUrl: './dish-detail.component.html',
  styleUrls: ['./dish-detail.component.scss'],
  animations: [
    visibility(),
    expand()
  ]
})
export class DishDetailComponent implements OnInit {

  @ViewChild('fform') commentFormDirective;
  commentForm: FormGroup;
  dishcopy: Dish;
  comment: Comment;

  formErrors = {
      'rating': '',
      'comment': '',
      'author': '',
      'date': ''
  };

  validationMessages = {
    'rating': {
      'required':      'Rating is required.',
    },
    'author': {
      'required':      'Name is required.',
      'minlength':     'Name must be at least 2 characters long.',
    },
    'comment': {
      'required':      'Comment is required.',
    },
    'date': {
      'required':      'Date is required.',
    },
  };

  dish: Dish;
  errMess: string;
  dishIds: string[];
  prev: string;
  next: string;
  visibility = 'shown';

  constructor(private dishservice: DishService,
    private route: ActivatedRoute,
    private location: Location,
    private fb: FormBuilder,
    @Inject('BaseURL') private BaseURL) {
      this.createForm();
     }

  ngOnInit() {
    this.dishservice.getDishIds().subscribe(dishIds => this.dishIds = dishIds);
    this.route.params.pipe(switchMap((params: Params) => { this.visibility = 'hidden'; return this.dishservice.getDish(+params['id']); }))
    .subscribe(dish => { this.dish = dish; this.dishcopy = dish; this.setPrevNext(dish.id); this.visibility = 'shown'; },
      errmess => this.errMess = <any>errmess);
    // this.dish = this.dishservice.getDish(id);
  }

  goBack(): void {
    this.location.back();
  }

  setPrevNext(dishId: string) {
    const index = this.dishIds.indexOf(dishId);
    this.prev = this.dishIds[(this.dishIds.length + index - 1) % this.dishIds.length];
    this.next = this.dishIds[(this.dishIds.length + index + 1) % this.dishIds.length];
  }

  createForm() {
    this.commentForm = this.fb.group({
      rating: ['', [Validators.required]], 
      comment:  ['', [Validators.required]],
      author: ['', [Validators.required, Validators.minLength(2)] ],
      date: ['',]
    });

    this.commentForm.valueChanges
      .subscribe(data => this.onValueChanged(data));

    this.onValueChanged();
  }

  onSubmit() {
    this.comment = this.commentForm.value;
    console.log(this.comment);
    this.commentForm.reset({
      rating: '',
      comment: '',
      author: '',
      date: ''
    })
    var d = new Date();
    var n = d.toISOString();
    console.log(n)
    this.comment.date = n
    const id = this.route.snapshot.params.id
    console.log(id)
    DISHES[id].comments.push(this.comment)
    this.dishcopy.comments.push(this.comment);
    this.dishservice.putDish(this.dishcopy)
      .subscribe(dish => {
        this.dish = dish; this.dishcopy = dish;
      },
      errmess => { this.dish = null; this.dishcopy = null; this.errMess = <any>errmess; });
    this.commentFormDirective.resetForm();
  }

  onValueChanged(data?: any) {
    if (!this.commentForm) { return; }
    const form = this.commentForm;
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        // clear previous error message (if any)
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }
}
  

