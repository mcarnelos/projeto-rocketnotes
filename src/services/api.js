//configurando o acesso ao backend
import axios from "axios"

export const api = axios.create({
  baseURL: 'https://api-rocketnotes-l0mo.onrender.com' //url básica para acessar o back-end
})