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
        // this.creatingObservableFromArray();
        // this.otherWaysToCreateObservableFromArray();
        // this.timerObservable();
        //this.parallelObservables();
        //this.handlingErrorsInObservables();
        //this.timeoutObservables();
        this.gettingNotifiedObservableCompletes();
    }

    creatingObservableFromArray(): void {
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
    otherWaysToCreateObservableFromArray() {
        console.log("Empty");
        var observable = Rx.Observable.empty();
        observable.subscribe(x => console.log(x));
        console.log("Range");
        var observable2 = Rx.Observable.range(1, 5);
        observable2.subscribe(x => console.log(x));
        console.log("From");
        var observable3 = Rx.Observable.from([1, 2, 3]);
        observable3.subscribe(x => console.log(x));
        console.log("Of");
        //return an observable with one item: [1,2,3]
        var observable4 = Rx.Observable.of([1, 2, 3]);
        observable4.subscribe(x => console.log(x));
        //return an observable with three items: 1,2,3
        var observable5 = Rx.Observable.of(1, 2, 3);
        observable5.subscribe(x => console.log(x));

    }
    timerObservable() {
        var observable = Rx.Observable.interval(5000);
        observable
            // .map(x => {
            //     console.log("calling the server to get the lastest news");
            //     return {
            //         news: [
            //             {
            //                 title: 'T1',
            //                 content: 'Content1'
            //             },
            //             {
            //                 title: 'T2',
            //                 content: 'Content2'
            //             }, {
            //                 title: 'T3',
            //                 content: 'Content3'
            //             },
            //         ]
            //     }
            // })
            .flatMap(x => {
                console.log("calling the server to get the lastest news");
                var result = {
                    news: [
                        {
                            title: 'T1',
                            content: 'Content1'
                        },
                        {
                            title: 'T2',
                            content: 'Content2'
                        }, {
                            title: 'T3',
                            content: 'Content3'
                        },
                    ]
                }
                return Rx.Observable.of(result.news[1])
            })
            .subscribe(news => console.log(news));
    }
    parallelObservables() {
        var userStream = Rx.Observable.of({
            userId: 1023, userName: 'Gustavo'
        }).delay(2000);

        var tweetsStream = Rx.Observable.of([1, 2, 3]).delay(1500);
        //User forkJoin to run both these observables in parallel.
        Rx.Observable
            .forkJoin(userStream, tweetsStream)
            .subscribe(result => console.log(result));

        //User map operator to map this array into a data structure that our application expects.
        console.log('Mapping')
        Rx.Observable
            .forkJoin(userStream, tweetsStream)
            .map(joined =>
                new Object({ user: joined[0], tweets: joined[1] })
            )
            .subscribe(result => console.log(result));

    }
    handlingErrorsInObservables() {

        // var observable = Rx.Observable.throw(new Error('Something failed.'));
        // observable.subscribe(
        //     x => console.log(x),
        //     error => console.error(error)
        //     );
        var counter = 0;
        //In real-world app. you wouldn't create an observable for an AJAX call like this. Use http
        var ajaxCall = Rx.Observable.of('url')
            .flatMap(() => {
                if (++counter < 2) {
                    return Rx.Observable.throw(new Error('Request failed'));
                }
                return Rx.Observable.of([1, 2, 3]);
            });
        ajaxCall
            .retry(3)
            .subscribe(
            x => console.log(x),
            error => console.error(error)
            );
        //Catching and continuing
        var remoteDataStream = Rx.Observable.throw(new Error('Something failed.'));//shows 1,2,3
        //var remoteDataStream = Rx.Observable.of([4, 5, 6]);//shows 4,5,6.

        remoteDataStream
            .catch(err => {
                var localDataStream = Rx.Observable.of([1, 2, 3]);
                console.log(err);
                return localDataStream;
            })
            .subscribe(x => console.log('Data Stream ', x));

    }
    timeoutObservables() {
        var remoteDataStream = Rx.Observable.of([1, 2, 3]).delay(5000);
        remoteDataStream
            .timeout(1000)
            .subscribe(
            x => console.log(x),
            err => console.error(err)
            );
    }
    gettingNotifiedObservableCompletes(){
        var dataStream = Rx.Observable.from([1,2,3]);

        dataStream.subscribe(
            x=>console.log(x),
            err=>console.log(err),
            ()=>console.log('Completed!')
            );

    }
}