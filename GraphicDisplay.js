function GraphicDisplay(ctx){
  this.ctx = ctx
  this.canvasBackgroudColor = "black"
  this.canvasWidth = this.ctx.canvas.attributes.width.nodeValue
  this.canvasHeight = this.ctx.canvas.attributes.height.nodeValue
  this.logicDisplay = null

  this.backGroundImg = new Image()
  // this.backGroundImg.src = 'img/g4155.jpg'
  this.backGroundImg.src = 'img/BG.png'

  this.timeLine = 0;
  this.timeFrame = 0;

  this.mode = 0
  this.MODES = {
    PLAY : 1,
    STOP : 2,
    RESTART : 3,
  }

  this.modes_perform = 0
  this.MODES_PERFORM = {
    NAVIGATE: "1",
  }

  this.camMoving = false

  this.zoom = 10;
  this.mouse = {
    X : 0,
    Y : 0,
    type : null
  }
  this.nav = {
    X : 0,
    Y : 0
  }
}

GraphicDisplay.prototype.init = function(){
  this.logicDisplay = new LogicDisplay()
  this.addComponent()
}

GraphicDisplay.prototype.execute = function(timeLine){
  this.timeLine = timeLine

  this.updateCamera()


  switch (this.mode) {
    case this.MODES.PLAY:
      this.clearGrid()
      this.animationPlay()
      this.drawAllComponents(this.logicDisplay.components)
      break
    case this.MODES.STOP:
      this.clearGrid()
      this.drawAllComponents(this.logicDisplay.components)
      break
    case this.MODES.RESTART:
      this.clearGrid()
      this.animationRestart()
      this.drawAllComponents(this.logicDisplay.components)
      this.mode = 0
      break
    default:
      this.clearGrid()
      this.drawAllComponents(this.logicDisplay.components)
  }

}

GraphicDisplay.prototype.animationPlay = function(){
  if(this.logicDisplay.components[0].position.x < this.canvasWidth - 100) {
    this.logicDisplay.components[0].position.x = this.logicDisplay.components[0].position.x + (1 * this.logicDisplay.components[0].speedRate )
  }else if(this.logicDisplay.components[0].position.y < this.canvasHeight - 100){
    this.logicDisplay.components[0].position.y = this.logicDisplay.components[0].position.y + (1 * this.logicDisplay.components[0].speedRate )
  }


  if(this.logicDisplay.components[1].position.y < this.canvasHeight){
    this.logicDisplay.components[1].position.y = this.logicDisplay.components[1].position.y + (1 * this.logicDisplay.components[1].speedRate )
  }
}

GraphicDisplay.prototype.animationRestart = function(){
  for (var i in this.logicDisplay.components) {
    this.logicDisplay.components[i].setInitialPosition()
  }
}

GraphicDisplay.prototype.drawCircle = function(component) {
  this.ctx.lineWidth = 1;
  this.ctx.fillStyle = component.color
  this.ctx.strokeStyle = component.color
  this.ctx.beginPath()
  this.ctx.arc(component.position.x + this.nav.X,
                component.position.y + this.nav.Y,
                1 * this.zoom,
                0,
                Math.PI * 2,
                false)
  this.ctx.closePath()
  this.ctx.stroke()
}

GraphicDisplay.prototype.drawLabel = function(component){
  this.ctx.fillStyle = component.color
  this.ctx.fillText(component.text, 100, 100)

}

GraphicDisplay.prototype.drawSprite = function(component){
  this.ctx.drawImage(component.image,
                    300,0,100,100,
                    component.position.x + this.nav.X,
                    component.position.y + this.nav.Y,
                    100,100
                    // component.width,
                    // component.height
                    )
  // this.ctx.drawImage(component.image, 0,0)
}

GraphicDisplay.prototype.drawToolTip = function(){
  this.ctx.fillStyle = 'black'
  this.ctx.fillRect(0, 0, 10, this.canvasHeight)
  this.ctx.fillStyle = 'withe'
  this.ctx.fillText("ggg", 5, 5)
}

GraphicDisplay.prototype.drawComponent = function(component){
  switch (component.type) {
    case COMPONENT_TYPE.CIRCLE:
      this.drawCircle(component)
      break
    case COMPONENT_TYPE.LABEL:
      this.drawLabel(component)
      break
    case COMPONENT_TYPE.SPRITE:
      this.drawSprite(component)
      break
    default:
  }
}

GraphicDisplay.prototype.drawAllComponents = function(components){
  for(var i = 0; i < components.length; i++){
    this.drawComponent(components[i])
  }
}

GraphicDisplay.prototype.addComponent = function(){
  this.logicDisplay.addComponent(new Circle({x: 100, y: 100, rate: 1, name : 'Worker', color : 'blue'}))
  this.logicDisplay.addComponent(new Circle({x: 300, y: 200, rate: 0.1, name : 'Truck', color : 'green'}))
  this.logicDisplay.addComponent(new Label({x: 300, y: 200, rate: 0.1, text: 'Hi', color : 'green'}))
  this.logicDisplay.addComponent(new Sprite({x : 0, y : 0, width : 1000, height : 100, numberOfFrames: 10, ticksPerFrame : 4}))
}

GraphicDisplay.prototype.updateCamera = function() {
  console.log(this.camMoving);
  if (this.camMoving) {
    this.nav = {
      X : this.mouse.X,
      Y : this.mouse.Y
    }
  }
}

GraphicDisplay.prototype.setAction = function(e, action){
  this.mode = action
}

GraphicDisplay.prototype.performAction = function(){
  switch (this.modes_perform) {
    case this.MODES_PERFORM.NAVIGATE:
      if(this.mouse.type == "mousedown"){
        this.camMoving = true
      }else if(this.mouse.type == "mouseup"){
        this.camMoving = false
      }
      break;
    default:

  }
}

GraphicDisplay.prototype.clearGrid = function() {
  this.ctx.restore()
  // this.ctx.fillStyle = this.canvasBackgroudColor
  // this.ctx.fillRect(0, 0, this.canvasWidth, this.canvasHeight)
  this.ctx.drawImage(this.backGroundImg, 0, 0, this.canvasWidth, this.canvasHeight)
  this.ctx.save()
}

GraphicDisplay.prototype.updateMouse = function (options) {
  switch (options.type) {
    case "mousedown":
      this.mouse.type = options.type
      this.performAction()
      break;
    case "mouseup":
      this.mouse.type = options.type
      this.performAction()
      break;
    case "mousemove":
      this.mouse.type = options.type
      this.mouse.X = options.layerX
      this.mouse.Y = options.layerY
      this.performAction()
      break;
    default:

  }
}

GraphicDisplay.prototype.setModesPerform = function(mode){
  this.modes_perform = mode
}

GraphicDisplay.prototype.resetModesPerform = function(mode){
  this.modes_perform = 0
}
