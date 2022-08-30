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
    let groups = [{
        name: comp[0].length + "x" + comp[0].width,
        params: [{
            height: comp[0].height,
            heightSelf: comp[0].heightSelf,
            count: comp[0].count
        }]
    }]
    let elem = null
    let index = null

    for (var k in comp) {
        elem = groups.find((i) => {
            if (i.name === (comp[k].length + "x" + comp[k].width)) {
                return i
            } else {
                return null
            }
        })
        if (elem) {
            index = groups.indexOf(elem)
            groups[index].params.push({
                height: comp[k].height,
                heightSelf: comp[k].heightSelf,
                count: comp[k].count
            })
            elem = -1
        } else {
            groups.push({
                name: comp[k].length + "x" + comp[k].width,
                params: [{
                    height: comp[k].height,
                    heightSelf: comp[k].heightSelf,
                    count: comp[k].count
                }]
            })
        }
    }
    console.log(groups);

}

let sPaint = computed(() => area(chosenItem))
let cSticks = computed(() => countSticks(chosenItem))

export function useItems() {
    return $$({
        sPaint,
        arrayItems,
        chosenItem,
        cSticks
    })
}