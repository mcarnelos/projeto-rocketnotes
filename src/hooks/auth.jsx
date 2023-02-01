//arquivo para centralizar a criação do contexto
import { createContext, useContext, useState } from 'react'
import { api } from '../services/api' //importando a api do back-end

export const AuthContext = createContext({})

//configurando o authContext
function AuthProvider({ children }) {
  const [data, setData] = useState({})
  //recebe o email e senha
  async function signIn({ email, password }) {
    //passando email e senha para o back-end
    try {
      const response = await api.post("/sessions", { email, password })
      const { user, token } = response.data
      //inserindo o token no cabeçalho de cada requisição do usuário
      api.defaults.headers.authorization = `Bearer ${token}`
      setData({ user, token })

      /* console.log(user, token) */
    } catch(error) {
      if(error.response) {
        alert(error.response.data.message)
      } else {
        alert("Não foi possível entrar.")
      }
    }
    
  }

  return (
    <AuthContext.Provider value={{ signIn, user: data.user }}>
      {children} {/* o children é o Routes que vem do main.js */}
    </AuthContext.Provider>

  )
}

//usando o contexto
function useAuth(){
  const context = useContext(AuthContext)

  return context
}

export { AuthProvider, useAuth }