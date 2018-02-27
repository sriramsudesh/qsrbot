import { Component, OnInit, EventEmitter, Output, AfterViewInit } from '@angular/core'

@Component({
  selector: 'wsl-chat-input',
  templateUrl: './chat-input.component.html',
  styleUrls: ['./chat-input.component.css']
})
export class ChatInputComponent implements OnInit, AfterViewInit {
  public text: string = ''
  @Output() sendMessage = new EventEmitter<string>()
  @Output() textPresent = new EventEmitter<boolean>()

  constructor() { }

  ngOnInit() {
  }

  emitKeyPress(e) {
    if (e.code === 'Enter' || e.code === 'enter') {
      this.emitSendMessage()
    }
  }

  emitSendMessage() {
    this.sendMessage.emit(this.text)
    this.text = ''
    document.getElementById('chat-input').focus()
  }

  emitTextPresent() {
    this.textPresent.emit(true)
  }

  ngAfterViewInit() {
    document.getElementById('chat-input').focus()
  }

}
