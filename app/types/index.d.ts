interface User {
  id: string
  email: string
  sex: string
  firstname: string
  lastname: string
  bio: string
  birthday: string
  city: string
  pictureUrl: string | null
  createdAt: string
}

interface Event {
  id: string
  title: string
  location: string
  date: string
  category: string
  createdAt: string
  participantMax: number
  guests: User[]
  host: User
}
