"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  RotateCcw, 
  Maximize2, 
  Minimize2,
  Camera,
  Eye,
  Settings,
  Play,
  Pause,
  ChevronLeft,
  ChevronRight
} from "lucide-react"

interface Interactive3DPhotoProps {
  images: string[]
  vehicleName: string
  className?: string
}

export function Interactive3DPhoto({ images, vehicleName, className = "" }: Interactive3DPhotoProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [showControls, setShowControls] = useState(true)
  const [isAutoRotating, setIsAutoRotating] = useState(true)
  const [rotation, setRotation] = useState({ x: 0, y: 0, z: 0 })
  const [scale, setScale] = useState(1)
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const [imageLoadError, setImageLoadError] = useState<number | null>(null)
  const [imageLoading, setImageLoading] = useState(true)

  // Auto-rotation effect
  useEffect(() => {
    if (!isAutoRotating) return

    const interval = setInterval(() => {
      setRotation(prev => ({
        ...prev,
        y: prev.y + 0.5
      }))
    }, 50)

    return () => clearInterval(interval)
  }, [isAutoRotating])

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen)
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length)
    setImageLoadError(null) // Reset error when changing image
    setImageLoading(true) // Show loading for new image
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)
    setImageLoadError(null) // Reset error when changing image
    setImageLoading(true) // Show loading for new image
  }

  const resetView = () => {
    setRotation({ x: 0, y: 0, z: 0 })
    setScale(1)
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    setDragStart({ x: e.clientX, y: e.clientY })
    setIsAutoRotating(false)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return

    const deltaX = e.clientX - dragStart.x
    const deltaY = e.clientY - dragStart.y

    setRotation(prev => ({
      x: prev.x + deltaY * 0.5,
      y: prev.y + deltaX * 0.5,
      z: prev.z
    }))

    setDragStart({ x: e.clientX, y: e.clientY })
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault()
    const delta = e.deltaY > 0 ? 0.9 : 1.1
    setScale(prev => Math.max(0.5, Math.min(3, prev * delta)))
  }

  const handleImageError = () => {
    setImageLoadError(currentImageIndex)
    setImageLoading(false)
  }

  const handleImageLoad = () => {
    setImageLoading(false)
    setImageLoadError(null)
  }

  const imageStyle = {
    transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) rotateZ(${rotation.z}deg) scale(${scale})`,
    transformStyle: 'preserve-3d' as const,
    transition: isDragging ? 'none' : 'transform 0.1s ease-out'
  }

  return (
    <div className={`relative ${isFullscreen ? 'fixed inset-0 z-50 bg-black' : ''} ${className}`}>
      {/* Contrôles en haut */}
      <div className="absolute top-2 sm:top-4 left-2 sm:left-4 z-10 flex gap-1 sm:gap-2">
        <Badge variant="secondary" className="bg-white/90 text-gray-800 text-xs">
          <Camera className="h-3 w-3 mr-1" />
          <span className="hidden sm:inline">Vue 3D Interactive</span>
          <span className="sm:hidden">3D</span>
        </Badge>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowControls(!showControls)}
          className="h-6 w-6 sm:h-8 sm:w-8 p-0 bg-white/80 hover:bg-white"
        >
          <Settings className="h-3 w-3 sm:h-4 sm:w-4" />
        </Button>
        {/* Debug info */}
        <div className="bg-black/50 text-white text-xs px-1 sm:px-2 py-1 rounded">
          {currentImageIndex + 1}/{images.length}
        </div>
      </div>

      {/* Contrôles en haut à droite */}
      <div className="absolute top-2 sm:top-4 right-2 sm:right-4 z-10 flex gap-1 sm:gap-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleFullscreen}
          className="h-6 w-6 sm:h-8 sm:w-8 p-0 bg-white/80 hover:bg-white"
        >
          {isFullscreen ? <Minimize2 className="h-3 w-3 sm:h-4 sm:w-4" /> : <Maximize2 className="h-3 w-3 sm:h-4 sm:w-4" />}
        </Button>
      </div>

      {/* Container 3D */}
      <div 
        className={`${isFullscreen ? 'h-screen' : 'h-64 sm:h-80 lg:h-96'} w-full bg-gradient-to-br from-gray-900 to-gray-700 rounded-lg overflow-hidden cursor-grab ${isDragging ? 'cursor-grabbing' : ''}`}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onWheel={handleWheel}
      >
        {/* Image 3D principale */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div 
            style={imageStyle}
            className="relative"
          >
            {imageLoadError === currentImageIndex ? (
              /* Fallback en cas d'erreur de chargement */
              <div className="w-96 h-72 bg-gray-200 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-400">
                <div className="text-center text-gray-600">
                  <Camera className="h-12 w-12 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">Image non disponible</p>
                  <p className="text-xs mt-1">Vue {currentImageIndex + 1}</p>
                </div>
              </div>
            ) : (
              <div className="relative">
                {imageLoading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-lg">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                  </div>
                )}
                <img
                  src={images[currentImageIndex]}
                  alt={`${vehicleName} - Vue ${currentImageIndex + 1}`}
                  className={`max-w-full max-h-full object-contain rounded-lg shadow-2xl transition-opacity duration-300 ${
                    imageLoading ? 'opacity-0' : 'opacity-100'
                  }`}
                  draggable={false}
                  onError={handleImageError}
                  onLoad={handleImageLoad}
                />
              </div>
            )}
            
            {/* Indicateur de vue actuelle */}
            <div className="absolute top-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
              {["Vue avant", "Vue côté", "Vue arrière", "Intérieur", "Moteur"][currentImageIndex] || `Vue ${currentImageIndex + 1}`}
            </div>
          </div>
        </div>

        {/* Indicateur de rotation */}
        {isAutoRotating && (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="w-8 h-8 border-2 border-white/30 rounded-full animate-spin">
              <div className="w-2 h-2 bg-white rounded-full absolute top-0 left-1/2 transform -translate-x-1/2"></div>
            </div>
          </div>
        )}
      </div>

      {/* Contrôles en bas */}
      {showControls && (
        <div className="absolute bottom-2 sm:bottom-4 left-2 sm:left-4 right-2 sm:right-4 z-10">
          <div className="bg-white/90 backdrop-blur-sm rounded-lg p-2 sm:p-3">
            <div className="flex flex-col sm:flex-row items-center justify-between mb-2 sm:mb-3 gap-2">
              <div className="flex items-center gap-1 sm:gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={prevImage}
                  className="h-6 w-6 sm:h-8 sm:w-8 px-1 sm:px-2"
                >
                  <ChevronLeft className="h-3 w-3 sm:h-4 sm:w-4" />
                </Button>
                <span className="text-xs sm:text-sm font-medium">
                  {currentImageIndex + 1} / {images.length}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={nextImage}
                  className="h-6 w-6 sm:h-8 sm:w-8 px-1 sm:px-2"
                >
                  <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4" />
                </Button>
              </div>
              
              <div className="flex items-center gap-1 sm:gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsAutoRotating(!isAutoRotating)}
                  className={`h-6 w-6 sm:h-8 sm:w-8 ${isAutoRotating ? 'bg-primary text-white' : ''}`}
                >
                  {isAutoRotating ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3" />}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={resetView}
                  className="h-6 w-6 sm:h-8 sm:w-8"
                >
                  <RotateCcw className="h-3 w-3 sm:h-4 sm:w-4" />
                </Button>
              </div>
            </div>

            {/* Miniatures */}
            <div className="flex gap-1 sm:gap-2 overflow-x-auto">
              {images.map((image, index) => {
                const viewLabels = ["Vue avant", "Vue côté", "Vue arrière", "Intérieur", "Moteur"]
                return (
                  <button
                    key={index}
                    onClick={() => {
                      setCurrentImageIndex(index)
                      setImageLoadError(null)
                      setImageLoading(true)
                    }}
                    className={`flex-shrink-0 w-8 h-6 sm:w-12 sm:h-8 rounded border-2 ${
                      currentImageIndex === index 
                        ? 'border-primary' 
                        : 'border-gray-300'
                    }`}
                    title={viewLabels[index] || `Vue ${index + 1}`}
                  >
                    <img
                      src={image}
                      alt={`Vue ${index + 1}`}
                      className="w-full h-full object-cover rounded"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none'
                      }}
                    />
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      )}

      {/* Instructions */}
      <div className="absolute bottom-2 sm:bottom-4 right-2 sm:right-4 z-10">
        <div className="bg-black/50 text-white text-xs p-1 sm:p-2 rounded">
          <div className="flex items-center gap-1 mb-1">
            <Eye className="h-3 w-3" />
            <span className="hidden sm:inline">Glisser pour tourner</span>
            <span className="sm:hidden">Glisser</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="hidden sm:inline">Molette pour zoomer</span>
            <span className="sm:hidden">Zoom</span>
          </div>
        </div>
      </div>
    </div>
  )
}
