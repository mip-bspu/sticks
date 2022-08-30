import { computed } from "vue"

let arrayItems = $ref([
    {
        name: "Навес",
        saw: 0,
        components: [{
            name: "Деталь 1",
            height: 6000,
            length: 30,
            width: 30,
            heightSelf: 1000,
            count: 4,
            inc: false
        },
        {
            name: "Деталь 2",
            height: 6000,
            length: 30,
            width: 60,
            heightSelf: 1000,
            count: 4,
            inc: true
        },
        {
            name: "Деталь 3",
            height: 6000,
            length: 30,
            width: 30,
            heightSelf: 500,
            count: 4,
            inc: true
        }]
    }
])

let chosenItem = $ref(null)

function area(item) {
    let s = $ref(0)

    if (item) {
        let comp = item.components
        for (var i in comp) {
            s += 2 * comp[i].heightSelf * (comp[i].length + comp[i].width) * comp[i].count
        }
    }
    return s / 1000
}

function countSticks(item) {
    let comp = item.components
    for (const i in comp) {
        if (Object.hasOwnProperty.call(object, key)) {
            const element = object[key];

        }
    }
}

let sPaint = computed(() => area(chosenItem))

export function useItems() {
    return $$({
        sPaint,
        arrayItems,
        chosenItem
    })
}