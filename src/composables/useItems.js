import { computed } from "vue"
import { useId } from "./useId"

let { getId } = $(useId())

let sticks = $ref([
  {
    id: getId(),
    height: 6000,
    length: 30,
    width: 30
  },
  {
    id: getId(),
    height: 6000,
    length: 30,
    width: 60
  },
])

let arrayItems = $ref([
  {
    name: "Навес",
    saw: 1,
    components: [{
      name: "11",
      stickId: 0,
      heightSelf: 2000,
      count: 2,
    },
    {
      name: "22",
      stickId: 0,
      heightSelf: 1500,
      count: 2,
    },
    {
      name: "33",
      stickId: 0,
      heightSelf: 6000,
      count: 2,
    },
    {
      name: "44",
      stickId: 1,
      heightSelf: 2000,
      count: 3,
    }
    ]
  }
])

let chosenItem = $ref(arrayItems[0])

function calcArea(item) {
  let area = $ref(0)
  let stick = null

  if (item) {
    let comp = item.components
    for (var i in comp) {
      stick = sticks.find((o) => { if (o.id === comp[i].stickId) return o })
      area += 2 * comp[i].heightSelf * (stick.length + stick.width) * comp[i].count
    }

  }
  return (area / 1000000).toFixed(4)
}

function groupById(item, stick) {
  let group = item.components.filter((o) => stick === o.stickId).map((e) => JSON.parse(JSON.stringify(e)))

  group.forEach(el => {
    el.heightSelf += item.saw
  });

  return group
}

function getCountUsedSticks(item) {
  let arr = item.components.map((el) => el.stickId)

  return Array.from(new Set(arr));
}

function binPacking(item) {
  let sumHeight = 0
  let bin = []
  let group = null
  let check = null
  let f = false

  let detail = null
  let index = null

  let count = getCountUsedSticks(item)
  for (let i = 0; i < count.length; i++) {
    group = groupById(item, count[i])

    if (group?.length) {

      let stick = sticks.find((o) => o.id === count[i])
      bin.push({ stickObj: stick, sticks: [{ details: [], tail: stick.height }] })

      for (var j in group) {
        for (let l = 0; l < group[j].count; l++) {
          for (var k in bin[i].sticks) {
            check = bin[i].sticks[k].tail - group[j].heightSelf

            if (check >= 0 || -check <= item.saw) {
              check - item.saw <= 0 ? group[j].heightSelf -= item.saw : group[j].heightSelf

              detail = bin[i].sticks[k].details.find((d) => {
                if (d.name === group[j].name) {
                  return d
                } else {
                  return null
                }
              })

              if (detail) {
                index = bin[i].sticks[k].details.indexOf(detail)
                bin[i].sticks[k].details[index].countInStick++
              } else {
                bin[i].sticks[k].details.push({
                  ...group[j],
                  countInStick: 1
                })
              }

              detail = null

              sumHeight = bin[i].sticks[k].details.reduce(function (sum, elem) {
                return sum + elem.heightSelf * elem.countInStick;
              }, 0);
              bin[i].sticks[k].tail = stick.height - sumHeight
              f = true
              bin[i].sticks.sort((a, b) => a.tail - b.tail)
              break
            }
          }

          if (!f) {
            if (group[j].heightSelf - item.saw === stick.height) {
              group[j].heightSelf -= item.saw
            }
            bin[i].sticks.push({
              details: [{
                ...group[j],
                countInStick: 1
              }],
              tail: stick.height - group[j].heightSelf
            })
            bin[i].sticks.sort((a, b) => a.tail - b.tail)
          }
          f = false
        }
      }
    }
  }

  console.log(bin);
  return (bin)
}

//!
function checkFields(components) {
  let msg = null
  let check = {}

  for (var i in components) {
    for (var k in components[i]) {
      if (isNaN(components[i][k])) {
        msg = checkName(components[i][k])
        if (msg) {
          check[i] = { k: msg }
        }
      } else {

      }
    }
  }
}

function checkNumber(num, height) {
  switch (num) {
    case num < 0: {
      return ""
    };
    case num < height: {
      return ""
    }
    case num === null: {
      return ""
    }
  }
}

function checkName(name) {
  if (chosenItem.components.find((c) => c.name === name)) {
    return "Деталь с таким названием уже существует"
  }
}

let sPaint = computed(() => calcArea(chosenItem))
let countSticks = computed(() => binPacking(chosenItem))
let errors = computed(() => checkFields(chosenItem.components));

export function useItems() {
  return $$({
    sPaint,
    arrayItems,
    chosenItem,
    countSticks,
    errors,
    sticks
  })
}