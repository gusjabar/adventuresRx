import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import * as Rx from 'rxjs/Rx';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';


@Component({
    selector: 'search-form',
    template: `
    <form (submit)='search()' [formGroup]='form'>
        <fieldset>
            <label class='control-label' for='searchText' >Search artist</label>
            <input 
                type='text' 
                id='searchText' 
                class='form-control'
                placeholder='Entry the artist name to search...' 
                formControlName='searchText'/>
        </fieldset>
        <button type='submit' class='btn btn-primary hidden'>Search</button>
    </form>
    `

})
export class ExercisesComponent implements OnInit {
    form: FormGroup;
    constructor(private fb: FormBuilder) {
        this.form = fb.group({
            searchText: []
        });
        var search = this.form.get('searchText');

        search.valueChanges
            .debounceTime(400)
            .map(str => (<string>str).replace(' ', '-'))
            .subscribe(x => console.log(x))

            ;
    }
    ngOnInit() {
        var startDates = [];
        var startDate = new Date();
        //Create an array of the travel start dates
        //with the 2-day window

        for (var day = 1; day <= 5; day++) {
            var date = new Date(
                startDate.getFullYear(),
                startDate.getMonth(),
                startDate.getDate() + day
            );
            startDates.push(date);
        }
        //convert this startDates[] array to Observable.
        var observable = Rx.Observable
            .from(startDates)
            .map(date => {
                console.log('Getting deals for date ' + date);
                return [1, 2, 3]
            })
            .subscribe(x => console.log(x));


    }
}