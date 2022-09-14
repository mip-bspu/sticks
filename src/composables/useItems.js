import { computed, watch } from "vue"
import { useId } from "./useId"
import { useStore } from "./useStore"

let { getId } = $(useId())
let { store } = $(useStore())

let sticks = $ref(store.sticks)
let arrayItems = $ref(store.arrayItems)

watch(() => arrayItems, () => store.arrayItems = arrayItems, { deep: true, immediate: true })
watch(() => sticks, () => store.sticks = sticks, { deep: true, immediate: true })

let chosenItem = $ref(null)
let chosenStick = $ref(null);

function getLabel(key) {
  switch (key) {
    case "name":
      return "Название"
      break;
    case "stickId":
      return "Параметры трубы, мм	"
      break;
    case "heightSelf":
      return "Высота детали, мм	"
      break;
    case "count":
      return "Кол-во деталей"
      break;
  }
}

function useStick(s) {
  for (var item in arrayItems) {
    let check = arrayItems[item].components.find((c) => { if (c.stickId === s) { return true } else { return false } })

    if (check) {
      return true
    } else {
      return false
    }
  }

}

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

  return (bin)
}

function getType(c, el) {
  let types = {}

  for (const key in c) {
    types[key] = key == 'name' ? 'text' : 'number'
  }

  for (var key in types) {
    if (key === el)
      return types[key]
  }
}

function checkNumber(num, height) {
  switch (num) {
    case num < 0: {
      console.log("Параметр не может быть меньше 0");
      return "Параметр не может быть меньше 0"
    };
    // case num < height: {
    //   return ""
    // }
    case num === null: {
      console.log("Заполните поле");
      return "Заполните поле"
    }
  }
}

function checkName(name) {
  if (chosenItem.components.filter((c) => c.name === name).length > 1) {
    return "Деталь с таким названием уже существует"
  }
}

function getStick(component) {
  return sticks.find(s => s.id === component.stickId)
}

let sPaint = computed(() => calcArea(chosenItem))
let countSticks = computed(() => binPacking(chosenItem))
let errors = computed(() => {
  return chosenItem.components.reduce((acc, component, i) => {
    acc[i] = {};

    if (chosenItem.components.filter((c) => c.name === component.name).length > 1) {
      acc[i].name = "Деталь с таким названием уже существует"
    }

    if (component.heightSelf < 0) {
      acc[i].heightSelf = `Высота детали не может быть отрицательной`
    }

    if (component.heightSelf > getStick(component)?.height) {
      acc[i].heightSelf = `Высота детали должна быть не больше ${getStick(component)?.height}`
    }

    if (component.count < 0) {
      acc[i].count = "кол-во деталей не может быть отриц"
    }

    return acc
  }, {})
});

export function useItems() {
  return $$({
    sPaint,
    arrayItems,
    chosenItem,
    countSticks,
    errors,
    sticks,
    getType,
    chosenStick,
    getLabel,
    useStick
  })
}