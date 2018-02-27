import { Injectable } from '@angular/core'
import { Http } from '@angular/http'
import 'rxjs/Rx'
import { LoopbackLoginService } from '../../../auth/loopback/lb-login.service'

@Injectable()
export class WeatherService {
  private weatherFXurl: string
  private weatherUrl: string

  constructor(
    private http: Http,
    private auth: LoopbackLoginService,
  ) {
    this.weatherFXurl = '/api/weatherFx/getWeatherFX'
    this.weatherUrl = '/api/weather/getCurrent'
  }

  //initial news query, for use on query-bar
    getFX(zip){
      const url = this.weatherFXurl
      const payload = {
        zip: zip
      }
      console.log('weather service reporting - getFX()')
      return this.auth.makeAuthenticatedHttpJsonPost(url, payload)
    }

    getCurrent(zip){
      const url = this.weatherUrl
      const payload = {
        zip: zip
      }
      console.log('weather service reporting - getCurrent()')
      return this.auth.makeAuthenticatedHttpJsonPost(url, payload)
    }
}
