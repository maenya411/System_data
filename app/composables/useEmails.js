export const useEmails = () => {
  // Reactive emails array with localStorage persistence
  const emails = useState('emails', () => {
    if (process.client) {
      return JSON.parse(localStorage.getItem('emails')) || [
        { id:1, name:'John Doe', email:'john@gmail.com', dept:'IT', status:'Active' },
        { id:2, name:'Mary Kim', email:'mary@gmail.com', dept:'HR', status:'Inactive' },
        { id:3, name:'Peter Kip', email:'peter@gmail.com', dept:'Finance', status:'Exited' },
        { id:4, name:'Sarah Chep', email:'sarah@gmail.com', dept:'IT', status:'Active' },
        { id:5, name:'Alice Brown', email:'alice@gmail.com', dept:'Marketing', status:'Retired' },
      ]
    }
    return []
  })

  const saveEmails = () => {
    localStorage.setItem('emails', JSON.stringify(emails.value))
  }

  const addOrUpdateEmail = (email) => {
    const index = emails.value.findIndex(e => e.id === email.id)
    if (index !== -1) {
      emails.value[index] = email
    } else {
      emails.value.push({ ...email, id: Date.now() })
    }
    saveEmails()
  }

  const deleteEmail = (id) => {
    emails.value = emails.value.filter(e => e.id !== id)
    saveEmails()
  }

  return { emails, addOrUpdateEmail, deleteEmail }
}
