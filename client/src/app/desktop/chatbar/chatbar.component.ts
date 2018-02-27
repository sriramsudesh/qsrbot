import {
  Component,
  Output,
  OnInit,
  ViewChild,
  EventEmitter } from '@angular/core'
import { OrderedItem } from '../utils/classes/order'
import { WeatherObject } from '../utils/classes/weather'
import { PopoverDirective } from 'ngx-bootstrap/popover'

@Component({
  selector: 'app-chatbar',
  templateUrl: './chatbar.component.html',
  styleUrls: ['./chatbar.component.css']
})
export class ChatbarComponent implements OnInit {
  @Output() onToggled = new EventEmitter()
  @Output() orderType = new EventEmitter()
  @Output() itemOrdered = new EventEmitter<OrderedItem>()
  @Output() highlighter = new EventEmitter()
  @Output() sendWeather = new EventEmitter<WeatherObject>()
  @ViewChild('startPopover') public startPopover: PopoverDirective

  public isToggled: boolean = true

  constructor() { }

  ngOnInit(){
    setTimeout(() => {
      this.startPopover.show()
    }, 1000)
    setTimeout(() => {
      this.startPopover.hide()
    }, 5000)

  }

  toggleSidebar() {
    this.isToggled = (this.isToggled ? false : true)
    this.startPopover.hide()
    this.onToggled.emit()
  }

  addToOrder(item: OrderedItem){
    this.itemOrdered.emit(item)
  }

  setOrderType(event){
    this.orderType.emit(event)
  }

  highlight(event){
    console.log('in chat bar')
    this.highlighter.emit(event)
  }

  weatherSender(event: WeatherObject){
    this.sendWeather.emit(event)
  }
}
