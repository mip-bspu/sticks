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

        comp[i].height === comp[i].heightSelf ? comp[i].heightSelf : comp[i].heightSelf += item.saw

        if (group) {
            index = groups.indexOf(group)
            groups[index].components.push(comp[i])
            group = null
        } else {
            groups.push({
                name: comp[i].length + "x" + comp[i].width + "x" + comp[i].height,
                components: [comp[i]]
            })
        }
    }

    console.log(groups);
    return groups
}

function binPacking(item) {
    let sumHeight = 0
    let f = false
    let bin = []

    let groups = breakIntoGroups(item)

    for (var i in groups) {
        bin.push({ name: groups[i].name, stick: [{ details: [], tail: groups[i].components[0].height }] })
        for (var j in groups[i].components) {
            for (let l = 0; l < groups[i].components[j].count; l++) {
                for (var k in bin[i].stick) {
                    if (bin[i].stick[k].tail - groups[i].components[j].heightSelf >= 0) {
                        bin[i].stick[k].details.push(groups[i].components[j])
                        sumHeight = bin[i].stick[k].details.reduce(function (sum, elem) {
                            return sum + elem.heightSelf;
                        }, 0);
                        bin[i].stick[k].tail = groups[i].components[0].height - sumHeight
                        f = true
                        bin[i].stick.sort((a, b) => a.tail - b.tail)
                        break
                    }
                }
                if (!f) {
                    bin[i].stick.push({
                        details: [groups[i].components[j]],
                        tail: groups[i].components[0].height - groups[i].components[j].heightSelf
                    })
                    bin[i].stick.sort((a, b) => a.tail - b.tail)
                }
                f = false
            }
        }
    }

    console.log(bin);
    return bin
}

function findTail(d, arraySticks) {
    return arraySticks.find((i) => {
        if (i.stick === (d.length + "x" + d.width + "x" + d.height) && d.height !== d.heightSelf)
            return i
    })
}

let sPaint = computed(() => calcArea(chosenItem))
let countSticks = computed(() => binPacking(chosenItem))

export function useItems() {
    return $$({
        sPaint,
        arrayItems,
        chosenItem,
        countSticks,
        findTail
    })
}