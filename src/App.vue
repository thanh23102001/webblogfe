<template>
  <div id="app">
     <nav class="navbar navbar-expand navbar-dark bg-dark">
      <div class="navbar-nav mr-auto">
           <li class="nav-item">
          <router-link to="/blogList" class="nav-link" style="color:white;">Blog</router-link>
              </li>
                 <li class="nav-item">
          <router-link to="/add" class="nav-link" style="color:white;">Add Blog</router-link>
              </li>
               <li class="nav-item">
          <router-link to="/home" class="nav-link">
            <font-awesome-icon icon="home" />Home
          </router-link>
        </li>
                <li class="nav-item right">
          <router-link class="nav-link" to="/login">Login</router-link>
        </li>
      </div>
     </nav>
         <div class="container mt-3"> 
      <router-view />
    </div>
   </div>
</template>
<script>
export default {
  name: 'app',
};

</script>

