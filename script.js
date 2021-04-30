

window.onload = async function () {
    function gq(n, u = window.location.href) { n = n.replace(/[\[\]]/g, '\\$&'); var r = new RegExp('[?&]' + n + '(=([^&#]*)|&|#|$)'), res = r.exec(u); if (!res) return null; if (!res[2]) return ''; return decodeURIComponent(res[2].replace(/\+/g, ' ')); }
    var noResponse = {
        data:{
             topic:"Failed To Fetch Data from our Website! ＞︿＜",fetchedMessages:0
            },
        posts:[
            {user:'Admin',msg:'Failed To Fetch Data from our Website (≧﹏ ≦). The website must been down or something 😥',type:64}
        ]
    }
    ,data_post = await fetch(window.API_REQUEST_URL+'/api/attachment/'+gq("id"))
    .then(function (a) {
        if(a.ok) return a.json()
        return {data:{topic:"Failed To Fetch Data from our API!",fetchedMessages:0},posts:[{user:'Admin',msg:'Failed To Fetch Data from our API!'}]}
    })
    .catch(
        function() {
             return noResponse
        }
    );
    var data_guilds = await fetch(window.API_REQUEST_URL+'/api/channelslist').then(a => a.json()).catch(e=> {return {channels:[{id:"",name:"Cannot Fetch"}]}});
    var NoAttachment=[{user:'Admin',msg:'⁉ Looks like there is no Attachment in here. :<'}],
    formatCr = (localStorage.getItem('forceCrop')=="true")?'format=jpeg&width=300&height=300':'format=jpeg';
    Vue.component('post-template',{
        props: ['username', 'pfp', 'caption', 'attach',"type"],
        template:'<div v-bind:class="`the-box-gui ${(type==64)?\'warning\':\'\'}`"><div class="content post-box"><div class=details><profilepict v-bind:url="pfp"></profilepict><div class=captions><p>Posted by @{{ username }}<h3>{{ caption }}</h3></div></div>'
        +
        '<pict-prev v-if="type==0||type==2" v-bind:istwo="type==2" v-bind:url="attach"></pict-prev><vid-prev v-if="type==1" v-bind:url="attach"></vid-prev>'
        +
        '<div class=extras><a><button disabled class=def-custom>❤ Download</button></a><button v-if="type==0" disabled class=def-custom>🔃 Reverse-Search</button><button v-else disabled class=def-custom>📄 Copy Link</button></div></div></div>'
    })
    Vue.component('profilepict',{
        props: ['url'],
        template:'<img class="pfp" v-bind:src="url?url:\'https://cdn.discordapp.com/attachments/782957420473352262/837147406155251722/default-profile-picture1-744x744.png\'" />'
    })
    Vue.component('vid-prev',{
        props: ['url'],
        template:'<div class="attachment"><video class="attachment-preview" controls><source v-bind:src="url"/></video></div>'
    })
    Vue.component('pict-prev',{
        props: ['url', 'istwo'],
        template:'<div class="attachment"><img class="attachment-preview" v-on:click="updatePicture( url )" v-bind:src=lighturl><span v-if="istwo" class="gif-badge">GIF</span></div>',
        data: function(){
            var lighturl =this.url;
            lighturl += lighturl.match(/\?/)?'&'+formatCr:'?'+formatCr
            return {
                lighturl: lighturl
            }
        },
        methods:{
            updatePicture: function(url){
                this.lighturl = this.url;
            }
        }
    })
    console.log(data_post.posts.length)
    const posts = new Vue({
        el: '#vue-posts',
        data: {
            posts: (data_post.posts.length)?data_post.posts:NoAttachment
        }
    })
    
    const channeldetails = new Vue({
        el: '#vue-cdetails',
        data: {
            details:data_post.data,
            totalAttachs: data_post.posts.length
        }
    })
    
    Vue.component('list-channels',{
        props: ['name','id'],
        template:'<li v-on:click="updateContents( id )">{{name}}</li>',
        methods: {
            updateContents: async function (id){
                posts.posts = []
                console.log("Updated")
                data_post = await fetch(window.API_REQUEST_URL+'/api/attachment/'+id)
                .then(a => {
                    if(a.ok) return a.json()
                    return {data:{topic:"Failed To Fetch Data from our API!",fetchedMessages:0},posts:[{user:'Admin',msg:'Failed To Fetch Data from our API!'}]}
                })
                .catch((error) => {console.log("error")});
                window.history.pushState({id}, `Channel ${id}`,`?id=${id}`);
                posts.posts = (data_post.posts.length)?data_post.posts:NoAttachment
                channeldetails.details = data_post.data
                channeldetails.totalAttachs = data_post.posts.length
            },
            // updateContent: function (id) {
            // this.name = id
            // console.log(this.$el.textContent) // => 'not updated'
            // this.$nextTick(function () {
            //     console.log(this.$el.textContent) // => 'updated'
            // })
            // }
        }
    })

    const channels = new Vue({
        el: '#the-main-nav',
        data: {
            channels:data_guilds.channels,
            filter:'',
            isNSFW:false,
            setting:{
                forceCrop: false
            },
            isPhoneExist: !(window.innerWidth<500)
        },
        methods:{
            filterChannels: function(){
                var filter = data_guilds.channels;
                this.channels = filter.filter(m => m.name.includes(this.filter.toLowerCase()));
            },
            toggleNSFW: async function(){
                data_guilds = await fetch(window.API_REQUEST_URL+'/api/channelslist?nsfw').then(a => a.json());
                this.channels = data_guilds.channels
                this.isNSFW = true
            },
            toggleSFW: async function(){
                data_guilds = await fetch(window.API_REQUEST_URL+'/api/channelslist').then(a => a.json());
                this.channels = data_guilds.channels
                this.isNSFW = false
            }
        }
    })
    const settings = new Vue({
        el: '#vue-settingpanel',
        data: {
            setting:{
                forceCrop: (localStorage.getItem('forceCrop')=="true")
            }
        },
        methods:{
            updateSetting: async function(){
                localStorage.setItem('forceCrop', !this.setting.forceCrop)
                formatCr = (localStorage.getItem('forceCrop')=="false")?'format=jpeg':'format=jpeg&width=300&height=300'
                posts.posts = []
                console.log("Updated")
                data_post = await data_post
                // await fetch(window.API_REQUEST_URL+'/api/attachment/'+gq("id"))
                // .then(a => {
                //     if(a.ok) return a.json()
                //     return {data:{topic:"Failed To Fetch Data from our API!",fetchedMessages:0},posts:[{user:'Admin',msg:'Failed To Fetch Data from our API!'}]}
                // })
                // .catch((error) => {console.log("error")});
                posts.posts = (data_post.posts.length)?data_post.posts:NoAttachment
                channeldetails.details = data_post.data
            }
        }
    })
    const navbar = new Vue({
        el: '#navbar',
        data:{
            toggleExist: false
        },
        methods:{
            clickToExist: function(){
                console.log("clicked")
                Vue.nextTick(function(){
                channels.isPhoneExist = this.toggleExist
                this.toggleExist = !this.toggleExist
                console.log(channels.isPhoneExist, this.toggleExist)
                })
            },
            clickToDevour: function(){
                phoneMoment.isExist = false
            }
        }
    })
}