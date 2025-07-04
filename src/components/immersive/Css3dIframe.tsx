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
    const iframeRef = useRef<HTMLIFrameElement | null>(null)
    const cssObjectRef = useRef<CSS3DObject | null>(null)

    useEffect(() => {
        const iframe = document.createElement('iframe')
        iframe.src = url
        iframe.width = `${scale[0]}`
        iframe.height = `${scale[1]}`
        iframe.allowFullscreen = false
        iframeRef.current = iframe
    }, [scale, url])
    
    useEffect(() => {
        if (!iframeRef.current) return

        const object = new CSS3DObject(iframeRef.current)
        object.scale.set(0.001, 0.001, 0.001)
        cssObjectRef.current = object
        
        scene.add(object)
        
        return () => {
            scene.remove(object)
        }
    }, [scene])

    useEffect(() => {
        if (!iframeRef.current || !cssObjectRef.current) return
        cssObjectRef.current.element = iframeRef.current
    }, [cssObjectRef, iframeRef]);

    useEffect(() => {
        cssObjectRef.current?.position.set(...position)
        cssObjectRef.current?.rotation.set(...rotation)
    }, [position, rotation])

    return null
}