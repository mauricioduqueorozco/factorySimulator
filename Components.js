let COMPONENT_TYPE = {
  CIRCLE : 1,
  SPRITE : 2,
  LABEL : 3,
}

function Component() {
  this.active = true
  this.type = 0
  this.name = null
}

Component.prototype.setActive = function(active){
  this.active = active
}

Component.prototype.isActive = function(){
  return this.active
}

Component.prototype.setInitialPosition = function(){
  this.position = {
    x: this.posInitial.x,
    y: this.posInitial.y
  }
}

function Circle(options) {
  Component.call(this)
  this.type = COMPONENT_TYPE.CIRCLE
  this.color = options.color
  this.speedRate = options.rate
  this.posInitial = {x : options.x, y : options.y}
  this.position = {x : options.x, y : options.y}

}

Circle.prototype = new Component()
Circle.prototype.constructor = Circle

function Label(options) {
  Component.call(this)
  this.type = COMPONENT_TYPE.LABEL
  this.color = options.color
  this.text = options.text
  this.speedRate = options.rate
  this.posInitial = {x : options.x, y : options.y}
  this.position = {x : options.x, y : options.y}
}

Label.prototype = new Component()
Label.prototype.constructor = Label

function Sprite(options) {
  Component.call(this)
  this.type = COMPONENT_TYPE.SPRITE
  this.posInitial = {x : options.x, y : options.y}
  this.position = {x : options.x, y : options.y}
  this.width = options.width
  this.height = options.height
  this.image = new Image()
  this.image.src = "img/liofi.png"

  this.update = function (){
    // this.tickCount +=1
    // if (this.tickCount > ticksPerFrame) {
    //   tickCount = 0
    //
    // }
  }
}

Sprite.prototype = new Component()
Sprite.prototype.constructor = Sprite
