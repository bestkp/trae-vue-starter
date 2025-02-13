export interface Point {
  x: number
  y: number
}

export interface Snake {
  body: Point[]
  direction: 'up' | 'down' | 'left' | 'right'
}

export interface GameState {
  snake: Snake
  food: Point
  score: number
  isGameOver: boolean
}

export interface GameConfig {
  gridWidth: number
  gridHeight: number
  initialSnakeLength: number
  speed: number
}