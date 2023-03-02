import { RiShutDownLine } from 'react-icons/ri'
import { useAuth } from '../../hooks/auth'
import { api } from '../../services/api'

import { Container, Profile, Logout } from './styles'
import { useNavigate } from 'react-router-dom'

export function Header() {
  const { signOut, user } = useAuth() //manipulando o botão signOut
  const navigation = useNavigate()

  //configurando o SignOut
  function handleSignOut() {
    navigation("/")
    signOut()
  }

  const avatarUrl = user.avatar ? `${api.defaults.baseURL}/files/${user.avatar}` : avatarPlaceholder //busca a imagem do avatar no back-end

  return (
    <Container>
      <Profile to='/profile'>
        <img 
        src={avatarUrl}
        alt={user.name}/>

        <div>
          <span>Bem-vindo</span>
          <strong>{user.name}</strong>
        </div>
      </Profile>

      <Logout onClick={handleSignOut}>
        <RiShutDownLine />
      </Logout>

    </Container>
  )
}