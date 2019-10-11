const express = require('express')
const router = express.Router()
const User = require('../model/userModel')
const Mail = require('../utils/mail')

let codes = {} //通过内存保存验证码
//注册
/**
 * @apiGroup User
 * @api {post} /user/reg 用户注册
 * @apiName register
 * @apiParam {String} us 用户名
 * @apiParam {String} ps 用户密码
 * @apiParam {String} code 邮箱验证码
 */
router.post('/reg', (req, res)=>{
    //获取数据
    let {us, ps, code} = req.body

    if(us && ps && code){
        //检测验证码
        if(codes[us] != code){
            return res.send({err: -4, msg: '邮箱验证码错误'})
        }
        //用户名查重
        User.find({us}) 
        .then((data)=>{
            if(data.length === 0){
                return User.insertMany({us:us, ps:ps})
            }else{
                res.send({err: -3, msg: '用户名已存在'})
            }
        })
        .then(()=>{
            res.send({err: 0, msg: '注册成功'})
        })
        .catch((err)=>{
            res.send({err: -1, msg: '注册失败'})
        })
    }else{
        return res.send({err: -2, msg: '参数错误'})
    }
    console.log(us, ps)
    //处理数据
    //返回数据
})

//登录
/**
 * @apiGroup User
 * @api {post} /user/login 用户登录
 * @apiName login
 * @apiParam {String} us 用户名
 * @apiParam {String} ps 用户密码
 */
router.post('/login', (req, res)=>{
    let {us, ps} = req.body

    if(!us || !ps){
        return res.send({err: -2, msg: '参数错误'})
    }

    User.find({us, ps})
    .then((data)=>{
        if(data.length > 0){
            res.send({err: 0, msg: '登录成功'})
        }else{
            res.send({err: -1, msg: '用户名或密码不正确'})
        }
    })
    .catch((err)=>{
        return res.send({err: -2, msg: '参数错误'})
    })
})

//发送邮箱验证码
/**
 * @apiGroup User
 * @api {post} /user/getMailCode 发送邮箱验证码
 * @apiName getMailCode
 * @apiParam {String} mail 注册邮箱
 */
router.post('/getMailCode', (req, res)=>{
    let {mail} = req.body
    // if(!mail){
    //     res.send({err: -2, msg: '参数错误'})
    // }
    //随机验证码
    let code = parseInt(Math.random()*10000)
    Mail.sendCode(mail, code)
    .then(()=>{
        codes[mail] = code  //将邮箱和匹配的验证码保存到内存中
        res.send({err: 0, msg:'验证码发送成功'})
    })
    .catch((err)=>{
        res.send({err: -1, msg:'验证码发送失败'})
    })
})
module.exports = router