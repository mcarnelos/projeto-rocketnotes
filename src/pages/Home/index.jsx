import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { FiPlus } from 'react-icons/fi' /* importando ícones + e lupa*/
import { Container, Brand, Menu, Search, Content, NewNote } from './styles'
import { api } from '../../services/api'

import { Header } from '../../components/Header'
import { Input } from '../../components/Input'
import { Note } from '../../components/Note'
import { Section } from '../../components/Section'
import { ButtonText} from '../../components/ButtonText'

export function Home() {
  const [search, setSearch] = useState("") //estado que guarda a pesquisa
  const [tags, setTags] = useState([])//estado que guarda as tags
  const [tagsSelected, setTagsSelected] = useState([]) //estado que guarda qual a tag que está selecionada
  const [notes, setNotes] = useState([]) //estado que guarda as notas

  const navigate = useNavigate()
  
  //função para lidar com a tag
  function handleTagSelected(tagName) {
    if(tagName === "all") {//verifica se clicou em todos e desmarca o restante
      return setTagsSelected([])
    }

    const alreadySelected = tagsSelected.includes(tagName) //verifica se a tag já está selecionada
    
    //verifica se a tag ja está marcada e desmarca ao clicar novamente
    if(alreadySelected) {
      const filteredTags = tagsSelected.filter(tag => tag !== tagName)
      setTagsSelected(filteredTags)
    
    } else {
      setTagsSelected(prevState => [...prevState, tagName])//mantém a seleção anterior
    }
  }

  //função que direciona para a página de detalhes da nota
  function handleDetails(id) {
    navigate(`/details/${id}`)
  }

  //busca pelas tags
  useEffect(() => {
    async function fetchTags() {
      const response = await api.get("/tags")
      setTags(response.data)
    }

    fetchTags()
  }, [])

  //busca pelas notas
  useEffect(() => {
    async function fetchNotes() {
      const response = await api.get(`/notes?title=${search}&tags=${tagsSelected}`)//envia através de uma query para o /notes
      setNotes(response.data)
    }
    fetchNotes()
  }, [tagsSelected, search])
  

  return (
    <Container>
      <Brand>
        <h1>Rocketnotes</h1>
      </Brand>

      <Header />
      
      <Menu>
      <li>
        <ButtonText 
          title="Todos" 
          onClick={() => handleTagSelected("all")}
          isActive={tagsSelected.length === 0}//verifica se está vazio
        />
      </li>
        {
          tags && tags.map(tag => (
            <li key={String(tag.id)}>
              <ButtonText 
                title={tag.name}
                onClick={() => handleTagSelected(tag.name)}
                isActive={tagsSelected.includes(tag.name)}//verifica se está vazio
              />
            </li>
          )) //verifica se existe tags e percorre elas
          
        }
        
      </Menu>

      <Search>
        <Input 
          placeholder="Pesquisar pelo título" 
          onChange={(e) => setSearch(e.target.value)} //pega os dados do search  
        />
      </Search>

      <Content>
        <Section title="Minhas notas">
          {
            notes.map(note =>(
              <Note 
                key={String(note.id)}
                data={note}
                onClick={() => handleDetails(note.id)}
              />
            ))
          }  

        </Section>
      </Content>

      <NewNote to='/new'>
        <FiPlus />
        Criar nota
      </NewNote>
    </Container>
  )
}