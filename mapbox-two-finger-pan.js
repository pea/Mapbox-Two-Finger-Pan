/**
 * Two Finger Mapbox Panning
 * new twoFingerMapboxPan(<mapbox instance>)
 */
const state = {
  mapbox: null,
  panStart: { x: 0, y: 0 }
}

export default (mapbox) => {
  state.mapbox = mapbox
  state.mapbox.getContainer().addEventListener('touchstart', touchStart, false)
  state.mapbox.getContainer().addEventListener('touchmove', touchMove, false)
  if ('ontouchstart' in document.documentElement) state.mapbox.dragPan.disable()
}

function touchStart (event) {
  if (event.touches.length === 2) {
    event.stopImmediatePropagation()
    event.preventDefault()

    let x = 0
    let y = 0

    for (let touch of Array.from(event.touches)) {
      x += touch.screenX
      y += touch.screenY
    }

    state.panStart.x = x / event.touches.length
    state.panStart.y = y / event.touches.length
  }
}

function touchMove (event, callback) {
  if (event.touches.length === 2) {
    event.stopImmediatePropagation()
    event.preventDefault()

    let x = 0
    let y = 0

    for (let touch of Array.from(event.touches)) {
      x += touch.screenX
      y += touch.screenY
    }

    const movex = (x / event.touches.length) - state.panStart.x
    const movey = (y / event.touches.length) - state.panStart.y

    state.panStart.x = x / event.touches.length
    state.panStart.y = y / event.touches.length

    state.mapbox.panBy(
      [
        (movex * 1) / -1,
        (movey * 1) / -1
      ],
      { animate: false }
    )
  }
}
