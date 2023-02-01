import { useState } from 'react'
import { Container, Form, Background } from './styles'
import { FiMail, FiLock } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { Input } from '../../components/Input'
import { Button } from '../../components/Button'
import { useAuth } from '../../hooks/auth'

export function SignIn() {
  const [email, setEmail] = useState("")//estados que armazenam o email e senha
  const [password, setPassword] = useState("")

  //usando o hook do contexto
  const { signIn } = useAuth()

  //manipulando o signIn
  function handleSignIn() {
    signIn({ email, password })
  }
  

  return (
    <Container>
      <Form>
        <h1>Rocket Notes</h1>
        <p>Aplicação para salvar e gerenciar seus links úteis.</p>

        <h2>Faça seu login</h2>

        <Input
          placeholder='E-mail'
          type="text"
          icon={FiMail}
          onChange={e => setEmail(e.target.value)}
        />

        <Input
          placeholder='Senha'
          type="password"
          icon={FiLock}
          onChange={e => setPassword(e.target.value)}
        />

        <Button title="Entrar" onclick={handleSignIn} />

        <Link to="/register">
          Criar conta
        </Link>
      </Form>

      <Background />
    </Container>
  )
}