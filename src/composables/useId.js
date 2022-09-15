import { useStore } from "./useStore";
import { watch } from "vue"

let { store } = $(useStore())
let id = $ref(store.stickId)

function getId() {
  return id++
}

watch(() => id, () => store.stickId = id, { deep: true, immediate: true })

export function useId() {
  return $$({
    getId
  })
}