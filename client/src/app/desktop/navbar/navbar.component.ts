import { Component, OnInit, Input, Output, EventEmitter, ViewChild, OnChanges  } from '@angular/core'
import { ModalDirective } from 'ngx-bootstrap/modal'
import { PopoverDirective } from 'ngx-bootstrap/popover'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnChanges {
  @Input() currentOrder: any
  @Input() orderType: string = 'none'
  @Output() bannerOpen: EventEmitter<boolean> = new EventEmitter<boolean>()
  @ViewChild('orderModal') public orderModal: ModalDirective
  @ViewChild('orderPopover') public orderPopover: PopoverDirective

  public orderTotal: number = 0
  public alert: boolean = false
  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(){
    console.log('on changes')
    console.log(this.currentOrder)
    console.log(this.orderType)
    if (this.currentOrder.length == 1){
      this.alert = true
      setTimeout(() => {
          this.alert = false
        }, 800)
      setTimeout(() => {
          this.orderPopover.show()
        }, 1500)
      setTimeout(() => {
          this.orderPopover.hide()
        }, 5000)
      const length = this.currentOrder.length
      this.orderTotal = this.currentOrder[length - 1].cost + this.orderTotal
    } else if (this.currentOrder.length > 0){
      this.alert = true
      setTimeout(() => {
          this.alert = false
        }, 800)
      const length = this.currentOrder.length
      this.orderTotal = this.currentOrder[length - 1].cost + this.orderTotal
    }
  }

  openChat(){
    this.bannerOpen.emit(true)
  }

  hideOrderModal(): void {
    this.orderModal.hide()
  }

  openOrderModal(): void{
    this.orderModal.show()
  }

}
