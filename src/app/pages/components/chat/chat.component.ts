import { Component, ViewChild, ElementRef } from '@angular/core';
import { TreeModel } from 'ng2-tree';
import { ActivatedRoute, Params, Router, Data } from '@angular/router';
import { ChatService } from './chat.service';
import * as io from "socket.io-client";
import * as decode from 'jwt-decode';

@Component({
  selector: 'ngx-tree',
  styleUrls: ['./chat.component.scss'],
  templateUrl: './chat.component.html',
})
export class TreeComponent {

  @ViewChild('scrollMe') private myScrollContainer: ElementRef;

  chats: any;
  joinned: boolean = false;
  userName: string;
  email: string;
  newUser = { nickname: '', room: '', email: '' };
  msgData = { room: '', nickname: '', email: '', message: '' };
  socket = io('http://localhost:1996');

  constructor(private chatService: ChatService, private router: Router) { }

  ngOnInit() {
    const token = localStorage.getItem('infoToken');
    const tokenPayload = decode(token);
    this.userName = tokenPayload.firstname;
    this.email = tokenPayload.email;

    this.newUser.email = this.email;
    this.newUser.nickname = this.userName;

    var user = JSON.parse(localStorage.getItem("user"));
    if (user !== null) {
      this.getChatByRoom(this.newUser.email);
      this.msgData = { room: user.room, nickname: user.nickname, email: this.email, message: '' }
      this.joinned = true;
      this.scrollToBottom();
    }
    this.socket.on('new-message', function (data) {
      if (this.joinned != false) {
        if (data.message.room === JSON.parse(localStorage.getItem("user")).room) {
          this.chats.push(data.message);
          this.msgData = { room: user.room, nickname: user.nickname, email: this.email, message: '' }
          this.scrollToBottom();
        }
      }
    }.bind(this));
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch (err) { }
  }

  getChatByRoom(email) {
    this.chatService.getChatByRoom(email).then((res) => {
      this.chats = res;
    }, (err) => {
      console.log(err);
    });
  }

  joinRoom() {
    var date = new Date();
    localStorage.setItem("user", JSON.stringify(this.newUser));
    this.getChatByRoom(this.newUser.email);
    this.msgData = { room: this.newUser.room, nickname: this.newUser.nickname, email: this.email, message: '' };
    this.joinned = true;
    this.socket.emit('save-message', { room: this.newUser.room, nickname: this.newUser.nickname, email: this.email, message: 'Join this room', updated_at: date });
  }

  sendMessage() {
    this.chatService.saveChat(this.msgData).then((result) => {
      this.socket.emit('save-message', result);
    }, (err) => {
      console.log(err);
    });
  }

  logout() {
    var date = new Date();
    var user = JSON.parse(localStorage.getItem("user"));
    this.socket.emit('save-message', { room: user.room, nickname: user.nickname, email: this.email, message: 'Left this room', updated_at: date });
    localStorage.removeItem("user");
    this.joinned = false;
  }

}