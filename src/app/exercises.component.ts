import { Component } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs/Rx';
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
export class ExercisesComponent {
    form: FormGroup;
    constructor(private fb: FormBuilder) {
        this.form = fb.group({
            searchText: []
        });
       var search= this.form.get('searchText');

            search.valueChanges
            .debounceTime(400)
            .map(str => (<string>str).replace(' ', '-'))
            .subscribe(x => console.log(x))
            
            ;
    }
}