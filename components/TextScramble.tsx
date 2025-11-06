'use client'

import { useEffect, useState, useRef } from 'react'

interface TextScrambleProps {
  texts: string[] // Array of text variations
  className?: string
  speed?: number
  delay?: number
  holdDuration?: number // How long to hold the revealed text before scrambling again
  characters?: string
  lineGap?: string // Gap between lines (e.g., '0.1em', '0.05em')
}

const defaultCharacters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?'

// Helper function to generate scrambled text matching the length and character types
function scrambleText(target: string, characters: string): string {
  // Check if this is an HTML tag - if so, don't scramble it
  if (target.trim().startsWith('<') && target.trim().endsWith('>')) {
    return target
  }

  return target.split('').map((char) => {
    // Preserve spaces
    if (char === ' ') {
      return char
    }
    // Scramble letters and numbers, but keep the same type (uppercase/lowercase/number)
    if (/[A-Z]/.test(char)) {
      return characters[Math.floor(Math.random() * 26)] // A-Z
    } else if (/[a-z]/.test(char)) {
      return characters[26 + Math.floor(Math.random() * 26)].toLowerCase() // a-z
    } else if (/[0-9]/.test(char)) {
      return characters[52 + Math.floor(Math.random() * 10)] // 0-9
    } else {
      // For punctuation, sometimes scramble, sometimes keep
      return Math.random() > 0.7 ? char : characters[Math.floor(Math.random() * characters.length)]
    }
  }).join('')
}

// Helper function to split text into words
function splitIntoWords(text: string): Array<{ type: 'word' | 'br' | 'space'; content: string; original: string }> {
  const words: Array<{ type: 'word' | 'br' | 'space'; content: string; original: string }> = []
  const brRegex = /<br\s*\/?>/gi
  
  // First, extract all <br> tags with their positions
  const brMatches: Array<{ index: number; content: string; length: number }> = []
  brRegex.lastIndex = 0
  let match
  while ((match = brRegex.exec(text)) !== null) {
    brMatches.push({ 
      index: match.index, 
      content: match[0],
      length: match[0].length
    })
  }

  // Build words array by processing text sequentially
  let currentIndex = 0
  let brMatchIndex = 0

  while (currentIndex < text.length) {
    // Check if we're at a <br> tag
    const nextBr = brMatchIndex < brMatches.length ? brMatches[brMatchIndex] : null
    
    if (nextBr && currentIndex === nextBr.index) {
      // Add the <br> tag
      words.push({
        type: 'br',
        content: nextBr.content,
        original: nextBr.content
      })
      currentIndex += nextBr.length
      brMatchIndex++
    } else {
      // Find next delimiter (space or <br> tag)
      const nextSpace = text.indexOf(' ', currentIndex)
      const nextBrIndex = nextBr ? nextBr.index : text.length
      const endIndex = Math.min(
        nextSpace === -1 ? text.length : nextSpace,
        nextBrIndex
      )

      // Add word if there's content
      if (endIndex > currentIndex) {
        const word = text.slice(currentIndex, endIndex)
        words.push({
          type: 'word',
          content: word,
          original: word
        })
        currentIndex = endIndex
      }

      // Add space if we hit one (and it's not a <br> tag)
      if (currentIndex < text.length && text[currentIndex] === ' ' && currentIndex !== nextBrIndex) {
        words.push({
          type: 'space',
          content: ' ',
          original: ' '
        })
        currentIndex++
      }
    }
  }

  return words
}

