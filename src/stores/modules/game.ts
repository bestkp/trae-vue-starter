import { defineStore } from 'pinia'

// 定义游戏状态的类型
interface GameState {
  score: number
  highScore: number
  isPlaying: boolean
  isPaused: boolean
  gameSpeed: number
}

// 创建游戏状态管理store
export const useGameStore = defineStore('game', {
  // 状态
  state: (): GameState => ({
    score: 0,
    highScore: Number(localStorage.getItem('highScore')) || 0,
    isPlaying: false,
    isPaused: false,
    gameSpeed: 150, // 初始游戏速度，数值越小蛇移动越快
  }),

  // 计算属性
  getters: {
    currentScore: (state) => state.score,
    currentHighScore: (state) => state.highScore,
    gameStatus: (state) => ({
      isPlaying: state.isPlaying,
      isPaused: state.isPaused,
    }),
  },

  // 动作
  actions: {
    // 开始新游戏
    startGame() {
      this.score = 0
      this.isPlaying = true
      this.isPaused = false
    },

    // 暂停游戏
    pauseGame() {
      this.isPaused = true
    },

    // 继续游戏
    resumeGame() {
      this.isPaused = false
    },

    // 结束游戏
    endGame() {
      this.isPlaying = false
      if (this.score > this.highScore) {
        this.highScore = this.score
        localStorage.setItem('highScore', String(this.highScore))
      }
    },

    // 增加分数
    addScore(points: number = 1) {
      this.score += points
    },

    // 调整游戏速度
    setGameSpeed(speed: number) {
      this.gameSpeed = speed
    },

    // 重置游戏状态
    resetGame() {
      this.score = 0
      this.isPlaying = false
      this.isPaused = false
      this.gameSpeed = 150
    },
  },
})