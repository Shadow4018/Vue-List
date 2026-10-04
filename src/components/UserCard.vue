<script setup lang="ts">
import { computed, ref } from 'vue'
import type { User } from '@/types/user'
import { getAgeGroup, getFullName } from '@/utils/users'

const props = defineProps<{
  user: User
}>()

const isDetailsVisible = ref(false)

const fullName = computed(() => getFullName(props.user))
const ageGroup = computed(() => getAgeGroup(props.user.dob.age))
const birthDate = computed(() =>
  new Date(props.user.dob.date).toLocaleDateString('uk-UA'),
)
const genderLabel = computed(() => (props.user.gender === 'male' ? 'Чоловік' : 'Жінка'))

function toggleDetails(): void {
  isDetailsVisible.value = !isDetailsVisible.value
}
</script>

<template>
  <article
    class="user-card"
    :class="{
      'user-card--minor': ageGroup === 'minor',
      'user-card--young': ageGroup === 'young',
      'user-card--adult': ageGroup === 'adult',
      'user-card--senior': ageGroup === 'senior',
    }"
  >
    <img
      class="user-card__photo"
      :src="user.picture"
      :alt="`Фото: ${user.name.first} ${user.name.last}`"
      width="96"
      height="96"
    >

    <div class="user-card__body">
      <h2 class="user-card__name">
        {{ user.name.title }} {{ fullName }}
      </h2>
      <p class="user-card__meta">
        {{ genderLabel }}
      </p>

      <!-- вік показуємо лише якщо він більше 18 років -->
      <p
        v-if="user.dob.age > 18"
        class="user-card__row"
      >
        <strong>Вік:</strong> {{ user.dob.age }} ({{ birthDate }})
      </p>

      <p class="user-card__row">
        <strong>Місце:</strong>
        {{ user.location.city }}, {{ user.location.state }}, {{ user.location.country }}
      </p>
      <p class="user-card__row">
        <strong>Email:</strong> <a :href="`mailto:${user.email}`">{{ user.email }}</a>
      </p>
      <p class="user-card__row">
        <strong>Телефон:</strong> {{ user.phone }}
      </p>

      <div class="user-card__row">
        <strong>Хобі:</strong>
        <ul class="user-card__hobbies">
          <li
            v-for="hobby in user.hobbies"
            :key="hobby"
            class="user-card__hobby"
          >
            {{ hobby }}
          </li>
        </ul>
      </div>

      <button
        type="button"
        class="btn btn--link"
        :aria-expanded="isDetailsVisible"
        @click="toggleDetails"
      >
        {{ isDetailsVisible ? 'Сховати деталі' : 'Показати деталі' }}
      </button>
      <p
        v-show="isDetailsVisible"
        class="user-card__details"
      >
        {{ user.details }}
      </p>
    </div>
  </article>
</template>

<style scoped>
.user-card {
  display: flex;
  gap: 16px;
  padding: 16px;
  border: 1px solid var(--card-border, #d4d4d8);
  border-left-width: 6px;
  border-radius: 12px;
  background: var(--card-bg, #fff);
  box-shadow: 0 1px 3px rgb(0 0 0 / 8%);
}

/* умовне фарбування за віковою групою */
.user-card--minor {
  --card-bg: #eff6ff;
  --card-border: #3b82f6;
}
.user-card--young {
  --card-bg: #f0fdf4;
  --card-border: #22c55e;
}
.user-card--adult {
  --card-bg: #fffbeb;
  --card-border: #f59e0b;
}
.user-card--senior {
  --card-bg: #faf5ff;
  --card-border: #a855f7;
}

.user-card__photo {
  flex-shrink: 0;
  width: 96px;
  height: 96px;
  border-radius: 50%;
  object-fit: cover;
}
.user-card__body {
  min-width: 0;
}
.user-card__name {
  margin: 0;
  font-size: 1.15rem;
}
.user-card__meta {
  margin: 2px 0 8px;
  color: #52525b;
  font-size: 0.85rem;
}
.user-card__row {
  margin: 4px 0;
  font-size: 0.92rem;
  overflow-wrap: anywhere;
}
.user-card__hobbies {
  display: inline-flex;
  flex-wrap: wrap;
  gap: 6px;
  margin: 0 0 0 6px;
  padding: 0;
  list-style: none;
  vertical-align: middle;
}
.user-card__hobby {
  padding: 1px 10px;
  border-radius: 999px;
  background: rgb(0 0 0 / 7%);
  font-size: 0.8rem;
}
.user-card__details {
  margin: 6px 0 0;
  font-size: 0.9rem;
  font-style: italic;
}
</style>
