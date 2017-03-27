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
  public correctAnswerIdx: number;
  public myForm: FormGroup; // our form model
  constructor(
    public route: ActivatedRoute,
    private _fb: FormBuilder
  ) {}

    public ngOnInit() {
    this.correctAnswerIdx = 0;
    this.myForm = this._fb.group({
            question: ['', [Validators.required, Validators.minLength(5)]],
            correctAnswer: ['', [Validators.required]],
            answers: this._fb.array([
                this.initAnswer(),
                this.initAnswer(),
            ])
        });

    }
    public initAnswer() {
        // initialize our address
        return this._fb.group({
            answer: ['', Validators.required]
        }); 
    }
    public addAnswer() {
      const control = <FormArray>this.myForm.controls['answers'];
      control.push(this.initAnswer());
    }
    public removeAnswer(i: number) {
      const control = <FormArray>this.myForm.controls['answers'];
      control.removeAt(i);
    }
    public setCorrectAnswer(i) {
      this.correctAnswerIdx = i;

    }
    public save(model: Customer) {
        // call API to save customer
        console.log(model);
    }
}
