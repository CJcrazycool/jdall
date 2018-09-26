var CategorySlide = function() {

}

CategorySlide.prototype = {
    categoryLeft: function() {
        // 1. 初始化左侧
        var swiper1 = new Swiper('#categoryLeft', {
            direction: 'vertical',
            //如果有多个 <!-- 滑动内容的大容器 -->swiper-slide 就需要加这个参数
            slidesPerView: 'auto',
            //开启回弹效果
            freeMode: true,
            mousewheel: true,
        });
    },
    categoryRight: function() {
        // 2. 初始化右侧滑动
        var swiper2 = new Swiper('#categoryRight', {
            direction: 'vertical',
            //如果有多个 <!-- 滑动内容的大容器 -->swiper-slide 就需要加这个参数
            slidesPerView: 'auto',
            //开启回弹效果
            freeMode: true,
            //初始化滚动条  必须子元素的高度超过父元素
            scrollbar: {
                el: '.swiper-scrollbar',
            },
            mousewheel: true,
        });
    },
    //分类左侧的点击效果
    categoryLeftClick:function () {
        // 1. 给所有a添加点击事件（给ul加捕获到里面的a）
        var ul = document.querySelector('.category-left ul');
        //2.1 获取所有的li
        var lis = document.querySelectorAll('.category-left ul li');
        // 4.1 获取category-left里面swiper-wrapper元素
        var swiperWrapper = document.querySelector('.category-left .swiper-wrapper');
        ul.addEventListener('click',function (e) {
            // e.target 当前触发事件的目标元素
            // 2. 给所有人删除active 给当前点击的a父元素li添加active
            for (var i = 0; i < lis.length; i++) {
                lis[i].classList.remove('active');
                lis[i].index = i;
            }
            // 2.2 给当前a的父元素里加类名
            e.target.parentNode.classList.add('active');
            // 3. 让当前点击的a吸到顶部（位移到让当前点击a在最顶部位置）
            //位移的距离是-当前点击a的索引*li的高度 因为是往上位移是负值
            var translateY = -e.target.parentNode.index * e.target.parentNode.offsetHeight;
            // 3.1 计算完了位移距离后需要判断一下 是否有超出最大位移距离
            // 3.2. 获取swiperWrapper的高度 和获取ul的高度
            var swiperWrapperHeight = swiperWrapper.offsetHeight;
            var ulHeight = ul.offsetHeight;
            var maxTranslateY = swiperWrapperHeight - ulHeight;
            // 3.3 判断当前位移值 是否小于了最大位移值 设置为最大位移值
            if(translateY < maxTranslateY){
                // 3.4 如果小于就设置为最大位移值
                translateY = maxTranslateY;
            }
            // 4. 给当前swiper-wrapper 容器设置translate3d设置位移 注意带px单位
            swiperWrapper.style.transform = 'translate3d(0px, '+translateY+'px, 0px)';
            // 5. 给位移的swiper-wrapper 添加过渡效果
            swiperWrapper.style.transition = 'all 0.3s';
        });
       
    }
}


window.addEventListener('load', function () {
	//创建分类滑动对象的实例
	var categorySlide = new CategorySlide();
	//分别调用左侧右侧滑动方法
	categorySlide.categoryLeft();
    categorySlide.categoryRight();
	categorySlide.categoryLeftClick();
});