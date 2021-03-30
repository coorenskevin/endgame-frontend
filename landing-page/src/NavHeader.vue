<!-- <template>
<nav class="navbar navbar-expand-sm navbar-dark bg-dark" role="navigation">
  <div class="container">
    <router-link to="/" class="navbar-brand mr-auto">Blue Online Store</router-link>
      <ul class="navbar-nav mr-auto">
      </ul>
      <ul class="nav navbar-nav">
        <router-link to="/" tag="li" v-if="!isAuthenticated" class="nav-item" active-class="active">
          <a @click="onLoginClicked" class="nav-link">Login</a>
        </router-link>
        <li v-if="isAuthenticated" class="li-pointer nav-item">
          <div class="dropdown">
            <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              {{ getUserName() }}
            </button>
            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <a class="dropdown-item" href="#">Account Settings</a>
              <a @click="onLogoutClicked" class="dropdown-item">Logout {{ userEmail }}</a>
            </div>
          </div>
        </li>
        <li>
          <ShoppingCart />
        </li>
      </ul>
  </div>
</nav>
</template>
-->

<template>
<nav id="sidebar-wrapper" style="z-index:5">
  <ul class="sidebar-nav">
      <li class="sidebar-brand">
          <a class="js-scroll-trigger" href="#page-top">Charity box</a>
      </li>
      <li class="sidebar-nav-item">
          <a class="js-scroll-trigger" href="#landing">Home</a>
      </li>
      <li class="sidebar-nav-item">
          <a class="js-scroll-trigger" href="#foodAndDrinks">Food and Drinks</a>
      </li>
      <li class="sidebar-nav-item">
          <a class="js-scroll-trigger" href="#schoolSupplies">School Supplies</a>
      </li>
      <router-link to="/" tag="li" v-if="!isAuthenticated" class="sidebar-nav-item" active-class="active">
        <a @click="onLoginClicked" class="nav-link">Login</a>
      </router-link>
      <li v-if="isAuthenticated" class="li-pointer nav-item">
        <div class="dropdown">
          <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            {{ getUserName() }}
          </button>
          <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <a class="dropdown-item" href="#">Account Settings</a>
            <a @click="onLogoutClicked" class="dropdown-item">Logout {{ userEmail }}</a>
          </div>
        </div>
      </li>
      <li>
        <ShoppingCart />
      </li>
      <!--need next links?
      <li class="sidebar-nav-item">
          <a class="js-scroll-trigger" href="#portfolio">Portfolio</a>
      </li>
      <li class="sidebar-nav-item">
          <a class="js-scroll-trigger" href="#contact">Contact</a>
      </li>
      -->
  </ul>
</nav>
</template>

<script>
import ShoppingCart from './ShoppingCart.vue';
export default {
  components: { ShoppingCart },
  name: 'NavHeader',
  computed: {
    userEmail() {
      return this.isLoggedIn ? this.currentUser.email : ''
    },
    isAuthenticated() {
      return this.$store.state.user.isAuthenticated;
    },
  },
  methods: {
    onLoginClicked() {
      window.location = this.$store.state.endpoints.login;
    },
    onLogoutClicked() {
      this.$store.commit("logout");
    },
    getUserName() {
      return this.$store.state.user.name;
    }
  }
}
</script>
