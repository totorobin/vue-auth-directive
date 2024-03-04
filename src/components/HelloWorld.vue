<script setup lang="ts">
import {computed,  unref} from 'vue'
import { useUserStore} from "../store/UserStore.ts";

defineProps<{ msg: string }>()

const userStore = useUserStore()

const role = computed({
  get: () => userStore.role,
  set: (newVal) => userStore.setRole(unref(newVal) || '')
})

</script>

<template>
  <p>test de la directive auth</p>
  <select v-model="role" >
    <option value=""></option>
    <option value="user">user</option>
    <option value="admin">admin</option>
  </select>

  <div v-auth.admin>user admin</div>
  <div v-auth-else.user>user connecté</div>
  <div v-auth-else>user indefini</div>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
