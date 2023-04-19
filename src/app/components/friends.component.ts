import { Component, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Friend } from '../models';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit, OnChanges{

  form!:FormGroup

  @Input()
  friend!:Friend

  @Output()
  onFriend = new Subject<Friend>

  constructor(private fb:FormBuilder){}

  ngOnInit(): void {
    this.form = this.createForm(this.friend) // can pass in undefined argument ??
    console.info('friend: ',this.friend)
  }

  ngOnChanges(changes: SimpleChanges): void {
    // console.log('>>> changes:', changes)
    const fr = changes['friend'].currentValue as Friend
    this.form = this.createForm(fr)
  }

  // private createForm():FormGroup{
  //   return this.fb.group({
  //     name:this.fb.control('',[Validators.required]),
  //     email:this.fb.control('',[Validators.required,Validators.email]),
  //     phone:this.fb.control('',[Validators.required])
      
  //   })
  // }

  private createForm(friend:Friend | null = null):FormGroup{
    return this.fb.group({
      name:this.fb.control( friend?friend.name:'' , [Validators.required]),
      email:this.fb.control(friend?friend.email:'' ,[Validators.required,Validators.email]),
      phone:this.fb.control(friend?friend.phone:'' ,[Validators.required])
      
    })
  }

  processForm(){
    const fr:Friend = this.form.value
    console.info('>>> fr:',fr)
    this.onFriend.next(fr)
    this.form.reset //  this will not reset the form-array, better recreate the form if it is complex form
  }

  clear(){
    this.form = this.createForm()
  }

  // *** using function, call value()
  // value():Friend{
  //   return this.form.value as Friend
  // }

  // *** using getter, call as a property .value w/o ()
  get value():Friend{
    return this.form.value as Friend
  }

  // *** setter, not applicable for change detection
  set value(f:Friend){
    this.form = this.createForm(f)
  }

  
}
