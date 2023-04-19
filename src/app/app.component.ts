import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Friend } from './models';
import { FriendsComponent } from './components/friends.component';
import { FriendsListComponent } from './components/friends-list.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {

  @ViewChild(FriendsComponent)
  friendComp!:FriendsComponent

  @ViewChild(FriendsListComponent)
  friendsListComp!:FriendsListComponent
  
  selectedFriend!:Friend

  friends:Friend[] = [
    {name:'barney', email:'barney@gmail.com',phone:'23456'},
    {name:'betty', email:'betty@gmail.com',phone:'13456'}
  ]


  ngOnInit(): void {
    console.info('>>>> OnInit friendComp: ', this.friendComp)
  }
  ngAfterViewInit(): void {
    console.info('>>>> AfterViewInit friendComp: ', this.friendComp)
    this.friendsListComp.onSelectedFriend.subscribe(
      v => this.selection(v)
    )
  }


  process(friend:Friend){

    let idx = this.friends.findIndex(f => f.name == friend.name)

    if(idx==-1)
      this.friends.push(friend)
    else
      this.friends[idx] = friend

  }

  unFriend(){
    let idx = this.friends.findIndex(f => f.name == this.selectedFriend.name)

    if(idx == -1)
      return

    else
      this.friends.splice(idx,1)
      this.friendComp.clear()

  }

  selection(name:string){
    console.info('>>> fr selected: ',name)
    const fr = this.friends.find(f => f.name == name)

    // //@ts-ignore
    // this.selectedFriend = fr

    //@ts-ignore
    this.friendComp.value = fr // assigning fr to friend in friendComp using setter, no through input att binding
  }

}
