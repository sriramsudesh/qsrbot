export class ChatMessage {
  constructor(
    public message: string,
    public speaker: string,
    public emotion: string,
    public emoConfidence: number,
    public emoStrong: boolean,
    public index: number,
    public type: string
  ) {
    // Lett blank
  }
}
