let id = $ref(0)

function getId() {
  return id++
}

export function useId() {
  return $$({
    getId
  })
}