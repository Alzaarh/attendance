const username = document.getElementById('username')
const password = document.getElementById('password')
const error = document.getElementById('error')

document.getElementById('form').addEventListener('submit', async (event) => {
  event.preventDefault()
  if (!username.value || !password.value) {
    error.innerText = 'نام کاربری یا رمزعبور را وارد کنید.'
  } else {
    const { success, user, event } = await window.electronAPI.login({
      username: username.value,
      password: password.value,
    })
    if (success) {
      window.localStorage.setItem('user', JSON.stringify({ ...user, event }))
      window.location.href = './dashboard.html'
    } else error.innerText = 'نام کاربری یا رمزعبور اشتباه است.'
  }
})
