<script setup lang="ts">
import { useGameStore } from '../stores/modules/game.ts'

defineProps<{ msg: string }>()

const gameStore = useGameStore()

// 游戏控制方法
const handleStartGame = () => gameStore.startGame()
const handlePauseGame = () => gameStore.pauseGame()
const handleResumeGame = () => gameStore.resumeGame()
const handleEndGame = () => gameStore.endGame()
const handleResetGame = () => gameStore.resetGame()
</script>

<template>
  <div class="game-panel">
    <h1>{{ msg }}</h1>
    
    <div class="game-info">
      <p>当前分数: {{ gameStore.currentScore }}</p>
      <p>最高分数: {{ gameStore.currentHighScore }}</p>
      <p>游戏状态: {{ gameStore.gameStatus.isPlaying ? '进行中' : '未开始' }}</p>
      <p>{{ gameStore.gameStatus.isPaused ? '已暂停' : '' }}</p>
    </div>

    <div class="game-controls">
      <button @click="handleStartGame" :disabled="gameStore.gameStatus.isPlaying">开始游戏</button>
      <button @click="handlePauseGame" :disabled="!gameStore.gameStatus.isPlaying || gameStore.gameStatus.isPaused">暂停</button>
      <button @click="handleResumeGame" :disabled="!gameStore.gameStatus.isPaused">继续</button>
      <button @click="handleEndGame" :disabled="!gameStore.gameStatus.isPlaying">结束游戏</button>
      <button @click="handleResetGame">重置</button>
    </div>
  </div>
</template>

<style scoped>
.game-panel {
  text-align: center;
  padding: 20px;
}

.game-info {
  margin: 20px 0;
  padding: 15px;
  background-color: #f5f5f5;
  border-radius: 8px;
}

.game-controls {
  display: flex;
  gap: 10px;
  justify-content: center;
  margin-top: 20px;
}

button {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  background-color: #4CAF50;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

button:hover:not(:disabled) {
  background-color: #45a049;
}
</style>
