<script lang="ts" setup>
import { computed, ref } from 'vue'

interface Note {
  id: string
  slug: string
  body: string
  data: Record<string, any>
  collection: string
  render: any
}

const props = withDefaults(defineProps<{
  list: Note[]
}>(), {
  list: () => [],
})

const searchQuery = ref('')
const selectedTags = ref(new Set<string>())
const showAllTags = ref(false)
const INITIAL_TAGS_COUNT = 5

function getDate(date: string) {
  return new Date(date).toISOString()
}

function getHref(note: Note) {
  if (note.data.redirect)
    return note.data.redirect
  return `/posts/${note.slug.split('/')[1]}`
}

function getTarget(note: Note) {
  if (note.data.redirect)
    return '_blank'
  return '_self'
}

function isSameYear(a: Date | string | number, b: Date | string | number) {
  return a && b && getYear(a) === getYear(b)
}

function getYear(date: Date | string | number) {
  return new Date(date).getFullYear()
}

// Get all tags sorted by frequency
const allTagsByFrequency = computed(() => {
  const tagCount = new Map<string, number>()

  props.list.forEach((note) => {
    if (note.data.tags && Array.isArray(note.data.tags)) {
      note.data.tags.forEach((tag: string) => {
        tagCount.set(tag, (tagCount.get(tag) || 0) + 1)
      })
    }
  })

  // Convert to array and sort by frequency (descending)
  return Array.from(tagCount.entries())
    .sort((a, b) => b[1] - a[1])
    .map(([tag, count]) => ({ tag, count }))
})

// Display only a limited number of tags initially
const displayedTags = computed(() => {
  if (showAllTags.value) {
    return allTagsByFrequency.value
  }
  return allTagsByFrequency.value.slice(0, INITIAL_TAGS_COUNT)
})

const filteredList = computed(() => {
  if (!selectedTags.value.size)
    return props.list

  return props.list.filter(note =>
    Array.isArray(note.data.tags)
    && note.data.tags.some((tag: string) => selectedTags.value.has(tag)),
  )
})

// Group all notes by the 'group' property
const allGroupedNotes = computed(() => {
  const groups = new Map<string, Note[]>()

  filteredList.value.forEach((note) => {
    const groupKey = note.data.group || 'Uncategorized'
    if (!groups.has(groupKey)) {
      groups.set(groupKey, [])
    }
    groups.get(groupKey)!.push(note)
  })

  // Convert to array and sort groups
  return Array.from(groups.entries()).sort((a, b) => a[0].localeCompare(b[0]))
})

// Filter groups based on search query
const groupedNotes = computed(() => {
  const query = searchQuery.value.trim().toLowerCase()

  if (!query) {
    return allGroupedNotes.value
  }

  return allGroupedNotes.value.filter(([groupName]) =>
    groupName.toLowerCase().includes(query),
  )
})

function clearSearch() {
  searchQuery.value = ''
}

function toggleTag(tag: string) {
  if (selectedTags.value.has(tag)) {
    selectedTags.value.delete(tag)
  }
  else {
    selectedTags.value.add(tag)
  }
  // Reset search when selecting a tag
  searchQuery.value = ''
}

function clearFilters() {
  selectedTags.value.clear()
  searchQuery.value = ''
}

function toggleShowAllTags() {
  showAllTags.value = !showAllTags.value
}
</script>

