import { computed } from "vue"

let arrayItems = $ref([
    {
        name: "Навес",
        saw: 3,
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
    let groups = []
    let elem = null
    let index = null

    let sumHeight = 0
    let sumCount = 0
    let tail = 0
    let count = 0

    let arrSticks = []

    for (var k in comp) {
        elem = groups.find((i) => {
            if (i.name === (comp[k].length + "x" + comp[k].width + "x" + comp[k].height)) {
                return i
            } else {
                return null
            }
        })
        if (elem) {
            index = groups.indexOf(elem)
            groups[index].params.push({
                height: comp[k].height,
                heightSelf: comp[k].heightSelf + item.saw,
                count: comp[k].count
            })
            elem = null
        } else {
            groups.push({
                name: comp[k].length + "x" + comp[k].width + "x" + comp[k].height,
                params: [{
                    height: comp[k].height,
                    heightSelf: comp[k].heightSelf + item.saw,
                    count: comp[k].count
                }]
            })
        }
    }
    console.log(groups);

    for (var i in groups) {
        for (var j in groups[i].params) {
            sumHeight += groups[i].params[j].heightSelf * groups[i].params[j].count
        }
        console.log(sumHeight);

        if (sumHeight % groups[i].params[j].height > 0) {
            count += Math.trunc(sumHeight / groups[i].params[j].height) + 1
            tail += sumHeight % groups[i].params[j].height
        } else {
            count += (sumHeight / groups[i].params[j].height)
        }

        arrSticks.push({ stick: comp[k].length + "x" + comp[k].width + "x" + comp[k].height, count: count })
        sumHeight = 0
        count = 0
    }
    console.log(arrSticks);
    return arrSticks
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