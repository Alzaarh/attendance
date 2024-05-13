const employeeName = document.getElementById('employeeName')
const employeeForm = document.getElementById('employeeForm')
const message = document.getElementById('message')
const button = document.getElementById('button')

const user = JSON.parse(window.localStorage.getItem('user'))

employeeName.innerText = `داشبورد ${user.name}`

button.innerText = user.event === 1 ? 'ورود' : 'خروج'

employeeForm.addEventListener('submit', async (event) => {
  event.preventDefault()
  if (user.event === 1) {
    const { success } = await window.electronAPI.enter(user.id)
    if (success) {
      message.style.setProperty('display', 'block')
      window.electronAPI.quit()
    }
  } else {
    const { success } = await window.electronAPI.exit(user.id)
    if (success) {
      message.style.setProperty('display', 'block')
      window.electronAPI.quit()
    }
  }
})
