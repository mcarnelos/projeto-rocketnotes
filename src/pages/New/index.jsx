import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Header } from '../../components/Header'
import { Input } from '../../components/Input'
import { Textarea } from '../../components/Textarea'
import { NoteItem } from '../../components/NoteItem'
import { Section } from '../../components/Section'
import { Button } from '../../components/Button'
import { ButtonText } from '../../components/ButtonText'
import { api } from '../../services/api'

import { Container, Form } from "./styles"

export function New() {
  const [title, setTitle] = useState("") //estado do title
  const [description, setDescription] = useState("") //estado da descrição

  const [links, setLinks] = useState([]) //estado dos links já existentes
  const [newLink, setNewLink] = useState("") //estado dos novos links

  const [tags, setTags] = useState([]) //estado dos tags já existentes
  const [newTag, setNewTag] = useState("") //estado dos novos tags

  const navigate = useNavigate()

  function handleBack() {
    navigate(-1)
  }

  //função para adicionar links
  function handleAddLink() {
    setLinks(prevState => [...prevState, newLink])//mantém o link que já existia e adiciona um novo
    setNewLink("")
  }

  //função para remover links
  function handleRemoveLink(deleted) {
    setLinks(prevState => prevState.filter(link => link !== deleted)) //retorna uma nova lista de links menos o que eu estou deletando
  }

  //função para adicionar tags
  function handleAddTag() {
    setTags(prevState => [...prevState, newTag])//mantém o link que já existia e adiciona um novo
    setNewTag("") //limpa o texto após add uma tag
  }

  //função para remover tags
  function handleRemoveTag(deleted) {
    setTags(prevState => prevState.filter(tag => tag !== deleted)) //retorna uma nova lista de tags menos o que eu estou deletando
  }

  //função para add notas usando a api
  async function handleNewNote() {
    //verifica se o título está vazio
    if(!title) {
      return alert("Digite o título da nota")
    }

    //verifica se foi digitado e não foi adicionado
    if(newLink) {
      return alert("Você deixou um link no campo para adicionar, mas não clicou em adicionar. Clique para adicionar ou deixe o campo vazio")
    }

    if(newTag) {
      return alert("Você deixou uma tag no campo para adicionar, mas não clicou em adicionar. Clique para adicionar ou deixe o campo vazio")
    }

    await api.post("/notes", {
      title,
      description,
      tags,
      links
    })

    alert("Nota criada com sucesso!")
    navigate(-1)//após o cadastro direciona para a home
  }


  return (
    <Container>
      <Header />

      <main>
        <Form>
          <header>
            <h1>Criar nota</h1>
            <ButtonText 
              title="Voltar" 
              onClick={handleBack} />
          </header>

          <Input 
            placeholder="Título" 
            onChange={e => setTitle(e.target.value)}
          />
          <Textarea 
            placeholder="Observações"
            onChange={e => setDescription(e.target.value)}
          />

          <Section title="Links úteis">
            {
              links.map((link, index) => (
                <NoteItem 
                  key={String(index)}
                  value={link}
                  onClick={() => handleRemoveLink(link)}
                />
              ))
            }
            <NoteItem 
              isNew
              placeholder="Novo link"
              value={newLink}
              onChange={e => setNewLink(e.target.value)}
              onClick={handleAddLink} 
            />
          </Section>

          <Section title="Marcadores">
            <div className='tags'>
              {
                tags.map((tag, index) => (
                  <NoteItem 
                    key={String(index)}  
                    value={tag}
                    onClick={() => handleRemoveTag(tag)} 
                  />
                ))
              }
              
              <NoteItem 
                isNew 
                placeholder='Nova tag'
                value={newTag}
                onChange={e => setNewTag(e.target.value)}
                onClick={handleAddTag} 
              />
            </div>
          </Section>

          <Button 
            title="Salvar" 
            onClick={handleNewNote}
          />
        </Form>
      </main>
    </Container>
  )
}