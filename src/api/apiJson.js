export default  {
    "dev":{
        baseUrl: "",
        Route:{
            Login:{
                name: "登录",
                path: "loulan/user/login"
            },
            Update:{
                name: "重置密码",
                path: "loulan/user/update"
            },
            SendMsg:{
                name: "发送短信",
                path: "loulan/sms/send"
            },
            Verify: {
                name: "检验短信验证码",
                path: "loulan/sms/verify"
            }
        }
    },
    "release": {
        baseUrl: "https://loulan.lianlianchains.com/",
        Route:{
            Login:{
                name: "登录",
                path: "loulan/user/login"
            },
            Update:{
                name: "重置密码",
                path: "loulan/user/update"
            },
            SendMsg:{
                name: "发送短信",
                path: "loulan/sms/send"
            },
            Verify: {
                name: "检验短信验证码",
                path: "loulan/sms/verify"
            }
        }
    }
}