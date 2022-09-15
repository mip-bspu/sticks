import { watch } from "vue"
import { useId } from "./useId"
let { getId } = $(useId())

let key = "sticks";

let defaultV = $ref({ arrayItems: [], sticks: [] })
let store = $ref(JSON.parse(localStorage.getItem(key) || JSON.stringify(defaultV)))

watch(() => store, save, { deep: true, immediate: true })

function save(store) {
  localStorage.setItem(key, JSON.stringify(store))
}

function read() {
  Object.assign(store, JSON.parse(localStorage.getItem(key) || store))
}

read()

export function useStore() {
  return $$({
    store
  })
}