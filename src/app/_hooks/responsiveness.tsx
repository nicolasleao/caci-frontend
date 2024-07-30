import { useState, useEffect } from "react";
import { debounce } from "../_utils";

const getWindowDimensions = () => {
    if (typeof window !== "undefined") {
        const { innerWidth: width, innerHeight: height } = window
        return { width, height }
    }
    return {
        width: 1280,
        height: 720
    }
}

export const useWindowDimensions = () => {
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions())

    useEffect(() => {
        const handleResize = () => {
            setWindowDimensions(getWindowDimensions())
        }
        const debouncedHandleResize = debounce(() => handleResize(), 1000)

        if (typeof window !== "undefined") {
            window.addEventListener('resize', debouncedHandleResize)
            return () => window.removeEventListener('resize', debouncedHandleResize)
        }
    })

    return windowDimensions
}