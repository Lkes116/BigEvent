$(function () {
  // 设置昵称的长度
  const form = layui.form;
  const layer = layui.layer;
  form.verify({
    nickname: function (value) {
      if (value.length > 6) {
        return "昵称长度必须在1 ~ 6 个字符之间！";
      }
    },
  });

  initUserInfo();

  // 获取用户的基本信息
  function initUserInfo() {
    $.ajax({
      url: "/my/userinfo",
      method: "get",
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg(res.message);
        }
        form.val("formUserInfo", res.data);
      },
    });
  }

  // 重置功能
  $("#btnReset").on("click", function (e) {
    e.preventDefault();
    initUserInfo();
  });
  // 修改提交功能
  $(".layui-form").submit(function (e) {
    e.preventDefault();
    $.ajax({
      method: "POST",
      url: "/my/userinfo",
      data: $(".layui-form").serialize(),
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg("更新用户信息失败！");
        }
        layer.msg("更新用户信息成功！");
        window.parent.getUserInfo();
      },
    });
  });
});
