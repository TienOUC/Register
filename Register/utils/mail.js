const nodemailer = require('nodemailer');

    //创建发送邮件的请求对象
    let transporter = nodemailer.createTransport({
        host: 'smtp.qq.com',    //发送方邮箱     在node_modules->nodemailer->lib->well-know->services.json中查找各个邮箱的配置
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
            // user: testAccount.user, // 发送方邮箱地址
            user: '694554436@qq.com',
            pass: 'icwhowzfjjembcec' // smtp验证码     
        }
    });
    
function sendCode(mail, code) {
      //邮件信息
      let mailObj = {
        from: '"验证邮箱" <694554436@qq.com>', // sender address
        // to: 'bar@example.com, baz@example.com', // list of receivers
        to: mail,
        subject: 'Hello ✔', // Subject line
        text: `您的验证码是${code},有效期5分钟`, // plain text body
        // html: '<b>Hello world?</b>' // html or text body choose one
    }
    return new Promise((resolve, reject)=>{
   //发送邮件
        transporter.sendMail(mailObj, (err, data)=>{
            if(err){
                reject()
            }else{
                resolve()
            }
        })
    })
 
};

module.exports = {sendCode} ;