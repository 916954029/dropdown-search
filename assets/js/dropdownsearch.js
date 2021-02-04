$(function () {
    // 隐藏元素用的 class 名称
    let hiddenClass = 'hidden';

    /**
     * 判断搜索结果选择列表是否为显示状态
     *
     * @returns {boolean}
     */
    function isSearchCandidatesShow() {
        return -1 == $('#searchCandidates').attr('class').indexOf(hiddenClass)
    }

    /**
     * 隐藏搜索结果选择列表
     */
    function hideCandidates() {
        if (isSearchCandidatesShow()) {
            $('#searchCandidates').addClass(hiddenClass)
        }
    }

    /**
     * 显示搜索结果选择列表
     */
    function showCandidates() {
        if (false == isSearchCandidatesShow()) {
            $('#searchCandidates').removeClass(hiddenClass)
        }
    }

    /**
     * 渲染搜索结果选择列表
     *
     * @param candidates
     */
    function enrichCandidates(candidates) {
        let htmlStr = ``;
        for (let i = 0; i < candidates.length; i++) {
            htmlStr += `<li data-id="` + candidates[i].id + `">` + candidates[i].name + `</li>`;
        }
        $('#searchCandidates ul').empty().append(htmlStr);
        showCandidates()
    }

    /**
     * 注册搜索结果条目中的点击事件
     */
    function doCandidate() {
        $('#searchCandidates ul li').each((index, element) => {
            let candidate = $(element);
            candidate.click(() => {
                $('#searchId').val(candidate.attr('data-id'));
                $('#searchKw').val(candidate.text());
                hideCandidates()
            })
        })
    }

    /**
     * 定义关键字搜索按钮点击事件
     */
    $('#searchButton').click(function () {
        let kw = $('#searchKw').val().trim();
        if ('' == kw) return false;

        // 搜索请求 api 地址
        let urlForSearch = $(this).attr('data-url');
        // support demo code
        if ('url for search' == urlForSearch) {
            let data = [
                {id: 1, name: '搜索结果示例条目一'},
                {id: 2, name: '搜索结果示例条目二'},
                {id: 3, name: '搜索结果示例条目三'},
                {id: 4, name: '搜索结果示例条目四'},
                {id: 5, name: '搜索结果示例条目五'}
            ];
            enrichCandidates(data);
            doCandidate()
        } else {
            $.post(urlForSearch, {kw: kw}, function (res) {
                if (null != res.data) {
                    let data = res.data;
                    enrichCandidates(data);
                    doCandidate()
                }
            })
        }
    });

    /**
     * 定义关键字输入框的用户输入、值变化和聚焦事件
     */
    $('#searchKw').bind('input change', function () {
        $('#searchId').val(0)
    }).bing('focus', function () {
        hideCandidates()
    });
});