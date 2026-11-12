<script setup lang="ts">
import { computed, ref } from 'vue'
import usersData from '@/data/user.json'
import UserCard from '@/components/UserCard.vue'
import type {
  AgeFilter,
  GenderFilter,
  SortDirection,
  SortKey,
  SortState,
  User,
} from '@/types/user'
import { getVisibleUsers } from '@/utils/users'

const users = ref<User[]>(usersData as User[])

const genderFilter = ref<GenderFilter>('all')
const ageFilter = ref<AgeFilter>('all')
const sort = ref<SortState | null>(null)

const genderOptions: { value: GenderFilter; label: string }[] = [
  { value: 'all', label: 'Всі' },
  { value: 'male', label: 'Чоловіки' },
  { value: 'female', label: 'Жінки' },
]
const ageOptions: { value: AgeFilter; label: string }[] = [
  { value: 'all', label: 'Всі' },
  { value: 'adult', label: '18 +' },
]
const sortOptions: { key: SortKey; direction: SortDirection; label: string }[] = [
  { key: 'name', direction: 'asc', label: 'Ім’я ↑' },
  { key: 'name', direction: 'desc', label: 'Ім’я ↓' },
  { key: 'age', direction: 'asc', label: 'Вік ↑' },
  { key: 'age', direction: 'desc', label: 'Вік ↓' },
]

const visibleUsers = computed(() =>
  getVisibleUsers(users.value, genderFilter.value, ageFilter.value, sort.value),
)

const isDefaultState = computed(
  () => genderFilter.value === 'all' && ageFilter.value === 'all' && sort.value === null,
)

function isSortActive(key: SortKey, direction: SortDirection): boolean {
  return sort.value?.key === key && sort.value.direction === direction
}

function setSort(key: SortKey, direction: SortDirection): void {
  sort.value = { key, direction }
}

function resetAll(): void {
  genderFilter.value = 'all'
  ageFilter.value = 'all'
  sort.value = null
}
</script>

<template>
  <section class="users">
    <div
      class="toolbar"
      role="toolbar"
      aria-label="Фільтри та сортування"
    >
      <div class="toolbar__group">
        <span class="toolbar__label">Стать:</span>
        <button
          v-for="option in genderOptions"
          :key="option.value"
          type="button"
          class="btn"
          :class="{ 'btn--active': genderFilter === option.value }"
          :aria-pressed="genderFilter === option.value"
          @click="genderFilter = option.value"
        >
          {{ option.label }}
        </button>
      </div>

      <div class="toolbar__group">
        <span class="toolbar__label">Вік:</span>
        <button
          v-for="option in ageOptions"
          :key="option.value"
          type="button"
          class="btn"
          :class="{ 'btn--active': ageFilter === option.value }"
          :aria-pressed="ageFilter === option.value"
          @click="ageFilter = option.value"
        >
          {{ option.label }}
        </button>
      </div>

      <div class="toolbar__group">
        <span class="toolbar__label">Сортування:</span>
        <button
          v-for="option in sortOptions"
          :key="`${option.key}-${option.direction}`"
          type="button"
          class="btn"
          :class="{ 'btn--active': isSortActive(option.key, option.direction) }"
          :aria-pressed="isSortActive(option.key, option.direction)"
          @click="setSort(option.key, option.direction)"
        >
          {{ option.label }}
        </button>
      </div>

      <button
        type="button"
        class="btn btn--reset"
        :disabled="isDefaultState"
        @click="resetAll"
      >
        Очистити все
      </button>
    </div>

    <p class="users__count">
      Показано: {{ visibleUsers.length }} з {{ users.length }}
    </p>

    <ul
      v-if="visibleUsers.length > 0"
      class="users__list"
    >
      <li
        v-for="user in visibleUsers"
        :key="user.id"
        class="users__item"
      >
        <UserCard :user="user" />
      </li>
    </ul>
    <p
      v-else
      class="users__empty"
    >
      Список юзерів пустий
    </p>
  </section>
</template>

<style scoped>
.toolbar {
  display: flex;
  flex-wrap: wrap;
  gap: 12px 24px;
  align-items: center;
  margin-bottom: 12px;
  padding: 12px 16px;
  border-radius: 12px;
  background: #f4f4f5;
}
.toolbar__group {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  align-items: center;
}
.toolbar__label {
  font-size: 0.85rem;
  font-weight: 600;
  color: #52525b;
}
.users__count {
  margin: 0 0 12px;
  font-size: 0.85rem;
  color: #52525b;
}
.users__list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
  gap: 16px;
  margin: 0;
  padding: 0;
  list-style: none;
}
.users__empty {
  padding: 32px;
  border: 2px dashed #d4d4d8;
  border-radius: 12px;
  text-align: center;
  color: #71717a;
}
</style>
