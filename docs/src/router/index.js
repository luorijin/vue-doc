import Vue from 'vue';
import Router from 'vue-router';
import upload from '@/markdown/upload.md';
var components={
	upload
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
