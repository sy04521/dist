webpackJsonp([0],{mtmd:function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});r("Muz9");var n=r("vX/r"),a={methods:{uploadAvatar:function(t){console.log(t),Object(n.g)(t.target.files[0])}}},o={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",[e("label",{staticClass:"btn btn-primary file-chooser"},[this._v("\n        Change Picture\n        "),e("input",{attrs:{type:"file",accept:".jpg, .jpeg, .png"},on:{change:this.uploadAvatar}})])])},staticRenderFns:[]},u=r("VU/8")(a,o,!1,null,null,null);e.default=u.exports},"vX/r":function(t,e,r){"use strict";r.d(e,"a",function(){return a}),r.d(e,"g",function(){return o}),r.d(e,"b",function(){return u}),r.d(e,"d",function(){return d}),r.d(e,"c",function(){return s}),r.d(e,"e",function(){return c}),r.d(e,"f",function(){return i});var n=r("gyMJ"),a=function(){return n.a.request({url:"zooms/getRecordList",method:"get"})},o=function(t){var e=new FormData;return e.append("avatar",t),n.a.request({url:"zooms/uploadimage",method:"post",data:e,headers:{"content-type":"multipart/form-data"}})},u=function(t){return n.a.request({url:"zooms/recordadd",method:"post",data:{data:t}})},d=function(t){return n.a.request({url:"zooms/recordEdit",method:"post",data:{data:t}})},s=function(t){return n.a.request({url:"zooms/recordDelete",method:"post",data:{data:t}})},c=function(t){return n.a.request({url:"zooms/recordsDelete",method:"post",data:{data:t}})},i=function(t){return n.a.request({url:"zooms/search",method:"post",data:{data:t}})}}});