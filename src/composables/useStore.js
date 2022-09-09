import { watch } from "vue"

let key = "sticks";

let store = $ref({
  arrayItems: [],
  sticks: []
})

// test:
store.sticks = [
  {
    id: 0,
    height: 6000,
    length: 30,
    width: 30
  },
  {
    id: 1,
    height: 6000,
    length: 30,
    width: 60
  },
]

store.arrayItems = [
  {
    name: "Навес",
    saw: 1,
    components: [{
      name: "det1",
      stickId: 0,
      heightSelf: 2000,
      count: 2,
    },
    {
      name: "det2",
      stickId: 0,
      heightSelf: 1500,
      count: 2,
    },
    {
      name: "det3",
      stickId: 0,
      heightSelf: 6000,
      count: 2,
    },
    {
      name: "det4",
      stickId: 1,
      heightSelf: 2000,
      count: 3,
    }
    ]
  }
]

watch(() => store, save, { deep: true, immediate: true })

function save(store) {
  localStorage.setItem(key, JSON.stringify(store))
}

function read() {
  let v = localStorage.getItem(key) || "{}"
  Object.assign(store, JSON.parse(v))
}

read()

export function useStore() {
  return $$({
    store
  })
}