<template>
  <div class="accounting-layout">
    <div class="accounting-sidebar">
      <ul>
        <li><router-link to="/accounting/">Movimientos</router-link></li>
        <li><router-link to="/accounting/accounts/">Cuentas</router-link></li>
      </ul>
    </div>
    <div class="accounting-content">
      <router-view></router-view>
    </div>
  </div>
</template>

<style scoped lang="scss">
.accounting-layout {
  display: flex;
  height: 100%;
  width: 100%;
  .accounting-sidebar {
    width: 200px;
    background-color: var(--app-color-background-light);
    ul {
      list-style: none;
      padding: 0;
      margin: 0;
      li {
        padding: 0.4em;
        a {
          display: block;
          padding: 10px;
          text-decoration: none;
          color: #98a9b1;
          &.router-link-exact-active {
            color: var(--el-color-primary);
            background-color: rgba(240, 240, 255, 0.05);
          }
          &:hover {
            color: #eee;
            background-color: rgba(240, 240, 255, 0.05);
          }
        }
      }
    }
  }
  .accounting-content {
    flex: 1;
    padding: 10px;
  }
}
</style>
