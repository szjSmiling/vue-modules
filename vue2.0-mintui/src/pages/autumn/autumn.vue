<template>
  <div id="heg-autumn">
    <head-top class="header">
      <i slot="left" class="top_icon iconfont icon-back"></i>
      <p slot="title">Shake &amp; Win</p>
    </head-top>
    <div class="content" :class="{Gt540:AppHeight}">
      <div class="appTop" v-show="contentMargin"></div>
      <img class="img-shake" :src="imgGroups.shake" alt="">
      <div class="top-bg">
        <img class="img-plane" :src="imgGroups.plane" alt="">
      </div>
      <div class="middle-bg" :style="shakeBg">
        <p>This game is only for App</p>
      </div>
      <div class="bottom-part">
        <div class="bo-top">
          <div v-if="!isLogin"><a @click="signIn">Sign In</a><span>/</span><a @click="signUp">Sign Up</a></div>
          <p v-if="isLogin"><span v-text="chances"></span> chances left</p>
        </div>
        <a class="bo-load" href="https://app.adjust.com/vbzvaj?campaign=M&adgroup=Download&creative=Online" target="_blank">Download App to Shake</a>
        <p class="bo-chance" @click="getChanceDialog">How to earn more chances？</p>
        <ul class="bo-share flex space-around align-items-center">
          <li v-for="item in shares" :key="item.id" @click="jumpChild(item.id)">
            <img :src="item.icon" alt="">
            <p v-text="item.name"></p>
          </li>
        </ul>
      </div>
      <div class="shareCover" v-show="shareDialog" @click="clickOut('share')"></div>
      <div class="shareCover" v-show="howToGetChance" @click="clickOut('chance')"></div>
      <div class="share-dialog" v-show="shareDialog">
        <h5>Invite your friends to play now</h5>
        <ul class="flex space-around align-items-center">
          <li v-for="(item,index) in sharesApp" :key="index" :id="'openApp'+[index]" @click="shareDevice(index)">
            <a v-if="index == 0" :href="(isIos && index == 0)?item.href2:item.href" target="_blank">
              <img :src="item.icon" alt="">
              <p>{{item.name}}</p>
            </a>
            <a v-else :href="item.href" :data-action="index == 1?item.action:''" target="_blank">
              <img :src="item.icon" alt="">
              <p>{{item.name}}</p>
            </a>
          </li>
        </ul>
      </div>
      <div class="howToGetChance" v-show="howToGetChance" >
        <h5>How to get more chances:</h5>
        <ul>
          <li><router-link to="/register">Sign up</router-link> with HappyEasyGo +1</li>
          <li><router-link to="/">Book flight tickets</router-link> +1</li>
          <li>First <a href="https://app.adjust.com/s1vq100?deeplink=heg%3A%2F%2FAutumnS">sync your contacts</a> +1</li>
          <li><router-link to="/">Get a referral order</router-link> +1</li>
          <li><router-link to="/">Get a referral registration</router-link> +1</li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import headTop from 'Components/head/header.vue';
