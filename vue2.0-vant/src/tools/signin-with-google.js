/*
 * @Author: sunzhongjie
 * @Date: 2021-01-15 14:52:41
 * @LastEditors: Jelly
 * @LastEditTime: 2021-01-15 15:37:58
 */
import { syncLoadJs, createMetaTag } from "./async-load-js.js";
export const client_id =
  "158153948884-nfchpf5k6lopqa1t8e60uid3sbr0mp33.apps.googleusercontent.com";

// one tag(一键登录, 即自动弹出登录窗口)
export const googleOneTap = function(callback) {
  syncLoadJs("https://accounts.google.com/gsi/client", "google_jssdk").then(
    () => {
      // 自动弹出登陆one tap
      window.google.accounts.id.initialize({
        client_id: client_id,
        callback: callback || handleCredentialResponse,
      });
      window.google.accounts.id.prompt((notification) => {
        if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
          console.log(
            notification,
            "为展示: " + notification.isNotDisplayed(),
            ", 跳过了: " + notification.isSkippedMoment()
          );
        }
      });
    }
  );
};
function handleCredentialResponse(data) {
  console.log(data);
}
/**
 * 手动点击登录按钮事件触发
 * @param {*} type
 * -> type === 1, 通过auth2.0方法登录, 按钮自己绘制, 需要传一个按钮id
 * -> type === 2, 使用google自带的登录按钮, 不需要id
 * @param {*} id
 */
export const signinWithGoogle = async function(type, id, signinSucc) {
  if (!window.gapi) {
    await syncLoadJs("https://apis.google.com/js/platform.js", "google_jssdk");
  }
  // https://developers.google.com/identity/protocols/oauth2/javascript-implicit-flow?hl=en
  var auth2,
    gapi = window.gapi;
  if (type === 1) {
    // use auth2.0 client method attachClickHandler to create a callback that either silently finishes sign-in for the user, or prompts the user to re-authorize based on the state of the user's session.
    gapi.load("client:auth2", () => {
      // Retrieve the singleton for the GoogleAuth library and set up the client
      gapi.client.init({
        apiKey: '',
        clientId: client_id,
        'scope': 'https://www.googleapis.com/auth/drive.metadata.readonly',
        'discoveryDocs': ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest']
      }).then(function() {
        auth2 = gapi.auth2.getAuthInstance({
          client_id: client_id,
          scope: "profile",
          cookie_policy: "single_host_origin",
          redirect_uri: "http://localhost:8081/scroll",
        });
        console.log('auth2: ', auth2);
        // Attach the click handler to the sign-in button
        auth2 && auth2.attachClickHandler(
          id,
          {},
          (user) => {
            // 登陆成功的回调
            console.log("Success: ", user);
          },
          (error) => {
            // 登陆失败的回调
            console.log("Failed: ", error);
          }
        );
      })
    });
  } else if (type === 2) {
    createMetaTag("google-signin-client_id", client_id);
    gapi.signin2.render("my-signin2", {
      client_id: "",
      scope: "profile email",
      width: 200,
      height: 40,
      longtitle: true,
      theme: "dark",
      onsuccess: function() {} || signinSucc,
      onfailure: function() {},
    });
  }
};
