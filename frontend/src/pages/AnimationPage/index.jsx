import { useEffect, useRef } from 'react'
import { Runner, Engine, Render, Bodies, World } from 'matter-js'

import 도토리 from "../../assets/img/Logo.svg"



function DropEvent (props) {
    const scene = useRef()
    const isPressed = useRef(false)
    const engine = useRef(Engine.create())
  
    useEffect(() => {
  
      const render = Render.create({
        element: scene.current,
        engine: engine.current,
        options: {
            width: window.innerWidth,
            height: window.innerHeight,
            wireframes: false,
            background: 'transparent'
        }
      })
  
    //   var boxA = Bodies.rectangle(400, 200, 80, 80);
    //   var boxB = Bodies.rectangle(450, 50, 80, 80);
    //   var ground = Bodies.rectangle(400, 610, 810, 60, { isStatic: true });
    //   World.add(engine.current.world, [
    //       boxA, boxB, ground
    //   ])
  
      Runner.run(engine.current)
      Render.run(render)
  
      return () => {
        Render.stop(render)
        World.clear(engine.current.world)
        Engine.clear(engine.current)
        render.canvas.remove()
        render.canvas = null
        render.context = null
        render.textures = {}
      }
    }, [])
  
    const handleDown = () => {
        isPressed.current = true
      }
    
      const handleUp = () => {
        isPressed.current = false
      }
    
      const handleAddCircle = e => {
        if (isPressed.current) {
          const obj = Bodies.circle(
            e.clientX,
            e.clientY,
            10 + Math.random() * 5,
            {
              mass: 1,
              restitution: 0.9,
              friction: 0.005,
              render: {
                sprite: {
                  texture: 도토리,
                  xScale: 2,
                  yScale: 2,
                },
              },
            })
          World.add(engine.current.world, [obj])
        }
      }
    
      return (
        <div
          onMouseDown={handleDown}
          onMouseUp={handleUp}
          onMouseMove={handleAddCircle}
        >
          <div ref={scene} style={{ width: '100%', height: '100%' }} />
        </div>
      )
    }
    




export default DropEvent;
