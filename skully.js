import {
    incrementCustomProperty,
    setCustomProperty,
    getCustomProperty,
  } from "./updateCustomProperty.js"
  
  const skullyElem = document.querySelector("[data-skully]")
  const JUMP_SPEED = 0.45
  const GRAVITY = 0.0011
  const SKULLY_FRAME_COUNT = 2
  const FRAME_TIME = 100
  
  let isJumping
  let skullyFrame
  let currentFrameTime
  let yVelocity
  export function setupSkully() {
    isJumping = false
    skullyFrame = 0
    currentFrameTime = 0
    yVelocity = 0
    setCustomProperty(skullyElem, "--bottom", 0)
    document.removeEventListener("keydown", onJump)
    document.addEventListener("keydown", onJump)
  }
  
  export function updateSkully(delta, speedScale) {
    handleRun(delta, speedScale)
    handleJump(delta)
  }
  
  export function getSkullyRect() {
    return skullyElem.getBoundingClientRect()
  }
  
  export function setSkullyLose() {
    skullyElem.src = "imgs/skully-lose.png"
  }
  
  function handleRun(delta, speedScale) {
    if (isJumping) {
      skullyElem.src = `imgs/skully.png`
      return
    }
  
    if (currentFrameTime >= FRAME_TIME) {
      skullyFrame = (skullyFrame + 1) % SKULLY_FRAME_COUNT
      skullyElem.src = `imgs/skully-${skullyFrame}.png`
      currentFrameTime -= FRAME_TIME
    }
    currentFrameTime += delta * speedScale
  }
  
  function handleJump(delta) {
    if (!isJumping) return
  
    incrementCustomProperty(skullyElem, "--bottom", yVelocity * delta)
  
    if (getCustomProperty(skullyElem, "--bottom") <= 0) {
      setCustomProperty(skullyElem, "--bottom", 0)
      isJumping = false
    }
  
    yVelocity -= GRAVITY * delta
  }
  
  function onJump(e) {
    if (e.code !== "Space" || isJumping) return
  
    yVelocity = JUMP_SPEED
    isJumping = true
  }
  