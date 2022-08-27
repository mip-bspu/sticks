let chosenItem = $ref(null)

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

export function getItem() {
    return $$({ arrayItems, chosenItem })
}