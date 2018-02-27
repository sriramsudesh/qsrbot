import { Component, OnInit, EventEmitter, Output } from '@angular/core'

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit {
  @Output() bannerOpen: EventEmitter<boolean> = new EventEmitter<boolean>()

  constructor() { }

  ngOnInit() {
  }
  chatToggle(){
    this.bannerOpen.emit(false)
  }
}
