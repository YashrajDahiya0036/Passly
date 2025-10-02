import React from 'react'
import { useRef } from "react"
import Lottie from "lottie-react"
import delete_l from '../icons/delete_lottie.json'

const Delete_Lottie = ({handleDelete}) => {
    const lottieRef = useRef()

    return (
        <div
            onClick={()=>handleDelete()}
            onMouseEnter={() => lottieRef.current.play()}
            onMouseLeave={() => lottieRef.current.stop()}
        >
            <Lottie
                lottieRef={lottieRef}
                animationData={delete_l}
                loop={false}
                autoplay={false}
                style={{ height: 25, width: 25 }}
            />
        </div>
    )
}

export default Delete_Lottie
