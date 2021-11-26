import React from 'react'
import { checkAuthChanged } from '../helpers/auth'

const useValidateUser = () => {
  const [authenticatedUser, setAuthenticatedUser] = React.useState(null)
  const [isValidatingUser, setIsValidatingUser] = React.useState(true)

  React.useEffect(() => {
    let mounted = true
    checkAuthChanged().then((user) => {
      if (mounted) {
        setAuthenticatedUser(user)
        setIsValidatingUser(false)
      }
    })
    return function cleanup() {
      mounted = false
    }
  }, [])

  if (isValidatingUser) {
    return { isValidatingUser }
  }

  return { authenticatedUser, setAuthenticatedUser }
}

export default useValidateUser
