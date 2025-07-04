import {useEffect, useRef} from 'react'
import {useFrame, useThree} from '@react-three/fiber'
import {CSS3DRenderer} from 'three/addons/renderers/CSS3DRenderer.js'

export default function Css3d() {
    const {gl, scene, camera, size} = useThree()

    const rendererRef = useRef<CSS3DRenderer | null>(null)

    useEffect(() => {
        const renderer = new CSS3DRenderer()
        renderer.domElement.style.position = 'absolute'
        renderer.domElement.style.top = '0'
        renderer.domElement.style.left = '0'
        rendererRef.current = renderer

        gl.domElement.parentElement?.appendChild(renderer.domElement)
        
        return () => {
            gl.domElement.parentElement?.removeChild(renderer.domElement)
        }
    }, [gl])

    useEffect(() => {
        rendererRef.current?.setSize(size.width, size.height)
    }, [size])

    useFrame(() => {
        rendererRef.current?.render(scene, camera)
    })

    return null
}