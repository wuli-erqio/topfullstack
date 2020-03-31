import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main.vue'
import Home from '../views/Home.vue'
// import CoursesList from '../views/courses/CoursesList.vue'
// import CoursesEdit from '../views/courses/CoursesEdit.vue'
import CoursesList from '../views/ResourceCrud.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Main,
    redirect: '/home' ,
    children: [
      { path: '/', name: 'home', component: Home},
      { path: '/:resource/list', name: 'courses-list', component: CoursesList, props: true},
      // { path: '/:resource/edit/:id', name: 'courses-edit', component: CoursesEdit, props: true},
      // { path: '/:resource/create', name: 'courses-create', component: CoursesEdit, props: true},
      // { path: '/:resource/crud', name: 'courses-crud', component: CoursesCrud, props: true}
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
