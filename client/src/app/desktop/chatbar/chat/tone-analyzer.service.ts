import { Injectable } from '@angular/core'
import { Http } from '@angular/http'
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/map'

import { LoopbackLoginService } from '../../../auth/loopback/lb-login.service'

@Injectable()
export class ToneAnalyzerService {
  private toneUrl: string
  private access_token: string

  constructor(private http: Http, private auth: LoopbackLoginService) {
    this.access_token = auth.get().token
    this.toneUrl = '/api/ToneAnalyzer/getTone'
  }

  getAnalysis(utterances): Observable<any> {
    console.log(utterances)
    const body: any = {
      utterances: {
        utterances
      }
    }
    return this.auth.makeAuthenticatedHttpPost(this.toneUrl, body)
  }

}
