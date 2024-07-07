const employeeName = document.getElementById('employeeName')
const employeeForm = document.getElementById('employeeForm')
const message = document.getElementById('message')
const checkInButton = document.getElementById('checkInCheckOutButton')
const absentButton = document.getElementById('absentButton')

const user = JSON.parse(window.localStorage.getItem('user'))

employeeName.innerText = `داشبورد ${user.name}`

checkInButton.innerText = user.enter ? 'ورود' : 'خروج'

absentButton.innerText = `${!user.absent ? 'شروع' : 'پایان'} مرخصی`

if (user.absent) checkInButton.disabled = true

if (user.absentFull) absentButton.disabled = true

checkInButton.addEventListener('click', () => {
  checkInButton.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" height="28" width="28" viewBox="0 0 512 512">
        <path
          fill="#ffffff"
          d="M142.9 142.9c62.2-62.2 162.7-62.5 225.3-1L327 183c-6.9 6.9-8.9 17.2-5.2 26.2s12.5 14.8 22.2 14.8H463.5c0 0 0 0 0 0H472c13.3 0 24-10.7 24-24V72c0-9.7-5.8-18.5-14.8-22.2s-19.3-1.7-26.2 5.2L413.4 96.6c-87.6-86.5-228.7-86.2-315.8 1C73.2 122 55.6 150.7 44.8 181.4c-5.9 16.7 2.9 34.9 19.5 40.8s34.9-2.9 40.8-19.5c7.7-21.8 20.2-42.3 37.8-59.8zM16 312v7.6 .7V440c0 9.7 5.8 18.5 14.8 22.2s19.3 1.7 26.2-5.2l41.6-41.6c87.6 86.5 228.7 86.2 315.8-1c24.4-24.4 42.1-53.1 52.9-83.7c5.9-16.7-2.9-34.9-19.5-40.8s-34.9 2.9-40.8 19.5c-7.7 21.8-20.2 42.3-37.8 59.8c-62.2 62.2-162.7 62.5-225.3 1L185 329c6.9-6.9 8.9-17.2 5.2-26.2s-12.5-14.8-22.2-14.8H48.4h-.7H40c-13.3 0-24 10.7-24 24z"
        />
      </svg>
      `
  absentButton.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" height="28" width="28" viewBox="0 0 512 512">
        <path
          fill="#ffffff"
          d="M142.9 142.9c62.2-62.2 162.7-62.5 225.3-1L327 183c-6.9 6.9-8.9 17.2-5.2 26.2s12.5 14.8 22.2 14.8H463.5c0 0 0 0 0 0H472c13.3 0 24-10.7 24-24V72c0-9.7-5.8-18.5-14.8-22.2s-19.3-1.7-26.2 5.2L413.4 96.6c-87.6-86.5-228.7-86.2-315.8 1C73.2 122 55.6 150.7 44.8 181.4c-5.9 16.7 2.9 34.9 19.5 40.8s34.9-2.9 40.8-19.5c7.7-21.8 20.2-42.3 37.8-59.8zM16 312v7.6 .7V440c0 9.7 5.8 18.5 14.8 22.2s19.3 1.7 26.2-5.2l41.6-41.6c87.6 86.5 228.7 86.2 315.8-1c24.4-24.4 42.1-53.1 52.9-83.7c5.9-16.7-2.9-34.9-19.5-40.8s-34.9 2.9-40.8 19.5c-7.7 21.8-20.2 42.3-37.8 59.8c-62.2 62.2-162.7 62.5-225.3 1L185 329c6.9-6.9 8.9-17.2 5.2-26.2s-12.5-14.8-22.2-14.8H48.4h-.7H40c-13.3 0-24 10.7-24 24z"
        />
      </svg>
      `
  checkInButton.classList.add('disabled')
  checkInButton.disabled = true
  absentButton.classList.add('disabled')
  absentButton.disabled = true
  if (user.enter) {
    window.electronAPI
      .enter(user.token)
      .then(() => {
        localStorage.removeItem('user')
        message.style.display = 'block'
        setTimeout(() => {
          location.href = './login.html'
        }, 1000)
      })
      .catch(() => {
        checkInButton.innerText = user.enter ? 'ورود' : 'خروج'
        absentButton.innerText = `${!user.absent ? 'شروع' : 'پایان'} مرخصی`
        checkInButton.classList.remove('disabled')
        checkInButton.disabled = false
        absentButton.classList.remove('disabled')
        absentButton.disabled = false
      })
  } else {
    window.electronAPI
      .exit(user.token)
      .then(() => {
        localStorage.removeItem('user')
        message.style.display = 'block'
        setTimeout(() => {
          location.href = './login.html'
        }, 1000)
      })
      .catch(() => {
        checkInButton.innerText = user.enter ? 'ورود' : 'خروج'
        absentButton.innerText = `${!user.absent ? 'شروع' : 'پایان'} مرخصی`
        checkInButton.classList.remove('disabled')
        checkInButton.disabled = false
        absentButton.classList.remove('disabled')
        absentButton.disabled = false
      })
  }
})
