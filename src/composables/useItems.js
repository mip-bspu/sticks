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
        },
        {
            name: "Деталь 2",
            height: 6000,
            length: 30,
            width: 60,
            heightSelf: 1000,
            count: 4,
        },
        {
            name: "Деталь 3",
            height: 6000,
            length: 30,
            width: 30,
            heightSelf: 500,
            count: 4,
        },
        {
            name: "Деталь 4",
            height: 500,
            length: 30,
            width: 60,
            heightSelf: 500,
            count: 1,
        },]
    }
])

let chosenItem = $ref(arrayItems[0])

function calcArea(item) {
    let s = $ref(0)

    if (item) {
        let comp = item.components
        for (var i in comp) {
            s += 2 * comp[i].heightSelf * (comp[i].length + comp[i].width) * comp[i].count
        }
    }
    return s / 1000
}

function breakIntoGroups(item) {
    let comp = item.components
    let groups = []
    let group = null
    let index = null
    let heightSelf = 0

    for (var i in comp) {
        group = groups.find((g) => {
            if (g.name === (comp[i].length + "x" + comp[i].width + "x" + comp[i].height)) {
                return g
            } else {
                return null
            }
        })

        comp[i].height === comp[i].heightSelf ? heightSelf = comp[i].heightSelf : heightSelf = comp[i].heightSelf + item.saw

        if (group) {
            index = groups.indexOf(group)
            groups[index].params.push({
                height: comp[i].height,
                heightSelf: heightSelf,
                count: comp[i].count
            })
            group = null
        } else {
            groups.push({
                name: comp[i].length + "x" + comp[i].width + "x" + comp[i].height,
                params: [{
                    height: comp[i].height,
                    heightSelf: heightSelf,
                    count: comp[i].count
                }]
            })
        }
    }

    console.log(groups);
    return groups
}

function countSticks(item) {
    let sumHeight = 0
    let tail = 0
    let count = 0

    let arrSticks = []

    let groups = breakIntoGroups(item)

    for (var i in groups) {

        for (var j in groups[i].params) {
            sumHeight += groups[i].params[j].heightSelf * groups[i].params[j].count
        }

        if (sumHeight % groups[i].params[j].height > 0) {
            count += Math.trunc(sumHeight / groups[i].params[j].height) + 1
            tail += sumHeight % groups[i].params[j].height
        } else {
            count += Math.trunc(sumHeight / groups[i].params[j].height)
        }

        tail / groups[i].params[j].count <= item.saw ? tail = 0 : tail = groups[i].params[j].height - tail

        arrSticks.push({ stick: groups[i].name, count: count, tail: tail })

        sumHeight = 0
        count = 0
        tail = 0
    }
    console.log(arrSticks);
    return arrSticks
}

function findTail(d, arraySticks) {
    return arraySticks.find((i) => {
        if (i.stick === (d.length + "x" + d.width + "x" + d.height) && d.height !== d.heightSelf)
            return i
    })
}

let sPaint = computed(() => calcArea(chosenItem))
let cSticks = computed(() => countSticks(chosenItem))

export function useItems() {
    return $$({
        sPaint,
        arrayItems,
        chosenItem,
        cSticks,
        findTail
    })
}