import styles from "./styles.module.scss"

import { FaGithub } from 'react-icons/fa'
import { FiX } from 'react-icons/fi'

import { signIn, useSession, signOut } from 'next-auth/react'

export function SignInButton() {
  const { data: session } = useSession()

  return session ? (
    <button className={styles.signInButton} onClick={() => signOut()}>
      <FaGithub size="20" color="#04D361"/>
      {session.user.name}
      <FiX size="20" color="#737380" className={styles.closeIcon}/>
    </button>
  ) : (
    <button className={styles.signInButton} onClick={() => signIn("github")}>
      <FaGithub size="20" color="#eba417"/>
      Sign in with GitHub
    </button>
  )  
}