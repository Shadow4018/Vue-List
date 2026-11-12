export type Gender = 'male' | 'female'

export interface UserName {
  title: string
  first: string
  last: string
}

export interface UserLocation {
  city: string
  state: string
  country: string
}

export interface UserDob {
  date: string
  age: number
}

export interface User {
  id: number
  gender: Gender
  name: UserName
  location: UserLocation
  email: string
  phone: string
  picture: string
  dob: UserDob
  hobbies: string[]
  details: string
}

export type GenderFilter = 'all' | Gender
export type AgeFilter = 'all' | 'adult'
export type SortKey = 'name' | 'age'
export type SortDirection = 'asc' | 'desc'

export interface SortState {
  key: SortKey
  direction: SortDirection
}

export type AgeGroup = 'minor' | 'young' | 'adult' | 'senior'
