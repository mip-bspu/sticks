import { computed } from "vue"

let arrayItems = $ref([
    {
        name: "Навес",
        saw: 0,
        components: [{
            name: "Деталь 1",
            height: 1000,
            length: 30,
            width: 30,
            count: 4,
            inc: false
        },
        {
            name: "Деталь 2",
            height: 1000,
            length: 30,
            width: 60,
            count: 4,
            inc: true
        }]
    }
])

let chosenItem = $ref(null)

function area(item) {
    let s = $ref(0)

    if (item) {
        let c = item.components
        for (var i in c) {
            s += 2 * c[i].height * (c[i].length + c[i].width) * c[i].count
        }
    }
    return s / 1000
}

let sPaint = computed(() => area(chosenItem))

export function useItems() {
    return $$({
        sPaint,
        arrayItems,
        chosenItem
    })
}