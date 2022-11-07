export const inviteEmailContent = {
  from: "AceleraMais <aceleradorametodosageis@gmail.com>",
  subject: "AceleraMais: Convite para mentora avaliadora!",
  content: (user) => {
    const { name, password } = user

    return `
    Olá ${name},
    Seja Bem vindo ao Movie Tracker.
    Senha gerada: ${password}
    `
  },
}

