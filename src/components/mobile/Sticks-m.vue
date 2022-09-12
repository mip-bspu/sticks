<script setup>
import { useItems } from "../../composables/useItems";
import { useId } from "../../composables/useId";

let { getId } = $(useId());
let { sticks } = $(useItems());

let eHeight = $ref(null);
let eLength = $ref(null);
let eWidth = $ref(null);

function addStick() {
  sticks.push({
    id: getId(),
    height: eHeight,
    length: eLength,
    width: eWidth,
  });

  eHeight = eLength = eWidth = null;
}

function deleteStick(s) {
  sticks.splice(sticks.indexOf(s), 1);
}
</script>
  
  <template>
  <div class="card">
    <div class="dropdown">
      <div class="dropbtn"><button>+</button></div>
      <div class="dropdown-content">
        <div class="newStick">
          <label><span>Высота, мм</span></label>
          <input type="number" v-model="eHeight" class="number" />
          <label><span>Длина, мм</span></label>
          <input type="number" v-model="eLength" class="number" />
          <label><span>Ширина, мм</span></label>
          <input type="number" v-model="eWidth" class="number" />

          <div class="addBtn">
            <button @click="addStick()">Добавить</button>
          </div>
        </div>
      </div>
    </div>

    <h3>Параметры хлыстов</h3>
    <div v-for="item in sticks" :key="item.id" class="card-in">
      <label><span>Высота, мм</span></label>
      <input type="number" v-model="item.height" class="inputFill number" />
      <label><span>Длина, мм</span></label>
      <input type="number" v-model="item.length" class="inputFill number" />
      <label><span>Ширина, мм</span></label>
      <input type="number" v-model="item.width" class="inputFill number" />
    </div>
  </div>
</template>
  
<style scoped>
.dropdown {
  position: relative;
  display: inline-block;
}
.dropdown-content {
  display: none;
  /* position: absolute; */
  width: 100%;
  z-index: 1;
}
.dropdown:hover .dropdown-content {
  display: inline-flex;
  flex-direction: column;
}
.dropdown:hover .dropbtn {
  visibility: hidden;
}

.card-in > input {
  border: 1px solid rgb(86, 86, 86);
}

.dropbtn,
.addBtn {
  display: flex;
  justify-content: right;
}

h3 {
  margin-top: 0;
}
.dropbtn > button {
  text-align: center;
  width: 10%;
}
.card-in {
  align-items: flex-end;
  gap: 0.5rem;
}
.newStick {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 1rem;
  align-items: flex-end;
}
</style>