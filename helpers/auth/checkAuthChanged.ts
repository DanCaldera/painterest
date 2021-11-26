import { auth } from '../../firebase'

const checkAuthChanged = () => {
  return new Promise((resolve, reject) => {
    auth.onAuthStateChanged(function (user) {
      if (user) {
        resolve(user)
      } else {
        resolve(null)
      }
    })
  })
}

export default checkAuthChanged
