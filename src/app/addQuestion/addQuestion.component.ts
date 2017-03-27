import {
  Component,
  OnInit
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Validators, FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { Customer } from './customer.interface';

@Component({
  selector: 'addQuestion',
  templateUrl: './addQuestion.component.html',
  styleUrls:  ['./addQuestion.component.css']
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
    this.myForm = this._fb.group({
            question: ['', [Validators.required, Validators.minLength(5)]],
            correctAnswer: ['', [Validators.required]],
            answers: this._fb.array([
                this.initAnswer(),
                this.initAnswer(),
            ])
        });

        var that = this;
        setTimeout(function(){
          that.setCorrectAnswer(0);
        }, 100)

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
      if($('.answerRow').eq(i).hasClass){
        this.setCorrectAnswer(0);
      }
    }

    public setCorrectAnswer(i) {
      $('.active').removeClass('active');
      $('.answerRow').eq(i).addClass('active');
      this.correctAnswerIdx = i;
      
    }
    public save(model: Customer) {
        // call API to save customer
        console.log(model);
    }
}
