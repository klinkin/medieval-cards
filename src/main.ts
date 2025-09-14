import './types/lit-elements.js'
import './app.js'
import './styles.css'

const THEME_KEY = 'theme'
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
const initial = (localStorage.getItem(THEME_KEY) ?? (prefersDark ? 'dark' : 'light')) as 'dark' | 'light'
document.documentElement.classList.toggle('dark', initial === 'dark')

window.addEventListener('toggle-theme', () => {
  const isDark = document.documentElement.classList.toggle('dark')
  localStorage.setItem(THEME_KEY, isDark ? 'dark' : 'light')
})