export default function TextScramble({ 
  texts, 
  className = '', 
  speed = 50,
  delay = 0,
  holdDuration = 3000, // 3 seconds to hold revealed text
  characters = defaultCharacters,
  lineGap = '0.1em' // Default gap
}: TextScrambleProps) {
  const [displayText, setDisplayText] = useState<string>('')
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const transitionIntervalRef = useRef<NodeJS.Timeout | null>(null)
  const transitionTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const currentTextIndexRef = useRef(0)
  const scrambleCountRef = useRef(0)
  const maxScramblesRef = useRef(0)
  const wordsRef = useRef<Array<{ type: 'word' | 'br' | 'space'; content: string; original: string }>>([])

  const startScrambling = (textIndex: number, initialDelay: number = 0) => {
    // Clear any existing intervals/timeouts
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
    if (transitionIntervalRef.current) {
      clearInterval(transitionIntervalRef.current)
      transitionIntervalRef.current = null
    }
    if (transitionTimeoutRef.current) {
      clearTimeout(transitionTimeoutRef.current)
      transitionTimeoutRef.current = null
    }

    // Ensure textIndex is valid
    if (!texts || texts.length === 0 || textIndex < 0 || textIndex >= texts.length) {
      return
    }

    const currentText = texts[textIndex]
    const words = splitIntoWords(currentText)
    wordsRef.current = words

    // Reset state
    setDisplayText('')
    scrambleCountRef.current = 0
    maxScramblesRef.current = words.length * 8 + 20 // More scrambles for smoother effect

    // Start scrambling after delay
    timeoutRef.current = setTimeout(() => {
      intervalRef.current = setInterval(() => {
        const scrambleCount = scrambleCountRef.current

        if (scrambleCount >= maxScramblesRef.current) {
          // Scrambling complete - show final text
          if (intervalRef.current) {
            clearInterval(intervalRef.current)
            intervalRef.current = null
          }
          setDisplayText(currentText)

          // After holding the revealed text, scramble it again before transitioning
          transitionTimeoutRef.current = setTimeout(() => {
            // Scramble the current text before transitioning
            transitionIntervalRef.current = setInterval(() => {
              const scrambled = currentText.split('').map((char, idx) => {
                if (char === ' ' || char === '\n' || char === '\t') return char
                if (currentText.slice(Math.max(0, idx - 5), idx + 6).includes('<br')) return char
                return characters[Math.floor(Math.random() * characters.length)]
              }).join('')
              setDisplayText(scrambled)
            }, 50)

            // After scrambling for a bit, transition to next text
            transitionTimeoutRef.current = setTimeout(() => {
              if (transitionIntervalRef.current) {
                clearInterval(transitionIntervalRef.current)
                transitionIntervalRef.current = null
              }
              const nextIndex = (textIndex + 1) % texts.length
              currentTextIndexRef.current = nextIndex
              startScrambling(nextIndex, 0)
            }, 500) // Scramble for 500ms before revealing next
          }, holdDuration)
          return
        }

        // Calculate how many words should be revealed
        const wordsToReveal = Math.floor((scrambleCount / maxScramblesRef.current) * words.length)
        
        // Build result: revealed words + scrambled words
        let result = ''
        for (let i = 0; i < words.length; i++) {
          const word = words[i]
          
          if (word.type === 'br') {
            result += word.content
          } else if (word.type === 'space') {
            result += word.content
          } else {
            // Word
            if (i < wordsToReveal) {
              // Revealed word
              result += word.original
            } else {
              // Scrambled word - maintain exact length
              result += scrambleText(word.original, characters)
            }
          }
        }

        setDisplayText(result)
        scrambleCountRef.current += 1
      }, speed)
    }, initialDelay)
  }

  useEffect(() => {
    // Ensure texts array is valid
    if (!texts || texts.length === 0) {
      return
    }

    // Start with the first text
    currentTextIndexRef.current = 0
    startScrambling(0, delay)

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
        timeoutRef.current = null
      }
      if (transitionIntervalRef.current) {
        clearInterval(transitionIntervalRef.current)
        transitionIntervalRef.current = null
      }
      if (transitionTimeoutRef.current) {
        clearTimeout(transitionTimeoutRef.current)
        transitionTimeoutRef.current = null
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [speed, delay, holdDuration, characters]) // texts array is stable, so we don't need it in deps

  // Handle line breaks - preserve <br> tags
  const renderText = () => {
    const parts = displayText.split(/(<br\s*\/?>)/gi)
    return parts.map((part, index) => {
      if (part.match(/<br\s*\/?>/gi)) {
        return (
          <span key={index} style={{ display: 'block', marginTop: lineGap, marginBottom: lineGap }}>
            <br className="hidden sm:block" />
            <span className="sm:hidden"> </span>
          </span>
        )
      }
      return <span key={index}>{part}</span>
    })
  }

  return (
    <span className={className}>
      {renderText()}
    </span>
  )
}
