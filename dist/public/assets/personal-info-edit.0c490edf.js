import{h as b,d as g,i as C,_ as y,o as d,c as p,f as t,j as a,v as n,k as U,l as $,u as m,m as E,a as h,b as f,w,n as _}from"./index.3dcfd753.js";const O=async e=>{const s="image-apps",r="https://api.cloudinary.com/v1_1/barry-apps/image/upload",l=new FormData;l.append("file",e),l.append("upload_preset",s);try{return(await b.post(r,l)).data}catch(u){throw console.log(u),new Error("Something went wrong please try again later")}},V=g({name:"edit-form",props:{user:{type:Object},originalEmail:{type:String}},data(){return{isOccupied:!1,userMsg:"",imgByUrl:!1}},methods:{addClass(e,s,o){e.classList.add(s),e.classList.remove(o)},async isEmailOccupied(){const e=this.$refs.email;if(!!this.user){if(this.user.email===this.originalEmail){this.addClass(e,"correct","incorrect");return}if(this.isOccupied=!0,e.checkValidity()){this.userMsg="Checking if email is occupied";const s=await C.getUserByEmail(this.user.email);this.isOccupied=!!s,this.isOccupied?(this.userMsg="This email is already occupied please try another email",this.addClass(e,"incorrect","correct")):(this.userMsg="",this.addClass(e,"correct","incorrect"))}}},handleFile(e){var r;const o=(r=e.currentTarget.files)==null?void 0:r[0];!o||this.isValidImage(o)&&this.uploadFile(o)},async uploadFile(e){if(!!this.user)try{const{url:s}=await O(e);this.user.photo=s}catch(s){console.log(s)}},isValidImage(e){const s=/image-*/;return!!e.type.match(s)},validateForm(){const e=this.$refs.password,s=this.$refs.email,o=this.$refs.fullname;e.checkValidity()?this.addClass(e,"correct","incorrect"):this.addClass(e,"incorrect","correct"),s.checkValidity()&&!this.isOccupied?this.addClass(s,"correct","incorrect"):this.addClass(s,"incorrect","correct"),o.value?this.addClass(o,"correct","incorrect"):this.addClass(o,"incorrect","correct")},formSubmit(){this.isOccupied||this.$emit("onUpdateUser",this.user)}},computed:{emailValidation(){return"[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$"},userImg(){if(!!this.user)return this.user.photo||"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"}}}),k=t("h2",null,"Change Info",-1),F=t("p",null,"Changes will be reflected every services",-1),S={class:"photo-input"},B={class:"img-container"},I=["src"],N=t("div",{class:"overlay"},null,-1),T={key:1,class:"input-group img-url"},D=t("label",null,"Image url",-1),L={class:"input-container"},M={class:"input-group"},P=t("label",null,"Name",-1),A={class:"input-group"},q=t("label",null,"Bio",-1),z={class:"input-group"},j=t("label",null,"Phone",-1),J={class:"input-group"},R=t("label",null,"Email",-1),G=["pattern"],H={class:"input-group"},K=t("label",null,"Password",-1),Q=t("button",{class:"action-btn"},"Save",-1);function W(e,s,o,r,l,u){return e.user?(d(),p("form",{key:0,class:"edit-form",onSubmit:s[12]||(s[12]=(...i)=>e.formSubmit&&e.formSubmit(...i))},[k,F,t("div",S,[t("div",B,[t("input",{class:"img-input",type:"file",accept:"image/*",onChange:s[0]||(s[0]=(...i)=>e.handleFile&&e.handleFile(...i))},null,32),t("img",{src:e.userImg,alt:""},null,8,I),N]),e.imgByUrl?(d(),p("div",T,[D,t("div",L,[a(t("input",{type:"text","onUpdate:modelValue":s[2]||(s[2]=i=>e.user.photo=i),placeholder:"Enter your image url"},null,512),[[n,e.user.photo]]),t("button",{onClick:s[3]||(s[3]=i=>e.imgByUrl=!1),type:"button",class:"action-btn"},"Save")])])):(d(),p("span",{key:0,onClick:s[1]||(s[1]=i=>e.imgByUrl=!0)},"Change photo"))]),t("div",M,[P,a(t("input",{onBlur:s[4]||(s[4]=(...i)=>e.validateForm&&e.validateForm(...i)),ref:"fullname","onUpdate:modelValue":s[5]||(s[5]=i=>e.user.fullname=i),type:"text",placeholder:"Enter your name...",required:""},null,544),[[n,e.user.fullname]])]),t("div",A,[q,a(t("textarea",{name:"bio",class:"bio",cols:"30",rows:"10","onUpdate:modelValue":s[6]||(s[6]=i=>e.user.bio=i),placeholder:"Enter your bio..."},null,512),[[n,e.user.bio]])]),t("div",z,[j,a(t("input",{"onUpdate:modelValue":s[7]||(s[7]=i=>e.user.phone=i),type:"tel",placeholder:"Enter your phone..."},null,512),[[n,e.user.phone]])]),t("div",J,[R,a(t("input",{onBlur:s[8]||(s[8]=i=>{e.validateForm(),e.isEmailOccupied()}),ref:"email","onUpdate:modelValue":s[9]||(s[9]=i=>e.user.email=i),type:"email",pattern:e.emailValidation,placeholder:"Enter your name...",required:""},null,40,G),[[n,e.user.email]])]),t("div",H,[K,a(t("input",{onBlur:s[10]||(s[10]=(...i)=>e.validateForm&&e.validateForm(...i)),ref:"password",type:"password","onUpdate:modelValue":s[11]||(s[11]=i=>e.user.password=i),minlength:"6",placeholder:"Enter your password...",required:""},null,544),[[n,e.user.password]])]),Q],32)):U("",!0)}const X=y(V,[["render",W]]),Y=g({name:"personal-info-edit",components:{editForm:X},data(){return{}},methods:{...$(m,["updateUser"]),async update(e){await this.updateUser(e),this.$router.push("/personal-info")}},computed:{...E(m,["user"]),userToChange(){const e=this.user;return JSON.parse(JSON.stringify(e))}},created(){this.user||this.$router.push("/")},unmounted(){}}),Z={class:"personal-info-edit"},x=t("span",{class:"fa-solid fa-al"},null,-1);function ee(e,s,o,r,l,u){var c;const i=h("router-link"),v=h("editForm");return d(),p("main",Z,[f(i,{to:"/personal-info"},{default:w(()=>[x,_(" Back ")]),_:1}),f(v,{user:e.userToChange,originalEmail:(c=e.user)==null?void 0:c.email,onOnUpdateUser:e.update},null,8,["user","originalEmail","onOnUpdateUser"])])}const te=y(Y,[["render",ee]]);export{te as default};