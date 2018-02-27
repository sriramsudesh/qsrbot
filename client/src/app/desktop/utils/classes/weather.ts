export class WeatherObject {
  constructor(
    public zip: string,
    public weatherCurrent: object,
    public weatherFx: object,
    public weatherIcon: string
  ) {
    // Lett blank
  }
}
