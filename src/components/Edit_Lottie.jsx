import React from 'react'
import { useRef } from "react"
import Lottie from "lottie-react"
import edit from '../icons/edit.json'

const Edit_Lottie = ({handleEdit}) => {
    const lottieRef = useRef()

    return (
        <div
            onClick={()=>handleEdit()}
            onMouseEnter={() => lottieRef.current.play()}
            onMouseLeave={() => lottieRef.current.stop()}
        >
            <Lottie
                lottieRef={lottieRef}
                animationData={edit}
                loop={false}
                autoplay={false}
                style={{ height: 25, width: 25 }}
            />
        </div>
    )
}

export default Edit_Lottie
