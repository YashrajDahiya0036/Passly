import React from 'react'
import { useRef } from "react"
import Lottie from "lottie-react"
import copy from '../icons/copy.json'

const Copy_Lottie = ({notify}) => {
    const lottieRef = useRef()

    return (
        <div
            onClick={()=>notify()}
            onMouseEnter={() => lottieRef.current.play()}
            onMouseLeave={() => lottieRef.current.stop()}
        >
            <Lottie
                lottieRef={lottieRef}
                animationData={copy}
                loop={false}
                autoplay={false}
                style={{ height: 25, width: 25 }}
            />
        </div>
    )
}

export default Copy_Lottie
