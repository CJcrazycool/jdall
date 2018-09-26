
//创建一个JDEffect对象 存储一些京东效果对象 使用面向对象的方式减少全局变量的使用
var JDEffect = function() {

};
//JDEffect的原型对象
JDEffect.prototype = {
    //头部渐变效果
    headerGradient: function() {
        // 1. 获取头部盒子
        var header = document.querySelector('#header');

        // 2. 获取轮播图容器的高度
        var slideHeight = document.querySelector('#slide').offsetHeight;
        // 让设置背景色的代码在事件的外面调用一下
        scroll();
        // 3. 监听滚动条滚动事件  事件的第二个参数是函数的代码而不是函数的返回值
        window.addEventListener('scroll', scroll);

        function scroll() {

            var scrollTop = getScrollTop();
            // console.log(scrollTop);
            // 4. 计算透明度值  滚动距离/轮播图高度
            var opcity = scrollTop / slideHeight;
            // 5. 设置头部背景色
            header.style.backgroundColor = 'rgba(222,24,27,' + opcity + ')';

        }
        //获取滚动条滚动的距离
        function getScrollTop() {
            var scrollPos;
            if (window.pageYOffset) {
                scrollPos = window.pageYOffset;
            } else if (document.compatMode && document.compatMode != 'BackCompat') { scrollPos = document.documentElement.scrollTop; } else if (document.body) { scrollPos = document.body.scrollTop; }
            return scrollPos;
        }
    },
    // 倒计时JS效果
    downTime: function() {
        /*1. 10点场  时间10-12点之间  总共2小时  比如当前到了10:30  只剩1个半小时
        2. 获取到总的倒计时事件  12点的时间  - 当前的时间  （倒计时的时间）
        3. 获取到了倒计时的时间后 分别计算时分秒 设置到页面span里面*/
        // 1. 获取12点的未来时间  new Date传入参数获取指定一个时间
        //真正开发要从后台获取时间
        var futureTime = new Date(2018, 6, 21, 12, 00, 00);
        // console.log(futureTime);
        // 2. 获取当前的时间
        //当前时间也获取服务器的时间
        var nowTime = new Date();
        // console.log(nowTime);
        // 3. 求出未来时间-当前时间的时间差的秒数（默认是毫秒数）
        var time = Math.floor((futureTime - nowTime) / 1000);
        //获取所有倒计时的span标签
        var spans = document.querySelectorAll('.seckill-time span');
        // 4. 设置一个定时器 
        setInterval(setSeckill, 1000);
        //先执行一次
        setSeckill();

        function setSeckill() {
            // 让总秒数每秒--
            time--;
            if (time < 0) {
                //time当前倒计时结束 开启下一段倒计时
                time = 7200;
                //当到了时间再次从后台获取下一次倒计时的时间
            }
            // 5. 计算当前秒数对应的时分秒
            // 1. 时  总秒数/3600
            var hour = Math.floor(time / 3600);
            // console.log(hour);
            // 2. 分钟 5200%3600   1600  总秒数 % 3600 / 60
            var minute = Math.floor(time % 3600 / 60);
            // console.log(minute);
            // 3. 秒  5200 % 3600 % 60   可以直接%60
            var second = Math.floor(time % 60);
            // console.log(second);
            // 4. 分别把时分秒十位个位放到倒计时的时分秒的span上 
            spans[0].innerHTML = Math.floor(hour / 10);
            spans[1].innerHTML = Math.floor(hour % 10);
            spans[3].innerHTML = Math.floor(minute / 10);
            spans[4].innerHTML = Math.floor(minute % 10);
            spans[6].innerHTML = Math.floor(second / 10);
            spans[7].innerHTML = Math.floor(second % 10);
        }
    },
    //轮播图效果
    slide: function() {
        //初始化轮播图
        // 5. 初始化swiper插件  new Swiper参数有2个 第一个是轮播图大容器选择器  第二个参数就是轮播图一些参数
        var mySwiper = new Swiper('.swiper-container', {
            // 控制轮播图滚动的方向 horizontal水平 vertical 垂直
            direction: 'horizontal',
            //控制轮播图动画切换的速度  轮播图动画的时间
            speed: 300,
            //添加一个小手
            grabCursor: true,
            // 添加循环 无缝轮播图 
            loop: true,
            //添加自动轮播图 delay自动轮播的间隔时间
            autoplay: {
                delay: 1000,
                //到最后一张停止自动轮播图 但是loop了后就停不下来了
                stopOnLastSlide: true,
                // 是否要当触摸的时候禁止自动轮播图  ture就禁止 false不禁止
                disableOnInteraction: false,
            },
            // 如果需要分页器  小圆点
            pagination: {
                el: '.swiper-pagination',
            },
            // 添加回弹效果  为false可以回弹  true 不可以回弹
            freeMode: false,
        })
    }
}


window.addEventListener('load',function () {
    // 1. 使用构造函数创建实例
    var jdEffect = new JDEffect();
    // 2. 调用jdEffect原型上的一些函数
    jdEffect.headerGradient();
    jdEffect.downTime();
    jdEffect.slide();
});