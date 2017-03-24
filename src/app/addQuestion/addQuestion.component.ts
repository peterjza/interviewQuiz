import {
  Component,
  OnInit
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Validators, FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { Customer } from './customer.interface';

@Component({
  selector: 'addQuestion',
  templateUrl: './addQuestion.component.html'
})
export class AddQuestionComponent  implements OnInit {

  public localState: any;
  public myForm: FormGroup; // our form model
  constructor(
    public route: ActivatedRoute,
    private _fb: FormBuilder
  ) {}

    public ngOnInit() {
    // we will initialize our form here
    this.myForm = this._fb.group({
            question: ['', [Validators.required, Validators.minLength(5)]],
            answers: this._fb.array([
                this.initAnswer(),
                this.initAnswer(),
            ])
        });
    }
    public initAnswer() {
        // initialize our address
        return this._fb.group({
            street: ['', Validators.required],
            postcode: ['']
        });
    }
    public addAddress() {

      const control = <FormArray>this.myForm.controls['answers'];
      control.push(this.initAnswer());
    }
    public removeAddress(i: number) {
      const control = <FormArray>this.myForm.controls['answers'];
      control.removeAt(i);
    }
    public save(model: Customer) {
        // call API to save customer
        console.log(model);
    }
}
