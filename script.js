$(function(){
    //login-modalを表示
    $('#login-show').click(function(){
        $('#login-modal').fadeIn();
    });
    $('.login-show').click(function(){
        $('#login-modal').fadeIn();
    });

    $('.menu-icon').click(function(){
        $('#menu-modal').fadeIn();
    });

    //modalを閉じる
    $('.close-modal').click(function(){
        $('#signup-modal').fadeOut();
        $('#login-modal').fadeOut();
        $('#menu-modal').fadeOut();
    });

    //signup-modalを表示
    $('.signup-show').click(function(){
        $('#signup-modal').fadeIn();
    });

    //lessonのhover処理
    $('.lesson').hover(
        //カーソルが乗っているとき
        function(){
            $(this).find('.text-contents').addClass('text-active');
        },
        //カーソルが外れているとき
        function(){
            $(this).find('.text-contents').removeClass('text-active');
        }
    );
    
    //FAQ クリックによる表示・非表示（アコーディオン）
    $('.faq-list-item').click(function(){
        var $answer = $(this).find('.answer');

        //表示
        if($answer.hasClass('open')){
            $($answer).removeClass('open');
            $($answer).slideUp();
            $(this).find('span').text('+');
        //非表示
        }else{
            $($answer).addClass('open');
            $($answer).slideDown();
            $(this).find('span').text('-');
        }
    });
    
});
