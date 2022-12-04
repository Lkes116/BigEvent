$(function () {
    // 点击去往 注册页面
    $('#link_reg').on('click', function () {
        $('.login_box').hide()
        $('.reg_box').show()
    })
    // 点击去往 登陆页面
    $('#link_login').on('click', function () {
        $('.login_box').show()
        $('.reg_box').hide()
    })

    // 表单验证
    const form = layui.form
    const layer = layui.layer
    form.verify({
        pass: [
            /^[\S]{6,12}$/
            ,'密码必须6到12位，且不能出现空格'
        ] ,
        regpass: function (value) {
            const pwd = $('.reg_box [name=password]').val()
            if (pwd !== value) {
                return '两次密码不一致'
            }
        }
    })

    // 注册
    $('#form_reg').on('submit', function (e) {
        e.preventDefault()
        let data = {
            username: $('#form_reg [name=username]').val(),
            password: $('#form_reg [name=password]').val()
        }
        $.post('http://www.liulongbin.top:3007/api/reguser', data, function (res) {
            if (res.status !== 0){
                return layer.msg(res.message)
            }
            layer.msg('注册成功，请登录')
            $('#link_login').click()
        })
    })
    // 登录
    $('#form_login').submit(function (e) {
        e.preventDefault()
        $.ajax({
            url: '/api/login',
            method: 'post',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('登录失败')
                }
                layer.msg('登录成功')
                console.log(res.token);
                localStorage.setItem('token',res.token)
                location.href = '/index.html'
            }
        })
    })
})