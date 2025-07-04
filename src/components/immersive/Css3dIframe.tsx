import {useEffect, useRef} from 'react'
import {useThree} from '@react-three/fiber'
import {CSS3DObject} from 'three/addons/renderers/CSS3DRenderer.js'

type Css3dIframeProps = {
    url: string
    position?: [number, number, number]
    rotation?: [number, number, number]
    scale?: [number, number]
}

export default function Css3dIframe({
    url,
    position = [0, 0, 0],
    rotation = [0, 0, 0],
    scale = [800, 600],
}: Css3dIframeProps) {
    const {scene} = useThree()
    const iframe = useRef<HTMLIFrameElement | null>(null)
    const cssObject = useRef<CSS3DObject | null>(null)

    useEffect(() => {
        iframe.current = document.createElement('iframe')

        cssObject.current = new CSS3DObject(iframe.current)
        cssObject.current.scale.set(0.001, 0.001, 0.001)
    }, []);


    useEffect(() => {
        if (!iframe.current) return;

        iframe.current.src = url
        iframe.current.width = `${scale[0]}`
        iframe.current.height = `${scale[1]}`
        iframe.current.allowFullscreen = false
    }, [iframe, scale, url])
    
    useEffect(() => {
        if (cssObject.current) scene.add(cssObject.current)
        
        return () => {
            if (cssObject.current) scene.remove(cssObject.current)
        }
    }, [scene])


    useEffect(() => {
        cssObject.current?.position.set(...position)
        cssObject.current?.rotation.set(...rotation)
    }, [position, rotation])

    return null
}