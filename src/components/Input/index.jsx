import { Container } from './styles'

export function Input({ icon: Icon, ...rest }) { /* é como se fosse um parse para usar o icon como o componente Icon */
  return (
    <Container>
      {Icon && <Icon size={20} />}
      <input {...rest} />
    </Container>
  )
}

