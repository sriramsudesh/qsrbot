import { Injectable } from '@angular/core'
import { Http } from '@angular/http'
import 'rxjs/Rx'
import { Observable } from 'rxjs/Rx'

import { LoopbackLoginService } from '../../../auth/loopback/lb-login.service'

@Injectable()
export class WatsonConversationService {
  private convoUrl: string

  constructor(
    private http: Http,
    private auth: LoopbackLoginService) {
    this.convoUrl = '/api/Conversation/message'
  }

  sendMessage(message: string, context: any): Observable<any> {
    const body: any = {
      input: {
        text: message
      },
      context
    }
    return this.auth.makeAuthenticatedHttpPost(this.convoUrl, body)
  }

}
