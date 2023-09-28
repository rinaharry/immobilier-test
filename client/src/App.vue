<script setup lang="ts">
import { ref, type Ref } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import Navbar from './components/layouts/Navbar.vue'
import Produit from './components/Produit.vue'
import { onMounted } from 'vue'

// const appTitle: Ref<string> = ref('Bakup')
// const sidebar: Ref<boolean> = ref(false)

// const menuItems = [
//   { title: 'Home', path: '/landing', icon: 'fas fa-home' },
//   { title: 'Product', path: '/product', icon: 'fas fa-dice' },
//   { title: 'Price', path: '/price', icon: 'fas fa-comments-dollar' },
//   { title: 'Contact', path: '/contact', icon: 'fas fa-headset' }
// ]

const isModalVisible: Ref<boolean> = ref(false)
</script>

<template>
  <b-app>
    <b-navbar class="px-2" toggleable="lg" type="dark" variant="info">
      <RouterLink to="/"> <b-navbar-brand href="/">Immobilier</b-navbar-brand></RouterLink>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <!-- <b-nav-item href="#">Link</b-nav-item> -->
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </b-app>
  <div class="container">
    <RouterView />
  </div>
</template>

<style scoped>
/* Ajoutez votre style ici */
</style>
