//arquivo para centralizar a criação do contexto
import { createContext, useContext, useState, useEffect } from 'react'
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

      //definindo o local storage, salvando o user e o password no navegador
      localStorage.setItem("@rocketnotes:user", JSON.stringify(user)) //transformou o json em string
      localStorage.setItem("@rocketnotes:token", token)

      //inserindo o token no cabeçalho de cada requisição do usuário
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`
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

  //signOut
  function signOut() {
    localStorage.removeItem("@rocketnotes:token")
    localStorage.removeItem("@rocketnotes:user")

    setData({})
  }

  //atualização do profile
  async function updateProfile({ user, avatarFile }) {
    try {
      //faz a verificação para enviar o avatar ao back-end
      if(avatarFile) {
        const fileUploadForm = new FormData()
        fileUploadForm.append("avatar", avatarFile)

        const response = await api.patch("/users/avatar", fileUploadForm)
        user.avatar = response.data.avatar
      }

      await api.put("/users", user)
      localStorage.setItem("@rocketnotes:user", JSON.stringify(user))

      setData({ user, token: data.token })
      alert("Perfil atualizado")
    }
    catch(error) {
      if(error.response) {
        alert(error.response.data.message)
      } else {
        alert("Não foi possível atualizar o perfil.")
      }
    }
  }

  //buscando as informações que ficaram salvas no navegador
  useEffect(() => {
    const token = localStorage.getItem("@rocketnotes:token")
    const user = localStorage.getItem("@rocketnotes:user")

    if(token && user) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`

      setData({
        token,
        user: JSON.parse(user)//transformando a string em json novamente
      })
    }

  }, [])

  return (
    <AuthContext.Provider value={{ 
      signIn, 
      signOut,
      updateProfile,
      user: data.user
    }}>
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