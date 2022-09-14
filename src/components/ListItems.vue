<script setup>
import { useSize } from "../composables/useSize";
import ListItemsM from "./mobile/ListItems-m.vue";
import ListItemsD from "./desktop/ListItems-d.vue";

let { checkSize } = $(useSize());
</script>
  
  <template>
  <list-items-d v-if="checkSize" />
  <list-items-m v-else />
</template>