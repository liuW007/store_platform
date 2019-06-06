<template>
    <div>
        <img style="max-width: 100%;" id="image" src="@/assets/1.jpg" />

    </div>
</template>

<script>
import Cropper from '../../../node_modules/cropperjs'
import '../../../node_modules/cropperjs/dist/cropper.css'
export default {
    name: 'Cropper',
    methods: {
        init () {
            let image = document.getElementById('image');
            let cropper = new Cropper(image, {
                aspectRatio: 1/1,
                crop(event) {
                    console.log(event.detail.x)
                },
                cropend(event){
                    console.log('剪裁完毕后图片路径=>',event.srcElement.cropper.originalUrl)
                }
            })
        },
        test () {
            var fn = null;
            function foo() {
                var a = 2;
                function innnerFoo() {
                    console.log(a);
                }
                fn = innnerFoo; // 将 innnerFoo的引用，赋值给全局变量中的fn
            }
            
            function bar() {
                fn(); // 此处的保留的innerFoo的引用
            }
            // foo();
            // bar();
            //-----------------闭包联系
            // var num = null;
            // for(var i=1;i<=5;i++){
            //     setTimeout(function timer(){

            //         num = i;
            //     },1*1000)
            // }
            // console.log(num)
            //---------------------this 指向
            function foo(){
                console.log(this.q);
            }
            function active(fn){
                fn();
            }
            var q = 20;
            var obj = {
                q: 10,
                getQ: foo
            }
            // active(obj.getQ);
        },
    },mounted() {
        this.init();
        this.test();
    },
}
</script>