<template>
	<div  style="margin-top:0.5rem;">
      <collapse v-for="item,index in data" :key="index">
          <span slot="title" v-if="item.path" @click="$router.push({path:list.path})">{{item.name}}</span>
          <span slot="title" v-else-if="item.href"><a href="item.href" target="_blank">{{item.name}}</a></span>
          <span slot="title" v-else>{{item.name}}</span>
          <div slot="content">
              <ul v-if="item.children">
                <li v-for="nav,index in item.children" :key="index" @click="$router.push({path:nav.path})">
                  {{nav.name}}
                 </li>
              </ul>
              <template v-if="item.groups">
              		<div class="nav-grounp" v-for="groups,index in item.groups" :key="index">
              			<div class="grounp-name">{{groups.groupName}}</div>
              			<ul>
              				<li v-for="list in groups.list" @click="$router.push({path:list.path})">
              					{{list.title}}
              				</li>
              			</ul>		
              		</div>	
              </template>    
          </div>
      </collapse>
    </div>
</template>
<script>
import collapse from '@/components/Collapse';
	export default{
		name:"nav-list",
		data(){
			return {

			}
		},
		props:{
			data:Array
		},
		components:{
		    collapse
		  }
	}
</script>