import { Toast, Indicator, Spinner  } from 'mint-ui';
import { CookieUtil } from '../../models/utils/CookieUtil.js';
import { DomainManager } from "../../request/DomainManager.js";
export default {
  components:{
    headTop,
  },
  data(){
    return{
      isIos:false,
      timer:null,
      AppHeight:false,
      chances:null,
      contentMargin:true,
      shareDialog:false,
      howToGetChance:false,
      isLogin:CookieUtil.hasItem('uuid'),
      shakeBg:{
        "background":'url('+require('../../assets/images/autumn/img_bg.png')+')',
        "background-size":"100% 100%",
        "background-repeat":"no-repeat",
      },
      imgGroups:{
        plane:require('../../assets/images/autumn/img_plane.png'),
        shake:require('../../assets/images/autumn/img_shake.png'),
        plane:require('../../assets/images/autumn/img_plane.png'),
        plane:require('../../assets/images/autumn/img_plane.png'),
      },
      shares:[
        {id:0,name:"Rules",icon:require('../../assets/images/autumn/app_share.png')},
        {id:1,name:"Prizes",icon:require('../../assets/images/autumn/app_share_prizes.png')},
        {id:2,name:"Share",icon:require('../../assets/images/autumn/app_share.png')},
        {id:3,name:"My Prizes",icon:require('../../assets/images/autumn/app_share_record.png')},
      ],
      sharesApp:[
        {id:0,name:"SMS",href:CookieUtil.hasItem('uuid')?'sms:?body='+CookieUtil.getItem('username')+encodeURIComponent(' invites you to Shake & Win. Shake your phone & score FREE FLIGHT TICKET, voucher & ecash with HappyEasyGo. Know more: https://goo.gl/P8TkvY'):'sms:?body='+encodeURIComponent('HappyEasyGo invites you to Shake & Win. Shake your phone & score FREE FLIGHT TICKET, voucher & ecash with HappyEasyGo. Know more: https://goo.gl/P8TkvY'),
          href2:CookieUtil.hasItem('uuid')?'sms:&body='+CookieUtil.getItem('username')+encodeURIComponent(' invites you to Shake & Win. Shake your phone & score FREE FLIGHT TICKET, voucher & ecash with HappyEasyGo. Know more: https://goo.gl/P8TkvY'):'sms:&body='+encodeURIComponent('HappyEasyGo invites you to Shake & Win. Shake your phone & score FREE FLIGHT TICKET, voucher & ecash with HappyEasyGo. Know more: https://goo.gl/P8TkvY'),icon:require('../../assets/images/autumn/share_sms.png')},
        {id:1,name:"Whatsapp",href:CookieUtil.hasItem('uuid')?'whatsapp://send?text='+CookieUtil.getItem('username')+encodeURIComponent('invites you to Shake & Win with HappyEasyGo. Win FREE FLIGHT TICKET, voucher & e-cash by shaking your phone. https://goo.gl/z4AArY'):'whatsapp://send?text='+encodeURIComponent('HappyEasyGo invites you to Shake & Win with HappyEasyGo. Win FREE FLIGHT TICKET, voucher & e-cash by shaking your phone. https://goo.gl/z4AArY'),action:'share/whatsapp/share',icon:require('../../assets/images/autumn/share_whatsapp.png')},
        {id:2,name:"Messenger",href:'fb-messenger://share/?link='+encodeURIComponent('https://goo.gl/e18H45')+'&app_id=123456789',icon:require('../../assets/images/autumn/share_msg.png')},
        {id:3,name:"More",href:'javascript:;',icon:require('../../assets/images/autumn/share_more.png')},
      ]
    }
  },
  created() {
    var u = navigator.userAgent;
    var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1;
    var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); 
    if(isiOS){
      this.isIos = true;
    }
    let height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    if(height > 550){
      this.AppHeight = true;
    }
    try {
      let deviceObj =
        typeof window.heg.getNativeSource() === "string"
          ? JSON.parse(window.heg.getNativeSource())
          : window.heg.getNativeSource();
      this.contentMargin =
        Number(deviceObj.deviceType) == 1 && !deviceObj.deviceNative;
      let uuid = window.heg.getNativeUuid();
      if(uuid){
        CookieUtil.setItem('uuid', uuid);
      }else{
        CookieUtil.removeItem('uuid');
      }
      window.onReceviedUuid = this.onReceviedUuid;
      if(CookieUtil.hasItem("uuid")) {//登陆后
        this.getRemainder();
      }
    } catch (e) {
      if(CookieUtil.hasItem("uuid")) {//登陆后
        this.getRemainder();
      }
    }
  },
  mounted() {
    $(document).on('visibilitychange webkitvisibilitychange', function() {
        var tag = document.hidden || document.webkitHidden;
        if (tag) {
          clearTimeout(this.timer);
        }
    })
    $(window).on('pagehide', function() {
      clearTimeout(this.timer);
    })
  },  
  methods:{
    getRemainder(){
      Indicator.open({
        spinnerType: 'fading-circle'
      });
      let url = DomainManager.getObtainRemainingLottery();
      this.$axios.get(url).then(res =>{
        Indicator.close();
        if(res.succ){
          this.chances = res.data
        }else{
          Toast(res.msg);
        }
      }).catch(err => {
        Indicator.close();
        console.log(err);
      })
    },
    signIn(){
      if(!this.isLogin){
        try {
          window.heg.nativeSignIn();
        } catch (error) {this.$router.push('/login');}
      }
    },
    signUp(){
      try {
        window.heg.nativeSignIn();
      } catch (error) {this.$router.push('/register');}
    },
    jumpChild(who){
      switch (who) {
        case 0:
          this.$router.push("/autumnrules");
          break;
        case 1:
          this.$router.push("/autumnintro");
          break;
        case 2:
          this.shareDialog = true;
          break;
        case 3:
          this.$router.push("/autumnprizes");
          break;
        default:
          break;
      }
    },
    clickOut(who){
      if(who == "share"){
        this.shareDialog = false;
      }else{
        this.howToGetChance = false;
      }
    },
    getChanceDialog(){
      this.howToGetChance = true;
    },
    shareDevice(who){
      Toast({
        message:"Please operate on app",
        duration:1200,
        position:"top"
      });
      this.shareDialog = false;
      if (navigator.userAgent.match(/android/i)) {
        // 通过iframe的方式试图打开APP，如果能正常打开，会直接切换到APP，并自动阻止a标签的默认行为
        // 否则打开a标签的href链接
        var isInstalled;
        //下面是安卓端APP接口调用的地址，自己根据情况去修改
        varifrSrc = 'https://app.adjust.com/vbzvaj?campaign=M&adgroup=Download&creative=Online';
        var ifr = document.createElement('iframe');
        ifr.src = ifrSrc;
        ifr.style.display = 'none';
        ifr.onload = function() {
        // alert('Is installed.');
        isInstalled = true;
        alert(isInstalled);
        document.getElementById('openApp3').click();};
        ifr.onerror = function() {
            // alert('May be not installed.');
            isInstalled = false;
            alert(isInstalled);
        }
        document.body.appendChild(ifr);
        this.timer = setTimeout(function() {
            document.body.removeChild(ifr);
        },1000);
      }
      // //ios判断
      if (navigator.userAgent.match(/(iPhone|iPod|iPad);?/i)){
        if (navigator.userAgent.match(/(iPhone|iPod|iPad);?/i))  {
          //Animation://com.camnpr.animation
          var isInstalled;
          //var gz = '{"comName":"${com.short_name}","comID":"${com.id}","comPhoneNum":"${com.phone_num}","type":"0"}';
          //var jsongz =JSON.parse(gz);
          //下面是IOS调用的地址，自己根据情况去修改
          var ifrSrc = 'app://xxxxx';
          var ifr = document.createElement('iframe');
          ifr.src = ifrSrc;
          ifr.style.display = 'none';
          ifr.onload = function() {
            alert('Is installed.');
            isInstalled = true;
            alert(isInstalled);
            document.getElementById('openApp3').click();};
          ifr.onerror = function() {
            alert('May be not installed.');
            isInstalled = false;
            alert(isInstalled);
          }
          document.body.appendChild(ifr);
          this.timer = setTimeout(function() {
            document.body.removeChild(ifr);
          },1000);
        }
      }
    },
    onReceviedUuid(uuid) {
      CookieUtil.removeItem("uuid");
      CookieUtil.setItem("uuid", uuid);
      this.isLogin = true;
      return "1";
    },
  }
}
</script>
<style lang="less" scoped>
#heg-autumn{
  img{vertical-align: top}
  a,button{cursor: pointer;}
  .appTop{padding-top:0.5rem;}
  .content{
    position: relative;
  }
  .Gt540{
    height:100%;
  }
  .img-shake{
    width:2.9rem;
    position: absolute;
    left: 0;
    right: 0;
    top: 20%;
    margin:auto;
    z-index: 6;
  }
  .top-bg{
    height:2.2rem;
    background:#E64E54;
    .img-plane{
      display: block;
      width:1.3rem;
    }
  }
  .middle-bg{
    height:2.2rem;
    position: relative;
    z-index:5;
    p{
      width:2.3rem;
      height:0.3rem;
      line-height:0.3rem;
      font-size:0.18rem;
      color:#fff;
      background: rgba(0,0,0,0.60);
      position: absolute;
      bottom: 0.3rem;
      left: 0;
      right: 0;
      margin:auto;
    }
  }
  .bottom-part{
    font-size:0.18rem;
    .bo-top{
      font-weight: bold;
      a{
        display:inline-block;
        width:0.7rem;
        height:0.21rem;
        line-height:0.21rem;
        font-size: 0.18rem;
        color: #283951;
        padding:0 0;
        text-decoration: underline;
      }
      div span{
        margin:0 0.05rem;
        font-size: 0.18rem;
        vertical-align:middle;
      }
      p{
        height:0.21rem;
        line-height:0.21rem;
        font-size: 0.18rem;
        span{color:#EC7D81;}
      }
    }
    .bo-load{
      display: inline-block;
      width:2.4rem;
      height:0.3rem;
      line-height:0.3rem;
      font-size:0.18rem;
      color:#fff;
      background: #FFBC01;
      box-shadow: 0 4px 4px 0 rgba(126,78,10,0.42);
      border-radius:30px;
      letter-spacing: 0.49px;
      margin:0.1rem 0;
    }
    .bo-chance{
      width:100%;
      height:0.15rem;
      line-height:0.15rem;
      font-size: 12px;
      color: #E64E54;
      margin:auto;
      cursor: pointer;
    }
    .bo-share{
      margin-top: 0.14rem;
      li{
        cursor: pointer;
        img{
          width:0.3rem;
          height: 0.3rem;
        }
        p{
          font-size: 0.11rem;
          color: #283951;
          letter-spacing: 0.94px;
          margin-top:0.1rem;
        }
      }
    }
  }
  .shareCover{
    width:100%;
    height:100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 6;
    background: rgba(0,0,0,0.5);
  }
  .share-dialog{
    width:100%;
    position: fixed;
    bottom: 0;
    background: #fff;
    z-index: 7;
    h5{
      font-size: 0.18rem;
      color: #111111;
      padding:0.3rem 0 0.2rem;
    }
    ul{
      padding-bottom:0.4rem;
      li{
        flex:1;
        a{color:#333;}
        font-size:0.14rem;
        cursor: pointer;
        img{
          width:0.3rem;
          height:0.3rem;
          border-radius:3px;
          margin:0.2rem 0 0.13rem;
        }
      }
    }
  }
  .howToGetChance{
    width:2.8rem;
    background: #FAFAFA;
    border-radius: 4px;
    position: absolute;
    left: 0;
    right: 0;
    top: 32%;
    z-index: 7;
    margin:auto;
    h5{
      padding:0.2rem 0;
      font-size: 0.17rem;
      color: #111111;
      letter-spacing: 0;
    }
    ul{
      padding:0 0.15rem 0.2rem;
      li{
        text-align:left;
        list-style-type: disc;
        font-size:0.14rem;
        color: #555555;
        letter-spacing: 0;
        line-height: 0.26rem;
        margin-left: 0.35rem;
        a{
          display:inline-block;
          color:#0b9d78;
          text-decoration: underline;
        }
      }
    }
  }
}
</style>
