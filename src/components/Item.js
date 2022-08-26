let item = $ref({
    name: "",
    saw: 0,
    component: {
        name: "",
        length: 0,
        heigth: 0,
        width: 0,
        count: 0,
        inc: false
    }
})

let arrayItems = $ref([
    {
        name: "Навес",
        saw: 0,
        component: [{
            name: "Деталь 1",
            heigth: 1000,
            length: 30,
            width: 30,
            count: 4,
            inc: false
        },
        {
            name: "Деталь 2",
            heigth: 1000,
            length: 30,
            width: 60,
            count: 4,
            inc: true
        }]
    }
])

export function getItem() {
    return $$({ item, arrayItems })
}