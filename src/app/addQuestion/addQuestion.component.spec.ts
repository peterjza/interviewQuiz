import { ActivatedRoute, Data } from '@angular/router';
import { Component } from '@angular/core';
import { inject, TestBed } from '@angular/core/testing';

// Load the implementations that should be tested
import { AddQuestionComponent } from './addQuestion.component';

describe('AddQuestion', () => {
  // provide our implementations or mocks to the dependency injector
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      // provide a better mock
      {
        provide: ActivatedRoute,
        useValue: {
          data: {
            subscribe: (fn: (value: Data) => void) => fn({
              yourData: 'yolo'
            })
          }
        }
      },
      AddQuestionComponent
    ]
  }));

  it('should log ngOnInit', inject([AddQuestionComponent], (addQuestion: AddQuestionComponent) => {
    spyOn(console, 'log');
    expect(console.log).not.toHaveBeenCalled();

    addQuestion.ngOnInit();
    expect(console.log).toHaveBeenCalled();
  }));

});
