<script setup lang="ts">
import { useGameStore } from '@/stores/modules/game.ts'
import { random, average, median } from '@snake/utils'
import { ref } from 'vue'

defineProps<{ msg: string }>()

const gameStore = useGameStore()
const numbers = ref<number[]>([])
const randomNumber = ref<number>(0)

// 游戏控制方法
const handleStartGame = () => gameStore.startGame()
const handlePauseGame = () => gameStore.pauseGame()
const handleResumeGame = () => gameStore.resumeGame()
const handleEndGame = () => gameStore.endGame()
const handleResetGame = () => gameStore.resetGame()

// 数学工具函数演示
const generateRandom = () => {
  randomNumber.value = random([1, 100])
}

const addNumber = () => {
  if (randomNumber.value) {
    numbers.value.push(randomNumber.value)
  }
}

const clearNumbers = () => {
  numbers.value = []
  randomNumber.value = 0
}
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

    <div class="math-demo">
      <h2>数学工具函数演示</h2>
      <div class="random-section">
        <button @click="generateRandom">生成随机数(1-100)</button>
        <p>当前随机数: {{ randomNumber }}</p>
        <button @click="addNumber" :disabled="!randomNumber">添加到数组</button>
        <button @click="clearNumbers">清空数组</button>
      </div>
      <div class="array-section">
        <h3>数组操作</h3>
        <p>当前数组: {{ numbers.join(', ') || '空' }}</p>
        <p>平均值: {{ numbers.length ? average(numbers) : '无数据' }}</p>
        <p>中位数: {{ numbers.length ? median(numbers) : '无数据' }}</p>
      </div>
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

.math-demo {
  margin-top: 30px;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
}

.random-section,
.array-section {
  margin: 15px 0;
}

.math-demo h2 {
  color: #2c3e50;
  margin-bottom: 20px;
}

.math-demo h3 {
  color: #34495e;
  margin: 15px 0;
}

.math-demo p {
  margin: 10px 0;
  color: #666;
}
</style>
