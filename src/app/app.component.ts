import { AfterViewInit, Component, OnInit, Output, ViewChild } from '@angular/core';
import { Friend } from './models';
import { FriendsComponent } from './components/friends.component';
import { FriendsListComponent } from './components/friends-list.component';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {

  // @ViewChild(FriendsComponent)
  // friendComp!:FriendsComponent

  // @ViewChild(FriendsListComponent)
  // friendsListComp!:FriendsListComponent
   
  selectedFriend!:Friend  // using binding

  @Output()
  unfriendEvent = new Subject<boolean>

  updateMode = false

  friends:Friend[] = [
    {name:'barney', email:'barney@gmail.com',phone:'23456'},
    {name:'betty', email:'betty@gmail.com',phone:'13456'}
  ]


  ngOnInit(): void {
    // console.info('>>>> OnInit friendComp: ', this.friendComp) // using view child
  }
  
  ngAfterViewInit(): void {
    //// using view child
    // console.info('>>>> AfterViewInit friendComp: ', this.friendComp)
    // this.friendsListComp.onSelectedFriend.subscribe(
    //   v => this.selection(v)
    // )
  }


  process(friend:Friend){

    let idx = this.friends.findIndex(f => f.name == friend.name)

    if(idx==-1)
      this.friends.push(friend)
    else
      this.friends[idx] = friend

  }

  unFriend(){
    let idx = this.friends.findIndex(f => f.name == this.selectedFriend.name) // using binding
    // let idx = this.friends.findIndex(f => f.name == this.friendComp.value.name) // using viewchild


    console.info('>> index: ',idx)
    if(idx == -1)
      return

    else
      this.friends.splice(idx,1)
      this.unfriendEvent.next(true) // using binding
      // this.friendComp.clear() // using view child

  }

  selection(name:string){
    console.info('>>> fr selected: ',name)
    const fr = this.friends.find(f => f.name == name)

    // ======== using property binding with change detection ========
    //@ts-ignore
    this.selectedFriend = fr
    this.updateMode = true
    // ===============================================================

    // // ======== using view child ========
    // //@ts-ignore
    // this.friendComp.value = fr // assigning fr to friend in friendComp using setter, not through [friend]="selectedFriend" input att binding
    // this.updateMode = true
    // this.friendComp.readOnly = true
    // // ==================================
  }

  clear() {
    // this.friendComp.clear() // using view child
    this.updateMode = false
  }

}
