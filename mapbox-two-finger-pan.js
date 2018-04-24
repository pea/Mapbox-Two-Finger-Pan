/**
 * Two Finger Mapbox Panning
 * new twoFingerMapboxPan(<mapbox instance>)
 */
export class twoFingerMapboxPan {
  constructor (mapbox) {
    this.mapbox = mapbox
    this.panStart = { x: 0, y: 0 }
    this.init()
  }
  init () {
    this.mapbox.getContainer().addEventListener('touchstart', this.touchStart.bind(this), false)
    this.mapbox.getContainer().addEventListener('touchmove', this.touchMove.bind(this), false)
    if ('ontouchstart' in document.documentElement) this.mapbox.dragPan.disable()
  }
  touchStart (event) {
    if (event.touches.length >= 2) {
      event.stopImmediatePropagation()
      event.preventDefault()

      let x = 0
      let y = 0

      for (let touch of Array.from(event.touches)) {
        x += touch.screenX
        y += touch.screenY
      }

      this.panStart.x = x / event.touches.length
      this.panStart.y = y / event.touches.length
    }
  }
  touchMove (event) {
    if (event.touches.length >= 2) {
      event.stopImmediatePropagation()
      event.preventDefault()

      let x = 0
      let y = 0

      for (let touch of Array.from(event.touches)) {
        x += touch.screenX
        y += touch.screenY
      }

      const movex = (x / event.touches.length) - this.panStart.x
      const movey = (y / event.touches.length) - this.panStart.y

      this.panStart.x = x / event.touches.length
      this.panStart.y = y / event.touches.length

      this.mapbox.panBy(
        [
          (movex * 1) / -1,
          (movey * 1) / -1
        ],
        { animate: false }
      )
    }
  }
}
