import Vue from 'vue';
import Router from 'vue-router';
import alert from '@/markdown/alert.md';
var components={
	alert
};
var routes=[];
for(var key in components){
	routes.push({
		path:`/${key}`,
		component:components[key]
	})
}
Vue.use(Router)
export default new Router({
  routes
})
