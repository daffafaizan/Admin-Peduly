/* eslint-disable react-hooks/exhaustive-deps */

import { useRef, useEffect } from 'react'
import videojs from 'video.js'

const VideoPlayer = (props) => {
  const playerRef = useRef()

  useEffect(() => {
    const player = videojs(
      playerRef.current,
      props,
      function onPlayerReady() {}
    )
    return () => {
      player.dispose()
    }
  }, [])

  const { className } = props

  return (
    <div>
      <div data-vjs-player>
        <video
          ref={playerRef}
          poster="/assets/img/video/poster.jpg"
          className={className || ''}
        />
      </div>
    </div>
  )
}

export default VideoPlayer
