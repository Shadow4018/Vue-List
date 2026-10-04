import type {
  AgeFilter,
  AgeGroup,
  GenderFilter,
  SortState,
  User,
} from '@/types/user'

export const ADULT_AGE = 18

/** До 18 — minor, 18–30 — young, 31–50 — adult, понад 50 — senior. */
export function getAgeGroup(age: number): AgeGroup {
  if (age < 18) return 'minor'
  if (age <= 30) return 'young'
  if (age <= 50) return 'adult'
  return 'senior'
}

export function getFullName(user: User): string {
  return `${user.name.first} ${user.name.last}`
}

export function filterUsers(
  users: readonly User[],
  gender: GenderFilter,
  age: AgeFilter,
): User[] {
  return users.filter(
    (user) =>
      (gender === 'all' || user.gender === gender) &&
      (age === 'all' || user.dob.age >= ADULT_AGE),
  )
}

/** Повертає нову відсортований масив, не мутуючи вхідний. */
export function sortUsers(users: readonly User[], sort: SortState | null): User[] {
  const copy = [...users]
  if (!sort) return copy
  const factor = sort.direction === 'asc' ? 1 : -1
  return copy.sort((a, b) =>
    sort.key === 'name'
      ? factor * getFullName(a).localeCompare(getFullName(b), 'uk')
      : factor * (a.dob.age - b.dob.age),
  )
}

/** Спершу фільтрація, потім сортування — тому сортування не ламає фільтри. */
export function getVisibleUsers(
  users: readonly User[],
  gender: GenderFilter,
  age: AgeFilter,
  sort: SortState | null,
): User[] {
  return sortUsers(filterUsers(users, gender, age), sort)
}
