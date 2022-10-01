import './style.css'
import * as THREE from 'three'
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'

const loader = new THREE.TextureLoader()
const height = loader.load('height.png')
const texture = loader.load('terrain.jpeg')
const alpha = loader.load('/alpha.png')

// Debug
//const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

//plane
const geometry = new THREE.PlaneBufferGeometry(3, 3 , 64, 64)

// Materials
const material =  new THREE.MeshStandardMaterial({
    color: 'gray',
    map: texture,
    displacementMap: height,
    displacementScale : .75,
    alphaMap: alpha,
    transparent: true,
    depthTest: false
})

const plane= new THREE.Mesh(geometry,material)
scene.add(plane)
plane.rotation.x=181



// Mesh


// Lights

const pointLight = new THREE.PointLight(0x107bb6, 4)
pointLight.position.x = -1.1
pointLight.position.y = 3.8
pointLight.position.z = 2
scene.add(pointLight)


// const col = {color: '#00ff00'}
// gui.addColor(col ,'color').onChange( ()=> {
//     pointLight.color.set(col.color)    
// })

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth *.7  ,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth *.7
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})


const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 0
camera.position.y = 0
camera.position.z = 3
scene.add(camera)


const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

document.addEventListener('mousemove', animateTerrain)

let mouseY=0

function animateTerrain(event) {
    mouseY = event.clientY
  //  mouseX = event.clientX
}


const clock = new THREE.Clock()

const tick = () =>
{

    const elapsedTime = clock.getElapsedTime()

    plane.rotation.z = .2*elapsedTime
   // plane.material.displacementScale = .8 + mouseX * 0.0004
    plane.material.displacementScale = .8 + mouseY * 0.0004
 
    renderer.render(scene, camera)

  
    window.requestAnimationFrame(tick)


}

tick()