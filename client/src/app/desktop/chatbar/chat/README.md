# Watson Solutions Lab

## Chat Module

This is a module that provides you the capability to use Watson Conversation in a responsive, mobile-ready chat interface

The module consist of the following components and services.

### Watson Conversation Service
A service that will make the calls to Loopback endpoint created for Conversation and maintain the conversation context in session storage.

### Message class
This created class for a message is used throughout the chat app and provides attributes which provide function for the rest of the components.

### Chat Component
 This component posts messages to Conversation, listens to events that indicate a keystroke in the input field (upon which a ... is inputted), and provides scrolling functions to keep the view at the most recent chat bubble. This also provides a template for the entire chat interface in a Bootstrap container, repeating through a growing list of Chat Bubbles as they are created in the conversation and holding the Chat Input Component as well

### Chat Bubble Component
This component creates a bubble for each utterance and provides conditional CSS depending on the speaker of the message.

### Chat Input Component
This component creates an input field for the user to interact with Watson and emits events for submitting text as well as for the presence of text, upon which the Chat Component will put the (...) for the user's text.

### Usage
You can add the login component selector to any other template by using the following element.
```
<wsl-chat></wsl-chat>
```
But probably a better idea is to use the chat component in a router by importing it into your app-routing.module:
```
import { ChatComponent } from './chat/chat.component';
```


The HomeComponent contains an example of accessing the ChatComponent directly.
