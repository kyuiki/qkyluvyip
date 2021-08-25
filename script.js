
async function main (){
    function detectSus(b){const t = /(gay|solo|straight|lesbian|cunt|futa|lewd|hentai|yiff|sauce|nsfw|cum)/gi.test(b.name);b["isSus"] = t||b.isNsfw;
    return b
    }
    function detectUsC(b){const t = /(rules|announ|vc|bot|log|general|chat|command|suggest|info|guide)/gi.test(b.name);b["isUseless"] = t;
    return b
    }
    async function curbYourFile(url) {
        // return fetch(window.API_REQUEST_URL+'/api/downloadPath/'+url).then((response) => {
        return fetch('https://prxqkydwnld.qkiemauln.repl.co/pretend?url='+url).then((response) => {
                return response.blob();
            }).then(blob => {
                return URL.createObjectURL(blob);
            });
    }
    function gq(n, u = window.location.href) { n = n.replace(/[\[\]]/g, '\\$&'); var r = new RegExp('[?&]' + n + '(=([^&#]*)|&|#|$)'), res = r.exec(u); if (!res) return ''; if (!res[2]) return ''; return decodeURIComponent(res[2].replace(/\+/g, ' ')); }
    var noResponse = {
        data:{
             topic:"Failed To Fetch Data from our Website! ＞︿＜",fetchedMessages:0
            },
        posts:[
            {user:'Admin',msg:'Failed To Fetch Data from our Website (≧﹏ ≦). The website must been down or the Channel ID is invalid or something 😥',type:64}
        ]
    }
    ,data_post = await fetch(window.API_REQUEST_URL+'/api/attachment/'+encodeURIComponent( gq("id")))
    .then(function (a) {
        if(a.ok) return a.json()
        return noResponse
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
        props: ['username', 'pfp', 'caption', 'attach',"type", "filename", "timestamp"],
        template:`
        <div v-bind:class="\`the-box-gui \${(type==64)?\'warning\':\'\'}\`">
            <div class="content post-box">
                <div class="details">
                    <profilepict v-bind:url="pfp"></profilepict>
                    <div class="captions"><p>Posted by <b>@{{ username }}</b> <timestamp v-bind:time="timestamp"></timestamp></p><h3>{{ caption }}</h3></div>
                </div>
                <pict-prev v-if="type==0||type==2" v-bind:istwo="type==2" v-bind:url="attach"></pict-prev>
                <vid-prev v-if="type==1" v-bind:url="attach"></vid-prev>
                <yt-prev v-if="type==3" v-bind:url="attach"></yt-prev>
                <div class="extras">
                    <a><button v-on:click="downloadThat()" v-bind:disabled="!attach||type==3||download.isOTW" v-bind:class="\`def-custom \${(!download.isDone)?'':'green'}\`">❤ {{download.text}}</button></a>
                    <a><button v-on:click="reverseIt()" v-if="type==0" v-bind:disabled="!attach||ris.isDone" v-bind:class="\`def-custom \${(!ris.isDone)?'':''}\`">{{ris.text}}</button></a>
                    <button v-on:click="copyThis()" v-bind:disabled="!attach||copy.isOTW" v-bind:class="\`def-custom \${(!copy.isDone)?'':'green'}\`">📄 {{copy.text}}</button>
                </div>
            </div>
        </div>`, // type 0 img, 1 vid, 2 gif, 3 yt, >4 nonsense
        data:function(){
            return {
                download:{
                    text:"Download",
                    isDone: false,
                    isOTW: false
                },
                ris:{
                    text:"💦 Cumming soon",
                    isDone: false,
                    isOTW: false
                },
                copy:{
                    text:"Copy Link",
                    isDone: false,
                    isOTW: false
                }
            }
        },
        methods:{
            downloadThat : async function() {
                const a = document.createElement("a");
                this.download = {text:"Downloading!",isOTW:true,isDone:true};
                a.href = await curbYourFile(this.attach);
                a.download = this.filename;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                this.download = {text:"Download Finish :D",isDone:true,isOTW:false};
            },
            copyThis : async function() {
                const a = document.createElement("input");
                this.copy = {text:"Copying!",isOTW:true,isDone:true};
                a.value = this.attach;
                document.body.appendChild(a);
                a.select();
                a.setSelectionRange(0, 99999);
                document.execCommand("copy");
                document.body.removeChild(a);
                this.copy = {text:"Link Copied!",isDone:true,isOTW:false};
            },
            reverseIt: async function(){
                this.ris = {text:"❌ Did you came?",isOTW:true,isDone:true};
                // alert("Well. Somehow it will finish someday xD")
            }
        }
    })
    Vue.component('profilepict',{
        props: ['url'],
        template:'<img class="pfp" v-bind:src="url?url:\'https://cdn.discordapp.com/attachments/782957420473352262/837147406155251722/default-profile-picture1-744x744.png\'" />'
    })
    Vue.component('timestamp',{
        props: ['time'],
        template:`<span class="timest"><span>{{dates}}</span> <span>{{times}}</span>
        </span>
        `,
        data: function(){
            const rt = new Date(this.time||70582791966000);
            let [mo, da, ye] = rt.toLocaleDateString("en-US").split("/");
            let [h, m, s] = rt.toLocaleTimeString("en-US").split(/:| /);
            return{
                dates:`${da}/${mo}/${ye}`,
                times:`${h}:${m}`
            }
        }
    })
    Vue.component('vid-prev',{
        props: ['url'],
        template:'<div v-if="isOpen" class="attachment"><video class="attachment-preview" controls><source v-bind:src="url"/></video></div><button class="def-custom" v-else v-on:click="showIt()">▶ Open The Video</button>',
        data: function(){
            return {
                isOpen: !(localStorage.getItem("hideVideo")=="true")
            }
        },
        methods:{
            showIt:function(){
                this.isOpen = true
            }
        }
    })
    Vue.component('yt-prev',{
        props: ['url'],
        template:`<div v-if="isOpen" class="youtube-embed"><iframe class="embed" v-bind:src="youtube"></iframe></div><button class="def-custom" v-else v-on:click="showIt()">▶ Open The Embed</button>`,
        data: function(){
            const getLast = gq("v", this.url)||this.url.match(/(youtu.be\/)([\w-]+)/)[2];
            return {
                youtube: "https://youtube.com/embed/"+getLast,
                isOpen:false
            }
        },
        methods:{
            showIt:function(){
                this.isOpen = true
            }
        }
    })
    Vue.component('pict-prev',{
        props: ['url', 'istwo'],
        template:'<div class="attachment"><img class="attachment-preview" v-on:click="updatePicture( url )" v-bind:src=lighturl><span v-if="istwo" class="gif-badge">GIF</span></div>',
        data: function(){
            var lighturl =this.url;
            lighturl += lighturl.match(/\?/)?'&'+formatCr:'?'+formatCr
            return {
                lighturl: this.url.includes("discord")?lighturl:this.url
            }
        },
        methods:{
            updatePicture: function(url){
                this.lighturl = this.url;
            }
        }
    })

    var posts, channeldetails, extras;

    channeldetails = new Vue({
        el: '#vue-cdetails',
        data: {
            details:data_post.data,
            totalAttachs: data_post.posts.length,
            totalData: { attachs:data_post.posts.length, messages: data_post.data.fetchedMessages }
        },
        methods:{
            refresh:function(d){
                Object.assign(this.$data, d)
            }
        }
    })

    posts = new Vue({
        el: '#vue-posts',
        data: {
            NoAttachment,
            posts: data_post,
            isLoad: false
        },
        methods:{
            loadMore: async function(){
                // this.posts.posts.push({user:'Admin',msg:'Testing'})
                this.isLoad = true
                console.log("Updated", data_post.data.lastID)
                const data_postl = await fetch(window.API_REQUEST_URL+'/api/attachment/'+encodeURIComponent(gq("id"))+`?before=${data_post.data.lastID||""}`)
                .then(a => {
                    if(a.ok) return a.json()
                    return noResponse
                })
                .catch((error) => {console.log("error")});
                data_postl.posts.forEach(m=>{this.posts.posts.push(m)})
                this.posts.data.lastID = data_postl.data.lastID
                channeldetails.refresh({
                    details:data_postl.data,
                    totalAttachs: data_postl.posts.length,
                    totalData:{
                        attachs : channeldetails.totalData.attachs + data_postl.posts.length,
                        messages : channeldetails.totalData.messages + data_postl.data.fetchedMessages,
                    }
                })
                this.isLoad = false
            },
            goTop: function(){
                window.scrollTo({top: 0, behavior: 'smooth'});
            }
        }
    })

    Vue.component('list-channels',{
        props: ['channel','useless', 'unsafe'],
        template:'<li v-if="(!channel.isUseless || !useless) && !(channel.isSus && !unsafe)" v-on:click="updateContents( channel.id )"><span v-if="channel.isSus" class="the-badge">NSFW!</span><span>{{channel.name}}</span></li>',
        methods: {
            updateContents: async function (id){
                posts.posts = []
                console.log("Updated")
                data_post = await fetch(window.API_REQUEST_URL+'/api/attachment/'+encodeURIComponent(id))
                .then(a => {
                    if(a.ok) return a.json()
                    return noResponse
                })
                .catch((error) => {console.log("error")});
                window.history.pushState({id}, `Channel ${id}`,`?id=${id}`);
                posts.posts = data_post
                channeldetails.refresh({details:data_post.data,totalAttachs:data_post.posts.length,totalData:{messages:data_post.data.fetchedMessages,attachs:data_post.posts.length}})
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
            channels:data_guilds.channels.map(detectSus).map(detectUsC),
            filter:'',
            isNSFW:false,
            safeMode: gq("safe"),
            setting:{
                forceCrop: (localStorage.getItem('forceCrop')=="true"),
                uselessCh: (localStorage.getItem('uselessCh')=="true"),
                hideVideo: (localStorage.getItem('hideVideo')=="true")
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
                this.channels = data_guilds.channels.map(detectSus)
                this.isNSFW = true
            },
            toggleSFW: async function(){
                data_guilds = await fetch(window.API_REQUEST_URL+'/api/channelslist').then(a => a.json());
                this.channels = data_guilds.channels.map(detectSus);
                this.isNSFW = false
            },
            fullscreenGoesBrr: function() {
                if (document.documentElement.requestFullscreen) {
                document.documentElement.requestFullscreen();
                } else if (document.documentElement.webkitRequestFullscreen) { /* Safari */
                document.documentElement.webkitRequestFullscreen();
                } else if (document.documentElement.msRequestFullscreen) { /* IE11 */
                document.documentElement.msRequestFullscreen();
                }
            },
            updateSetting: async function(v){
                localStorage.setItem(v, !this.setting[v])
                if(this.setting.forceCrop!==(localStorage.getItem("forceCrop")=="true")) {
                    formatCr = (localStorage.getItem("forceCrop")=="false")?'format=jpeg':'format=jpeg&width=300&height=300';posts.posts = []
                    console.log("Updated ForceCrop")
                    data_post = await data_post
                }
                if(this.setting.uselessCh!==(localStorage.getItem("uselessCh")=="true")) {
                    this.channels == await data_guilds.channels.map(detectSus).map(detectUsC)
                }
                if(this.setting.hideVideo!==(localStorage.getItem("hideVideo")=="true")) {
                    console.log("I forgor 💀")
                }
                // await fetch(window.API_REQUEST_URL+'/api/attachment/'+gq("id"))
                // .then(a => {
                //     if(a.ok) return a.json()
                //     return {data:{topic:"Failed To Fetch Data from our API!",fetchedMessages:0},posts:[{user:'Admin',msg:'Failed To Fetch Data from our API!'}]}
                // })
                // .catch((error) => {console.log("error")});
                posts.posts = data_post,
                channeldetails.details = data_post.data
            }
        }
    })
    const navbar = new Vue({
        el: '#navbar',
        data:{
            toggleExist: true
        },
        methods:{
            clickToExist: function(){
                console.log("clicked")
                // Vue.nextTick(function(){
                channels.isPhoneExist = this.toggleExist
                this.toggleExist = !this.toggleExist
                console.log(channels.isPhoneExist, this.toggleExist)
                // })
            },
            clickToDevour: function(){
                phoneMoment.isExist = false
            }
        }
    })
    extras = new Vue({
        el: '#extrase-retardation',
        methods:{
            downloadAll: function(){
                const getAll = posts.posts.posts;
                const dataMapped = getAll.map(function(lol){
                    if(lol.type>2) return {name:"invalid"};
                    return {
                        url : lol.link,
                        name: lol.filename,
                        id: lol.id
                    }
                })
                console.table(dataMapped)
            },
            downloadJSON: function(){
                const getAll = posts.posts.posts;
                const dataMapped = getAll.map(function(lol){
                    if(lol.type>2) return {name:"invalid"};
                    return {
                        url : lol.link,
                        name: lol.filename,
                        id: lol.id
                    }
                })
                console.table(dataMapped)
                var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(dataMapped));
                var dlAnchorElem = document.createElement("a");
                document.body.appendChild(dlAnchorElem);
                dlAnchorElem.setAttribute("href", dataStr);
                dlAnchorElem.setAttribute("download", "qkyluvyip-attachmentdata.json");
                dlAnchorElem.click();
                document.body.removeChild(dlAnchorElem);
            }
        }
    })
}
main();