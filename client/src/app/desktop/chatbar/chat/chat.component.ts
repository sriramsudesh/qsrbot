import { Component, OnInit, Inject, OnChanges, EventEmitter, Output, Input } from '@angular/core'
import { DOCUMENT } from '@angular/platform-browser'

import { WatsonConversationService } from './watson-conversation.service'
import { WeatherService } from './weather.service'
import { ToneAnalyzerService } from './tone-analyzer.service'
import { PageScrollInstance, PageScrollService, EasingLogic } from 'ng2-page-scroll'

import { ChatMessage } from '../../utils/classes/message'
import { Utterance } from '../../utils/classes/utterance'
import { WeatherObject } from '../../utils/classes/weather'
import { OrderedItem } from '../../utils/classes/order'
import { ProfileObject } from '../../utils/classes/profile'
import { Emotions } from '../../utils/classes/emotions'
console.log('hi')

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnChanges {
  @Output() openchat: EventEmitter<boolean> = new EventEmitter<boolean>()
  @Output() orderType: EventEmitter<string> = new EventEmitter<string>()
  @Output() itemHighlighter: EventEmitter<string> = new EventEmitter<string>()
  @Output() weather: EventEmitter<WeatherObject> = new EventEmitter<WeatherObject>()
  @Output() orderedItem: EventEmitter<OrderedItem> = new EventEmitter<OrderedItem>()
  @Input() opened: EventEmitter<boolean>

  public weatherData = new WeatherObject(null, null, null, null)
  public profile = new ProfileObject(null, null, null, null)
  public text: string = ''
  public scrollCount: number = 0
  public convoArray: ChatMessage[] = []
  public utteranceArray: Utterance[] = []
  public emotionsArray: Emotions[] = []
  public angryCount: number = 0
  public sadCount: number = 0
  public isUnhappy: boolean = false
  public isSad: boolean = false
  public chatIndex: number = 0
  public itemIndex: number = 0
  public pending: boolean = false
  public allowInput: boolean = false
  public hi: boolean = false

  public ordering: boolean = false
  private context = {
    weatherData: this.weatherData,
    profile: this.profile,
    emotions: this.emotionsArray,
    isUnhappy: false,
    order: {},
    ordering: ""
  }

  constructor(@Inject(DOCUMENT) private document: any,
              private pageScrollService: PageScrollService,
              private convoService: WatsonConversationService,
              private ToneAnalyzer: ToneAnalyzerService,
              private weatherService: WeatherService)
  { }

  ngOnInit() {

  }

  ngOnChanges(){
  //If the side nav was opened, look to see if we have a zip code and at least two chat bubbles
    if (this.opened){
    //If we don't have anything in the convoArray, this is the first time the bar was opened. let's begin the process
      if (this.convoArray.length == 0){
        setTimeout(() => {
          console.log('Initial response, pre-zipcode')
          this.convoArray.push(new ChatMessage('Hey there! Enter your zip code for personalized service', 'watson', null, null, null, this.chatIndex++, 'prompt'))
        }, 350)
      }
    }
  }

//Function called upon receiving event from chat bubble, signalling the user entered a zip code in prompt
  zipReceived(zip: string): void {
    console.log(zip)
    this.weatherData.zip = zip
    this.profile.zip = zip
  //Call WeatherFX with received zipcode
    this.weatherService.getFX(zip).subscribe(response => {
      this.weatherData.weatherFx = response
    //Then call Weather with received zipcode
      this.weatherService.getCurrent(zip).subscribe(response => {
        this.weatherData.weatherCurrent = response
        this.weatherData.weatherIcon = 'assets/img/weather/weathericons/icon' + response.observation.wx_icon + '.png'
        this.weather.emit(this.weatherData)
      //Then when we have the Weather response, send a blank message to conversation with the context enriched with WeatherFX and Weather
        this.convoService.sendMessage('', this.context).subscribe(response => {
        //Give one precanned response acknowledging the entering of zip
          this.convoArray.push(new ChatMessage('Awesome thanks! 😊', 'watson', null, null, null, this.chatIndex++, 'conversation'))
          //Now for each item output from conversation, add to convoArray
          response[0].output.text.forEach((line) => {
            this.convoArray.push(new ChatMessage(line, 'watson', null, null, null, this.chatIndex++, 'conversation'))
          })
          //Update context with new
          this.context = response[0].context
          //Toggle the input bar now that we are talking to Watson Conversation
          this.allowInput = true
          setTimeout(() => {
            this.scrollToBottomOfChat()
          }, 400)
        }, error => console.log(error))
      })
    })
    console.log(this.context)
  }

//Function called upon receiving event from input, signalling a user interaction
  postPending(): void {
    //If this is the first time we had this event triggered, this.pending would be false
    if (this.pending == false){
      //So let's make it true
      this.pending = true
      //And push a placeholder (...) to the conversation array.  This will be deleted on submission
      this.convoArray.push(new ChatMessage('...', 'human', null, null, null, this.chatIndex++, 'conversation'))
      setTimeout(() => {
        this.scrollToBottomOfChat()
      }, 100)
    }
  }
// Function called upon receiving event from input, signalling a user submission
  postMessage(text: string): void  {
    // remove pending flag, pop the (...) human placeholder text, and add the human text to the conversation
    this.pending = false
    //remove the human pending (...)
    this.convoArray.pop()
    //add the input to the chat array
    this.convoArray.push(new ChatMessage(text, 'human', null, null, null, this.chatIndex++, 'conversation'))
    //add the input to the utterance array for ToneAnalyzer
    this.utteranceArray.push(new Utterance(text, 'customer'))
    //add a placeholder while getting responses back to wait for tone and conversation to come back
    this.convoArray.push(new ChatMessage('...', 'watson', null, null, null, this.chatIndex++, 'conversation'))
    setTimeout(() => {
      this.scrollToBottomOfChat()
      // this.scrollToInput()
    }, 100)
    //if we have enough items in the conversation to indicate that the user has spoken at least once, get Tone analysis
    if (this.convoArray.length > 2){
      this.ToneAnalyzer.getAnalysis(this.utteranceArray).subscribe(response => {
      // this helps account for the weird tone bug that comes up sometimes (sometimes 500's through no fault of this app)
        if (response == false){
          console.log('Tone 500-ed')
          //still send to conversation, but bypass addition of emotion to the bubble
          this.convoService.sendMessage(text, this.context).subscribe(response => {
            //remove the watson pending (...)
            this.convoArray.pop()
            //add new context
            this.context = response[0].context
            //Now for each item output from conversation, add to convoArray
            response[0].output.text.forEach((line) => {
              this.convoArray.push(new ChatMessage(line, 'watson', null, null, null, this.chatIndex++, 'conversation'))
            })
            //after a delay, refocus the chat window
            setTimeout(() => {
              this.scrollToBottomOfChat()
            }, 200)
          }, error => console.log(error))
        } else {
      // if tone worked, then continue
          const emotions = response
          this.emotionsArray = response
          // find the item in the conversation array that we just got the tone for, and update the tone attributes for that item
          this.convoArray[this.convoArray.length - 2].emotion = response.lastPredom
          this.convoArray[this.convoArray.length - 2].emoConfidence = response.lastPredomConf
          // if tone found above 65% confidence, call it a strong emotion
          if (response.lastPredomConf > 0.67 && !this.ordering){
            this.convoArray[this.convoArray.length - 2].emoStrong = true
          }
          //developer chosen thresholds for emotions - can change depending on use case
          if (emotions.lastPredom === 'frustrated' && emotions.lastPredomConf > 0.6875){
            this.angryCount ++
            console.log('angry: ' + this.angryCount)
          } else if (emotions.lastPredom === 'impolite' && emotions.lastPredomConf > 0.6){
            this.angryCount ++
            console.log('angry: ' + this.angryCount)
          } else if (emotions.lastPredom === 'sad' && emotions.lastPredomConf > 0.7 && this.context.ordering == ""){
            this.sadCount ++
            console.log('sad: ' + this.sadCount)
          }

          //if the guy has said two angry things, flag it as unhappy
          if (this.angryCount > 1){
              console.log('this guy appears unhappy ')
              this.isUnhappy = true
          }
          //if the guy has said one sad thing, flag it as sad
          if (this.sadCount > 0 ){
              console.log('this guy appears sad ')
              this.isSad = true
          }
          //append the new emotions analyzed to the context object for next message
          this.context.emotions = emotions

        //If the user has normal emotional levels, proceed to conversation
          if (!this.isUnhappy && !this.isSad){
            this.convoService.sendMessage(text, this.context).subscribe(data => {
              //remove the watson pending (...)
              this.convoArray.pop()
              const response = data[0]
              console.log(response)
              //reset the context with what conversation returns
              this.context = response.context
              //Now for each item output from conversation, add to convoArray
              response.output.text.forEach((line) => {
                this.convoArray.push(new ChatMessage(line, 'watson', null, null, null, this.chatIndex++, 'conversation'))
              })

          //EVENT EMITTERS TO INTEGRATE CONVERSATION TO APP LOGIC
              //Emit event to highlight the item currently being ordered on the menu
              if (response.context.itemOrdering && response.context.orderBuilding){
                this.itemHighlighter.emit(response.context.itemOrdering)
                this.ordering = true
                if (response.context.ordering !==""){
                  this.gotoMenu(response.context.ordering)
                }
              }
              //Emit event for the order type
              if (response.context.orderType){
                this.orderType.emit(response.context.orderType)
              }
              //Emit event when item is ordered
              if (response.output.item_added){
                this.ordering = false
                console.log('item added')
                const order = response.context.order
                console.log(order)
                const newItem = new OrderedItem(this.itemIndex, order.item, order.type, order.size, order.options, 3)
                this.orderedItem.emit(newItem)
                this.itemIndex ++
              }
              //Emit event for order complete UNDER CONSTRUCTION *********
              if (response.output.orderPlaced){
                console.log('order placed')
              }

              //Emit event when map is required
              if (response.output.showMap){
                console.log('showMap')
                this.convoArray.push(new ChatMessage('Our nearest restaurant', 'watson', null, null, null, this.chatIndex++, 'showMap'))
              }

              // //Smooth scroll to item that user has begun to order
              if (response.output.ordering){
                console.log('ordering!')
                if (response.output.ordering == 'location'){
                  this.gotoLocation()
                } else {
                  this.gotoMenu(response.output.ordering)
                }
              }

              //after a brief delay, scroll to the bottom of the chat box
              setTimeout(() => {
                this.scrollToBottomOfChat()
              }, 400)
            }, error => console.log(error))
          }

        //If the user is unhappy/angry with two counts, add the apologetic response with prompt for map
          if (this.isUnhappy){
            console.log('this guy is unhappy')
            this.convoArray.pop()
            this.convoArray.push(new ChatMessage("Hey buddy, looks like you're a bit hot and bothered.  Maybe come check us out at our restaurant and we can help get you what you need.", 'watson', null, null, null, this.chatIndex++, 'showMap'))
            this.isUnhappy = false
            this.angryCount = 0
            setTimeout(() => {
              this.scrollToBottomOfChat()
            }, 400)
          }

        //If the user is sad, add a cat gif
          if (this.isSad){
            console.log('this guy is sad')
            this.convoArray.pop()
            this.convoArray.push(new ChatMessage('Hey cheer up!', 'watson', null, null, null, this.chatIndex++, 'showGif'))
            this.isSad = false
            this.sadCount = 0
            setTimeout(() => {
              this.scrollToBottomOfChat()
            }, 400)
          }
        }
      })
    } else {
    //If this is the first prompt, just send the text and context- do not do anything with tone
      this.convoService.sendMessage(text, this.context).subscribe(response => {
        //remove the watson pending (...)
        console.log('in else')
        this.convoArray.pop()
        console.log(response[0])
        this.context = response[0].context
        response[0].output.text.forEach((line) => {
          this.convoArray.push(new ChatMessage(line, 'watson', null, null, null, this.chatIndex++, 'conversation'))
        })
        //after a delay, refocus the chat window
        setTimeout(() => {
          this.scrollToBottomOfChat()
        }, 200)
      }, error => console.log(error))
    }
  }

  scrollToBottomOfChat() {
    const container = document.getElementById('scrolling-chat-box')
    container.scrollTop = container.scrollHeight
  }

  scrollToInput(){
    const elmnt = document.getElementById('input_box')
    elmnt.scrollIntoView()
  }

  chatToggle(){
    this.openchat.emit(false)
  }

  myEasing: EasingLogic = {
      ease: (t: number, b: number, c: number, d: number): number => {
          if (t === 0) return b
          if (t === d) return b + c
          if ((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b
          return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b
      }
  }

  gotoMenu(ordering) {
    const scrollObject = {
      document: this.document,
      scrollTarget: '#' + ordering,
      pageScrollOffset: 123,
      pageScrollEasingLogic: this.myEasing,
      pageScrollDuration: 300
    }
    const pageScrollInstance: PageScrollInstance = PageScrollInstance.newInstance(scrollObject)

    this.pageScrollService.start(pageScrollInstance)
    console.log('hit')
  }

  gotoLocation() {
    const scrollObject = {
      document: this.document,
      scrollTarget: '#location',
      pageScrollOffset: 192,
      pageScrollEasingLogic: this.myEasing,
      pageScrollDuration: 300
    }
    const pageScrollInstance: PageScrollInstance = PageScrollInstance.newInstance(scrollObject)

    this.pageScrollService.start(pageScrollInstance)
  }

}
