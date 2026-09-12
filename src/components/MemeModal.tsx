import { useEffect } from 'react'
import type { Meme } from '../types'

interface MemeModalProps {
  meme: Meme
  onClose: () => void
}

export default function MemeModal({ meme, onClose }: MemeModalProps) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }

    document.addEventListener('keydown', handleKeyDown)
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = previousOverflow
    }
  }, [onClose])

  return (
    <div
      className="modal"
      role="dialog"
      aria-modal="true"
      aria-label="Meme preview"
      onClick={onClose}
    >
      <div className="modal__card" onClick={(event) => event.stopPropagation()}>
        <button
          type="button"
          className="modal__close"
          aria-label="Close preview"
          autoFocus
          onClick={onClose}
        >
          ×
        </button>
        <img className="modal__img" src={meme.imageUrl} alt={meme.caption} />
        <p className="modal__caption">{meme.caption}</p>
        <a
          className="btn btn--primary"
          href={meme.imageUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          Open image in new tab
        </a>
      </div>
    </div>
  )
}