(function($) {
    var storage = chrome.storage.sync;
    var menu = [
        {name: '설치 Q&A', link: 'http://www.phpschool.com/gnuboard4/bbs/board.php?bo_table=qna_install&page=1'},
        {name: 'DB Q&A', link: 'http://www.phpschool.com/gnuboard4/bbs/board.php?bo_table=qna_db&page=1'},
        {name: 'PHP함수 Q&A', link: 'http://www.phpschool.com/gnuboard4/bbs/board.php?bo_table=qna_function&page=1'},
        {name: 'HTML/SCRIPT Q&A', link: 'http://www.phpschool.com/gnuboard4/bbs/board.php?bo_table=qna_html&page=1'},
        {name: 'Q&A T.Trend', link: 'http://www.phpschool.com/gnuboard4/bbs/board.php?bo_table=qna_ttrend&page=1'},
        {name: '기타 Q&A', link: 'http://www.phpschool.com/gnuboard4/bbs/board.php?bo_table=qna_other&page=1'},
        {name: '만능문답', link: 'http://www.phpschool.com/gnuboard4/bbs/board.php?bo_table=any&page=1'},
        {name: '강좌게시판', link: 'http://www.phpschool.com/gnuboard4/bbs/board.php?bo_table=teach&page=1'},
        {name: 'Tip&Tech', link: 'http://www.phpschool.com/gnuboard4/bbs/board.php?bo_table=tipntech&page=1'},
        {name: 'Download', link: 'http://www.phpschool.com/gnuboard4/bbs/board.php?bo_table=download&page=1'},
        {name: '새내기Talk', link: 'http://www.phpschool.com/gnuboard4/bbs/board.php?bo_table=talkbox_new&page=1'},
        {name: '토크박스', link: 'http://www.phpschool.com/gnuboard4/bbs/board.php?bo_table=talkbox2'},
        {name: '포럼', link: 'http://www.phpschool.com/gnuboard4/bbs/board.php?bo_table=forum&page=1'},
        {name: '사진게시판', link: 'http://www.phpschool.com/gnuboard4/bbs/board.php?bo_table=photo&page=1'},
        {name: '길드메인', link: 'http://www.phpschool.com/sub_main/guild_main.php'},
        {name: '출석체크', link: 'http://www.phpschool.com/guild_new/guild_attend.php'},
        {name: '가위바위보', link: 'http://www.phpschool.com/community/rock_paper_scissors.php'},
        {name: '이미지마켓', link: 'http://www.phpschool.com/gnuboard4/bbs/board.php?bo_table=img_market&page=1'},
        {name: '의뢰마당', link: 'http://www.phpschool.com/gnuboard4/bbs/board.php?bo_table=old_job&page=1'},
        {name: '소프트장터', link: 'http://www.phpschool.com/gnuboard4/bbs/board.php?bo_table=buynsell&page=1'},
        {name: '중고장터', link: 'http://www.phpschool.com/gnuboard4/bbs/board.php?bo_table=user_market&page=1'},
        {name: '해외공구마켓', link: 'http://www.phpschool.com/gnuboard4/bbs/board.php?bo_table=tailbuy&page=1'}
    ];
    $.extend({
        load: function(msg) {
            this.message(msg);
            var _tbl = $('#tbl_setting > tbody');
            _tbl.empty();

            var _option = $.map(menu, function(v, k) { return '<option value="' + v.link + '">' + v.name + '</option>'; }).join('\n');

            for (var i = 0; i < 10; i++) {
                var _html = [];
                _html.push('<tr><th>Ctrl + ' + i + '</th><td><select name="page[]" data-key="' + (48 + i) + '"><option value="">메뉴선택</option>' + _option + '</select></td></tr>');
                _tbl.append(_html.join('\n'));
            }

            storage.get('settings', function(res) {
                $.each(res.settings, function(k, v) {
                    $('[name="page[]"]:eq(' + k + ') option[value="' + v.link + '"]').attr('selected', true);
                });
            });
        },
        save: function() {
            this.message('Saved');
            var _key = [];
            $('[name="page[]"]').each(function() {
                _key.push({ key: $(this).data('key'), link: $(this).val() });
            });
            storage.set({ 'settings': _key });
        },
        message: function(msg) {
            $('.message').each(function() {
                $(this).html(msg).show();
            });
            setTimeout(function() {
                $('.message').each(function() {
                    $(this).fadeOut(function() { $(this).html(''); });
                });
            }, 1000);
        }
    });

    $(function() {
        $.load('Loaded');
        $('#settingSaveBtn').on('click', function() {
            $.save();
        });
    });
})(jQuery);