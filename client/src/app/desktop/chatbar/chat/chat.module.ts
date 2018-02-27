import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { HttpModule } from '@angular/http'
import { AuthModule } from '../../../auth/auth.module'
import { MdProgressBarModule } from '@angular/material'
import { TooltipModule } from 'ngx-bootstrap'

import { ToneAnalyzerService } from './tone-analyzer.service'
import { WatsonConversationService } from './watson-conversation.service'
import { WeatherService } from './weather.service'

import { ChatComponent } from './chat.component'
import { ChatInputComponent } from './chat-input/chat-input.component'
import { ChatBubbleComponent } from './chat-bubble/chat-bubble.component'

@NgModule({
  declarations: [
    ChatComponent,
    ChatInputComponent,
    ChatBubbleComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MdProgressBarModule,
    AuthModule,
    HttpModule,
    TooltipModule.forRoot()
  ],
  providers: [
    WatsonConversationService,
    WeatherService,
    ToneAnalyzerService
  ],
  exports: [ChatComponent]
})
export class ChatModule { }
