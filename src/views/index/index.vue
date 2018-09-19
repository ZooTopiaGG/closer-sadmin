<template>
  <section id="permission" class="flex flex-v">
    <section class="welcome">
      <!-- <section>尊敬的 <span v-if="authUser.type === 1" class="name">超级管理员</span> <span class="name" v-else>普通管理员</span></section> -->
      <section>hello，{{ authUser.username }}！欢迎来到超管后台</section>
      <!-- <section v-if="authUser.type != 1">在您拥有的权限范围内，</section> -->
      <!-- <section v-else>超级无敌大Boss</section> -->
      <!-- <section>请开始您的表演</section> -->
    </section>
  </section>
</template>
<script>
export default {
  name: "permission",
  computed: {
    authUser() {
      return this.$store.state.authUser;
    }
  }
};
</script>
<style scoped >
.welcome {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  font-size: 20px;
  text-align: center;
  line-height: 1.9;
  letter-spacing: 2px;
}
.name {
  font-size: 28px;
  color: #fddb00;
}
</style>

