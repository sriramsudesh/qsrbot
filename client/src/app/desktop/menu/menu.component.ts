import { Component, OnInit, OnChanges, Input } from '@angular/core'

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit, OnChanges {
  @Input() item: string
  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(){
    console.log(this.item)
  }
}
