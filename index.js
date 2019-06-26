
window.onload = function(){
  this.timeFrame = 10
  this.timeLine = 0;

  this.canvas = null
  this.ctx = null

  // var lastTime = 0;
  // var vendors = ['ms', 'moz', 'webkit', 'o'];
  // for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
  //     window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
  //     window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame']
  //                                || window[vendors[x]+'CancelRequestAnimationFrame'];
  // }
  //
  // if (!window.requestAnimationFrame)
  //     window.requestAnimationFrame = function(callback, element) {
  //         var currTime = new Date().getTime();
  //         var timeToCall = Math.max(0, 16 - (currTime - lastTime));
  //         var id = window.setTimeout(function() { callback(currTime + timeToCall); },
  //           timeToCall);
  //         lastTime = currTime + timeToCall;
  //         return id;
  //     };
  //
  // if (!window.cancelAnimationFrame)
  //     window.cancelAnimationFrame = function(id) {
  //         clearTimeout(id);
  //     };

  init()
}

init = () => {

  this.canvas = document.createElement("canvas")
  this.canvas.width = 900
  this.canvas.height = 500
  this.canvas.id = 'canvas'

  let mainContainer = document.getElementById("mainContainer")
  mainContainer.appendChild(this.canvas)
  this.ctx = this.canvas.getContext("2d")

  let gr = new GraphicDisplay(this.ctx)
  gr.init()
  gr.timeFrame = this.timeFrame

  let play = document.getElementById('play')
  play.addEventListener('click', function(e){
    gr.setAction(e, 1)
  })

  let stop = document.getElementById('stop')
  stop.addEventListener('click', function(e){
    gr.setAction(e, 2)
  })

  let restart = document.getElementById('restart')
  restart.addEventListener('click', function(e){
    gr.setAction(e, 3)
  })

  let zoom_in = document.getElementById('zoom_in')
  zoom_in.addEventListener('click', function(e){
    gr.zoom++
  })

  let zoom_out = document.getElementById('zoom_out')
  zoom_out.addEventListener('click', function(e){
    gr.zoom--
  })

  let mode_perform = document.getElementById('mode_perform')
  mode_perform.addEventListener('change', function(e){
    // gr.setModesPerform(e.key)
  })

  document.addEventListener('keydown', function(e){
    gr.setModesPerform(e.key)
  })

  // this.canvas.addEventListener('click', function(e){
  //   // let rect = this.canvas.getBoundingClientRect()
  //   var x, y
  //   // x = evt.clientX - rect.left
  //   x = e.clientX
  //   // y = evt.clientY - rect.top
  //   y = e.clientY
  //   // console.log('x: ' + x , 'y: ' + y, evt.layerX, evt.layerY, evt)
  //
  //   gr.mouse = e
  // }, false)

  this.canvas.addEventListener('mousemove', function(e){
    gr.updateMouse(e)

    // console.log("move", evt.layerX, evt.layerY, evt.type, evt);
    // gr.mouse = {
    //   X: e.layerX,
    //   Y : e.layerY,
    //   event : 'mousemove'
    // }
  }, false)

  this.canvas.addEventListener('mousedown', function(e){
    gr.updateMouse(e)
    // console.log("Down");
    // gr.mouse.event = 'mousedown'
  }, false)
  this.canvas.addEventListener('mouseup', function(e){
    gr.updateMouse(e)
    // console.log("UP");
    // gr.mouse.event = 'mouseup'
  }, false)


  // let coinImage = new Image()
  // coinImage.src = "img/coin-sprite-animation.png"
  // coinImage.addEventListener("load", loop())
  // coinImage.src = "img/coin-sprite-animation.png"

  setInterval(_ => {
    gr.execute(this.timeLine++)
  },this.timeFrame)
  // function loop(){
  //   window.requestAnimationFrame(loop)
  //   gr.execute(this.timeLine++)
  // }

}
