import { Component, OnInit, Input, OnChanges } from '@angular/core'
@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.css']
})
export class LocationsComponent implements OnInit, OnChanges {
  @Input() weather: any = null
  public zipSet: boolean = false
  public delivery: boolean = false
  public dineIn: boolean = false
  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(){
    if (this.weather.zip){
      this.zipSet = true
      const weatherFx = this.weather.weatherFx
      this.delivery = weatherFx.orderTriggers.delivery
      this.dineIn = weatherFx.orderTriggers.dineIn
      setTimeout(() => {
        this.delivery = false
        this.dineIn = false
      }, 8000)
    }
  }

}
