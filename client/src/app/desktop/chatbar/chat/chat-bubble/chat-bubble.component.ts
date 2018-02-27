import {
  Component,
  OnInit,
  Input,
  Output,
  trigger,
  state,
  style,
  transition,
  animate,
  keyframes,
  EventEmitter } from '@angular/core'

import { FormGroup, FormBuilder, Validators } from '@angular/forms'

import { ChatMessage } from '../../../utils/classes/message'

@Component({
  selector: 'wsl-chat-bubble',
  templateUrl: './chat-bubble.component.html',
  styleUrls: ['./chat-bubble.component.css'],
  animations: [
    trigger('flyIn', [
      state('watson', style({transform: 'translateX(0)'})),
      transition('void => watson', [
        animate(500, keyframes([
          style({opacity: 0, transform: 'translateX(-100%)', offset: 0}),
          style({opacity: 1, transform: 'translateX(15px)',  offset: 0.3}),
          style({opacity: 1, transform: 'translateX(0)',     offset: 1.0})
        ]))
      ]),
      state('human', style({transform: 'translateX(0)'})),
      transition('void => human', [
        animate(500, keyframes([
          style({opacity: 0, transform: 'translateX(100%)', offset: 0}),
          style({opacity: 1, transform: 'translateX(-15px)',  offset: 0.3}),
          style({opacity: 1, transform: 'translateX(0)',     offset: 1.0})
        ]))
      ])
    ]),
  ]
})
export class ChatBubbleComponent implements OnInit {
  @Input() message: ChatMessage
  public zipForm: FormGroup
  public zipSet: boolean = false
  public zipError: boolean = false
  // public content: string = "Looks like you were "+ this.message.emotion + " here!"
  @Output() zip = new EventEmitter<string>()

  constructor(private _fb: FormBuilder) {
    this.zipForm = this._fb.group({
     zip: [null,
       Validators.required
     ]
    })
  }

  ngOnInit() {
  }

  setZip(){
    console.log(this.zipForm.value.zip)
    if (this.zipForm.value.zip.length == 5){
      this.zipError = false
      this.zip.emit(this.zipForm.value.zip)
      this.zipSet = true
      console.log('set zip in bubble')
    } else {
      this.zipError = true
    }

  }
}
