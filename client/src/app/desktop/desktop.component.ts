import { Component, OnInit, ViewChild } from '@angular/core'

import { WeatherObject } from './utils/classes/weather'
import { OrderedItem } from './utils/classes/order'

@Component({
  selector: 'app-desktop',
  templateUrl: './desktop.component.html',
  styleUrls: ['./desktop.component.css']
})
export class DesktopComponent implements OnInit {
  private loading: boolean = true
  public isToggled: boolean = true
  public weatherObject = new WeatherObject(null, null, null, null)
  public openedchat: boolean = false
  private orderBasket = []
  private orderTotal: number = 0
  public itemMentioned: string
  @ViewChild('sidenav') sidenav: any
  // @ViewChild('menuPopover') public menuPopover:PopoverDirective

  ngOnInit() {
  }

  onToggled() {
    this.isToggled = (this.isToggled ? false : true)
  }

  chatToggle(){
    this.openedchat = true
    this.sidenav.toggle()
  }

  addToOrder(newItem: OrderedItem){
    console.log(newItem)
    this.orderBasket.push(newItem)
    this.orderBasket = this.orderBasket.slice()
    // this.orderTotal = this.orderTotal + newItem.cost
  }

  menuEvent(event){
    console.log('menu highlight')
    this.itemMentioned = event
    setTimeout(() => {
        this.itemMentioned = ''
      }, 5000)
  }

  setWeather(event){
    console.log('in set weather')
    console.log(event)
    this.weatherObject = event
  }

}