<template>
  <div>
    <!-- Tag Filters -->
    <div v-if="allTagsByFrequency.length > 0" mb-6>
      <div flex="~ wrap gap-2 items-center">
        <span text-sm opacity-70 mr-2>Filter by tag:</span>
        <button
          v-for="{ tag, count } in displayedTags"
          :key="tag"
          text-xs px-3 py-1.5 rounded-full
          transition-colors cursor-pointer border-none
          :class="selectedTags.has(tag)
            ? 'dark:bg-purple-600 bg-purple-400 text-white'
            : 'dark:bg-purple-950 bg-purple-200 hover:dark:bg-purple-900 hover:bg-purple-300'"
          @click="toggleTag(tag)"
        >
          {{ tag }} <span opacity-70>({{ count }})</span>
        </button>
        <button
          v-if="allTagsByFrequency.length > INITIAL_TAGS_COUNT"
          text-xs px-3 py-1.5 rounded-full
          dark:bg-gray-700 bg-gray-300 hover:dark:bg-gray-600 hover:bg-gray-400
          transition-colors cursor-pointer border-none
          @click="toggleShowAllTags"
        >
          {{ showAllTags ? 'Show less' : `Show ${allTagsByFrequency.length - INITIAL_TAGS_COUNT} more` }}
        </button>
        <button
          v-if="selectedTags.size > 0"
          text-xs px-3 py-1.5 rounded-full
          dark:bg-transparent bg-red-300 border-solid border-2 dark:border-purple-500 dark:border-opacity-50
          hover:border-opacity-80 transition-colors cursor-pointer
          @click="clearFilters"
        >
          Clear filter
        </button>
      </div>
    </div>

    <!-- Search Bar -->
    <div mb-8>
      <div flex="~ gap-2 items-center" max-w-md>
        <div flex-1 relative>
          <i absolute left-3 top="1/2" translate-y="-1/2" i-ri-search-line opacity-50 />
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search by group name..."
            pl-10 pr-10 py-2 w-full rounded-lg
            border border-purple-300 dark:border-purple-600
            dark:border-opacity-50
            bg-transparent
            focus:outline-none focus:ring-2 focus:ring-purple-500
            focus:ring-opacity-50
            :disabled="selectedTags.size > 0"
          >
          <button
            v-if="searchQuery"
            absolute right-3 top="1/2" translate-y="-1/2"
            i-ri-close-line opacity-50 hover:opacity-100
            cursor-pointer transition-opacity bg-transparent border-none
            type="button"
            @click="clearSearch"
          />
        </div>
      </div>
      <div v-if="searchQuery" mt-2 text-sm opacity-70>
        Showing {{ groupedNotes.length }} of {{ allGroupedNotes.length }} groups
      </div>
      <div v-if="selectedTags.size > 0" mt-2 text-sm opacity-70>
        Filtering by tags: <span font-semibold>{{ [...selectedTags].join(', ') }}</span>
      </div>
    </div>

    <!-- Notes List -->
    <div sm:min-h-38 min-h-28 mb-18>
      <template v-if="groupedNotes.length === 0">
        <div my-12 opacity-50>
          {{ searchQuery ? `No groups found matching "${searchQuery}"` : 'nothing here yet.' }}
        </div>
      </template>

      <!-- Grouped Notes -->
      <div v-for="[groupName, notes] in groupedNotes" :key="groupName" mb-12>
        <!-- Group Header -->
        <div mb-6 pb-2 border-b border-gray-200 dark:border-gray-700>
          <h2 text-2xl font-bold opacity-90>
            {{ groupName }}
          </h2>
          <span text-sm opacity-50>{{ notes.length }} {{ notes.length === 1 ? 'note' : 'notes' }}</span>
        </div>

        <!-- Notes in Group -->
        <ul>
          <li v-for="(note, index) in notes" :key="note.data.title" mb-8>
            <div v-if="!isSameYear(note.data.date, notes[index - 1]?.data.date)" select-none relative h18 pointer-events-none>
              <span text-7em color-transparent font-bold text-stroke-2 text-stroke-hex-aaa op14 absolute top--0.2em>
                {{ getYear(note.data.date) }}
              </span>
            </div>
            <a text-lg lh-tight nav-link flex="~ col gap-2" :aria-label="note.data.title" :target="getTarget(note)" :href="getHref(note)">
              <div flex="~ col md:row gap-2 md:items-center">
                <div flex="~ gap-2 items-center text-wrap">
                  <span lh-normal>
                    <i v-if="note.data.draft" text-base vertical-mid i-ri-draft-line />
                    {{ note.data.title }}
                  </span>
                </div>
                <div opacity-50 text-sm ws-nowrap flex="~ gap-2 items-center">
                  <i v-if="note.data.redirect" text-base i-ri-external-link-line />
                  <i v-if="note.data.recording || note.data.video" text-base i-ri:film-line />
                  <time v-if="note.data.date" :datetime="getDate(note.data.date)">{{ note.data.date.split(',')[0] }}</time>
                  <span v-if="note.data.duration">· {{ note.data.duration }}</span>
                  <span v-if="note.data.lang && note.data.lang.includes('zh')">· 中文</span>
                </div>
              </div>
              <div opacity-50 text-sm>{{ note.data.description }}</div>
              <div>
                <template v-if="note.data.tags && note.data.tags.length > 0">
                  <span
                    v-for="tag in note.data.tags"
                    :key="tag"
                    text-xs px-2 py-1 mr-1 rounded-full
                    inline-block transition-colors cursor-pointer
                    :class="selectedTags.has(tag)
                      ? 'dark:bg-purple-600 bg-purple-400 text-white'
                      : 'dark:bg-purple-950 bg-purple-200 hover:dark:bg-purple-900 hover:bg-purple-300'"
                    @click.prevent="toggleTag(tag)"
                  >
                    {{ tag }}
                  </span>
                </template>
              </div>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
