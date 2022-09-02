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

    return groups
}

function binPacking(item) {
    let sumHeight
    let f = false
    let bin = []

    let arrGroups = breakIntoGroups(item)

    for (var i in arrGroups) {
        bin.push({ name: arrGroups[i].name, stick: [{ details: [], tail: arrGroups[i].params[0].height }] })
        for (var j in arrGroups[i].params) {
            for (let l = 0; l < arrGroups[i].params[j].count; l++) {
                for (var k in bin[i].stick) {
                    if (bin[i].stick[k].tail - arrGroups[i].params[j].heightSelf >= 0) {
                        bin[i].stick[k].details.push(arrGroups[i].params[j].heightSelf)
                        sumHeight = bin[i].stick[k].details.reduce(function (sum, elem) {
                            return sum + elem;
                        }, 0);
                        bin[i].stick[k].tail = arrGroups[i].params[0].height - sumHeight
                        f = true
                        bin[i].stick.sort((a, b) => a.tail - b.tail)
                        break
                    }
                }
                if (!f) {
                    bin[i].stick.push({
                        details: [arrGroups[i].params[j].heightSelf],
                        tail: arrGroups[i].params[0].height - arrGroups[i].params[j].heightSelf
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