<script setup lang="ts">
import { Icon } from '@iconify/vue';
</script>

<template>
  <div class="app-container">
    <header class="app-header">
      <h1><Icon icon="game-icons:snake" class="header-icon" /> 贪吃蛇游戏</h1>
    </header>
    
    <div class="app-main">
      <main class="main-content">
        <router-view></router-view>
      </main>
    </div>
  </div>
</template>

<style>
/* CSS Reset */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html, body {
  height: 100%;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

ul, ol {
  list-style: none;
}

a {
  text-decoration: none;
  color: inherit;
}

button, input, select, textarea {
  font: inherit;
  color: inherit;
  border: none;
  background: none;
}

/* App Styles */
body {
  margin: 0;
  padding: 0;
  overflow: hidden;
  background-color: #f0f2f5;
  width: 100%;
}

.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.app-header {
  background-color: #001529;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 32px;
  height: 100px;
}

.app-header h1 {
  margin: 0;
  font-size: 24px;
  display: flex;
  align-items: center;
  gap: 37px;
  color: #fff;
}

.header-icon {
  font-size: 24px;
  color: #1890ff;
}

.app-header nav {
  display: flex;
  gap: 112px;
}

.app-header nav a {
  display: flex;
  align-items: center;
  gap: 22px;
  color: #fff;
  font-size: 36px;
}

.nav-icon {
  font-size: 90px;
}

.app-header nav a:hover {
  color: #1890ff;
}

.app-main {
  display: flex;
  flex: 1;
}

.menu-list li {
  padding: 37px 112px;
}

.menu-list a {
  color: #333;
  display: flex;
  align-items: center;
  gap: 37px;
  font-size: 36px;
}

.menu-icon {
  font-size: 90px;
  color: #1890ff;
}

.menu-list a:hover {
  color: #1890ff;
}

.main-content {
  flex: 1;
  border-radius: 30px;
  background-color: #fff;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  color: #333;
  font-size: 28px;
}
</style>