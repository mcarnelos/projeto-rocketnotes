import { useState } from "react"//hook que cria um estado
import { Container, Form, Background } from './styles'
import { FiMail, FiLock, FiUser } from 'react-icons/fi'
import { Link, useNavigate } from 'react-router-dom'

import { api } from "../../services/api"//importando a api back-end

import { Input } from '../../components/Input'
import { Button } from '../../components/Button'


export function SignUp() {
  const [name, setName] = useState("") //definindo texto inicial vazio, e o name e a função que atualiza o name
  const [email, setEmail] = useState("") //definindo texto inicial vazio, e o email e a função que atualiza o email
  const [password, setPassword] = useState("") //definindo texto inicial vazio, e o password e a função que atualiza o password

  const navigate = useNavigate()

  function handleSignUp() {
    if(!name || !email || !password) {//verifica se todos os campos estão preenchidos
      return alert("Preencha todos os campos!")
    }

    api.post("/users", { name, email, password })//acessando a api e enviando os dados
    .then(() => { //caso de certo
      alert("Usuário cadastrado com sucesso!")
      navigate("/")//faz a navegação do usuário para a pagina inicial assim que cadastrar
    })
    .catch(error => {
      if(error.response) {
        alert(error.response.data.message)
      }else {
        alert("Não foi possível cadastrar")
      }
    }) //caso de errado
  }

  return (
    <Container>
      <Background />

      <Form>
        <h1>Rocket Notes</h1>
        <p>Aplicação para salvar e gerenciar seus links úteis.</p>

        <h2>Crie sua conta</h2>

        <Input
          placeholder='Nome'
          type="text"
          icon={FiUser}
          onChange={e => setName(e.target.value)} //pega o nome quando for alterado
        />

        <Input
          placeholder='E-mail'
          type="text"
          icon={FiMail}
          onChange={e => setEmail(e.target.value)} //pega o email quando for alterado
        />

        <Input
          placeholder='Senha'
          type="password"
          icon={FiLock}
          onChange={e => setPassword(e.target.value)} //pega o password quando for alterado
        />

        <Button title="Cadastrar" onClick={handleSignUp} />

        <Link to="/">
          Voltar para o login
        </Link>
      </Form>

    </Container>
  )
}