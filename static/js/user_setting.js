$(function() {
  $('button.set-user-img').live('click', function() {
    var category = $(this).attr('data-category');
    $select = $('#user-img-select');
    $select.attr('data-category', category);
    $('input#category').val(category);
    $select.click();
    return false;
  });

  $('#user-img-select').fileupload({
    type: 'POST',
    dataType: 'json',
    sequentialUploads: true,
    autoUpload: true,
    progressall: function(e, data){
      var category = $(this).attr('data-category');
      var progress = parseInt(data.loaded / data.total * 100, 10),
          $status_msg;
      if (category === 'icon') {
        $status_msg = $('.ico-preview').next('.status-msg');
      } else if (category == 'head') {
        $status_msg = $('.head-preview').next('.status-msg');
      } else if (category == 'background') {
        $status_msg = $('.background-preview').next('.status-msg');
      }
      $status_msg.addClass('loader-bar').html('图片上传进度：' + progress + '%');
      if( progress == 100 ){
        $status_msg.removeClass('loader-bar').html('图片上传完毕');
      }
    },
    done: function(e, result){
      var category = $(this).attr('data-category'),
          $status_msg;
      if (category === 'icon') {
        $status_msg = $('.ico-preview').next('.status-msg');
      } else if (category == 'head') {
        $status_msg = $('.head-preview').next('.status-msg');
      } else if (category == 'background') {
        $status_msg = $('.background-preview').next('.status-msg');
      }
      data = result.result;
      if(data.status == "success"){
        if (category === 'icon') {
          $('.ico-preview img').attr('src', data.path);
        } else if (category === 'head') {
          $('.head-preview img').attr('src', data.path);
          $('#head').css({'background': 'url(' + data.path + ')', 'background-size': '100%'});
        } else if (category === 'background') {
          $('.background-preview img').attr('src', data.path);
          $('body').css({'background': 'url(' + data.path + ')', 'background-size': '100%'});
        }
        noty(data);
      } else {
        $status_msg.removeClass('loader-bar').html('图片上传失败');
        noty(data);
      }
    }
  });
});
