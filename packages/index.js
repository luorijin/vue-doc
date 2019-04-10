import vueUpload from './vue-upload'
import Vue from 'vue';
let components=[
    vueUpload
]
let install = (Vue)=>{
    components.forEach((component)=>{
        Vue.component(component.name, component);
    })
}
/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
  }
export default{
    install
}  