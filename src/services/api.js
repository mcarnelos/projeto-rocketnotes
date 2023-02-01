//configurando o acesso ao backend
import axios from "axios"

export const api = axios.create({
  baseURL: 'http://localhost:3333' //url básica para acessar o back-end
})