"use client"

import { useEffect, useRef } from "react"

const SHAKE_THRESHOLD = 30
const SHAKE_TIMEOUT = 500

export function useShakeDetection(callback: () => void) {
  const lastShakeRef = useRef(0)
  const accelerationRef = useRef({ x: 0, y: 0, z: 0 })

  useEffect(() => {
    let lastX = 0,
      lastY = 0,
      lastZ = 0

    const handleDeviceMotion = (event: DeviceMotionEvent) => {
      const acceleration = event.acceleration
      if (!acceleration) return

      const { x = 0, y = 0, z = 0 } = acceleration

      const deltaX = Math.abs(x - lastX)
      const deltaY = Math.abs(y - lastY)
      const deltaZ = Math.abs(z - lastZ)

      if (deltaX > SHAKE_THRESHOLD || deltaY > SHAKE_THRESHOLD || deltaZ > SHAKE_THRESHOLD) {
        const now = Date.now()
        if (now - lastShakeRef.current > SHAKE_TIMEOUT) {
          lastShakeRef.current = now
          callback()
        }
      }

      lastX = x
      lastY = y
      lastZ = z
    }

    window.addEventListener("devicemotion", handleDeviceMotion)

    return () => {
      window.removeEventListener("devicemotion", handleDeviceMotion)
    }
  }, [callback])
}

export async function requestShakePermission() {
  if (typeof window === "undefined") return false

  if ((DeviceMotionEvent as any).requestPermission) {
    try {
      const permission = await (DeviceMotionEvent as any).requestPermission()
      return permission === "granted"
    } catch (error) {
      console.error("Permission request failed:", error)
      return false
    }
  }

  return true // Non-iOS devices don't require explicit permission
}
