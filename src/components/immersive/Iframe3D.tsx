import {useEffect, useRef} from 'react'
import {useThree} from '@react-three/fiber'
import {CSS3DObject} from 'three/addons/renderers/CSS3DRenderer.js'

type IFrame3DProps = {
    url: string
    position?: [number, number, number]
    rotation?: [number, number, number]
    scale?: [number, number]
}

export default function Iframe3D({
    url,
    position = [0, 0, 0],
    rotation = [0, 0, 0],
    scale = [800, 450],
}: IFrame3DProps) {
    const {scene} = useThree()
    const iframe = useRef<HTMLIFrameElement>(null)

    useEffect(() => {
        const element = document.createElement('iframe')
        element.src = url
        element.width = `${scale[0]}`
        element.height = `${scale[1]}`

        const cssObject = new CSS3DObject(element)
        cssObject.position.set(...position)
        cssObject.rotation.set(...rotation)
    })
}