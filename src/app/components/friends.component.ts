import { AfterViewInit, Component, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Friend } from '../models';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit, OnChanges, AfterViewInit{

  form!:FormGroup

  @Input()
  friend!:Friend

  @Input()
  onUnFriend!:any

  @Output()
  onFriend = new Subject<Friend>

  @Input() // this is needed when using property binding method as parent cant change this directly
  readOnly = false

  constructor(private fb:FormBuilder){}
  
  ngOnInit(): void {
    this.form = this.createForm(this.friend) // if pass in undefined argument,'friend' will be default to null
    console.info('friend: ',this.friend)
  }

  ngAfterViewInit(): void {
    this.onUnFriend.subscribe(
      () => { this.clear() }
      )
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('>>> changes:', changes)
    const fr = changes['friend']?.currentValue as Friend  // fr is undefined if clear button is clicked because only [readOnly] value change, no change in [friend]
    this.form = this.createForm(fr) // if fr is undefiend, createForm() args default is still null

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
    this.readOnly = false // this line not needed when using property binding method as it will be updated by "updateMode"
    this.form = this.createForm()
  }

  // *** using function, call value()
  // value():Friend{
  //   return this.form.value as Friend
  // }

  //// ======== using view child with getter & setter ========

  // // *** using getter, call as a property .value w/o ()
  // get value():Friend{
  //   return this.form.value as Friend
  // }

  // // *** setter, not applicable for change detection
  // set value(f:Friend){
  //   this.readOnly = true
  //   this.form = this.createForm(f)
  // }
  
  ////==========================================================

  
}
