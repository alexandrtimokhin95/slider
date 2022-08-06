class Slider{
    constructor(className,object) {
        this.className = document.querySelector('.'+className);
        this.next = document.querySelector('.'+object.navigation.next);
        this.prev = document.querySelector('.'+object.navigation.prev);
        this.sliderItems = [...this.className.children];
        this.countSlides = this.sliderItems.length;
        this.settings = object;
        this.getCountSlideView();
        this.SliderInit();
    }
    getCountSlideView(){
        let thisObject = this;
        for (const item in this.settings.breakPoints) {
            if( window.innerWidth >= item ){
                this.settings.slide = thisObject.settings.breakPoints[item].slide;
            }
        }
    }
    getSliderItemWidth(){
        console.log(this.settings.slide)
        if(this.settings.slide > 1){
            return this.sliderItems[0].offsetWidth / this.settings.slide;
        }else{
            return this.sliderItems[0].offsetWidth;
        }
    }
    checkWidth(){
        if((this.getSliderItemWidth() * this.countSlides)+2 === this.className.offsetWidth){
            return true;
        }
    }
    sliderItemsInit(){
        let thisObject = this;
        this.sliderItems.forEach(function (item,index){
            item.setAttribute('index',index);
            item.style.transform = 'translate(0px,0px)';
            item.style.flex = '1 0 '+ thisObject.getSliderItemWidth()+'px';
        });
    }
    setActiveSlide(index=0){
        let currentSlide = this.sliderItems[index];
        this.sliderItems.forEach(function (item){
            item.classList.remove('active-slide');
            item.classList.remove('next-slide');
            item.classList.remove('prev-slide');
        })
        currentSlide.classList.add('active-slide');
        if(currentSlide.nextElementSibling){
            currentSlide.nextElementSibling.classList.add('next-slide');
        }
        if(currentSlide.previousElementSibling){
            currentSlide.previousElementSibling.classList.add('prev-slide');
        }
    }
    sliderNavigation(){
        let sliderItems = [...this.className.children];
        let width = this.getSliderItemWidth();
        let indexSlide = 0;
        const thisObject = this;
        if(this.settings.loop === false){
            this.prev.classList.add('disabled');
        }
        if(!this.checkWidth()) {
            this.next.onclick = function () {
                if (indexSlide + thisObject.settings.slide < thisObject.countSlides) {
                    indexSlide++;
                    sliderItems.forEach(function (item, index) {
                        let matrix = window.getComputedStyle(item).transform;
                        matrix = matrix.split(/\(|,\s|\)/).slice(1, 7);
                        let newPosition = Math.abs(+matrix[4]) + +width;
                        item.style.transform = 'translate(-' + newPosition + 'px,0px)';
                    });
                    thisObject.setActiveSlide(indexSlide);
                }
                if (indexSlide + thisObject.settings.slide === thisObject.countSlides) {
                    this.classList.add('disabled')
                } else {
                    this.classList.remove('disabled')
                }
                thisObject.prev.classList.remove('disabled');
            };
            this.prev.onclick = function () {
                if (indexSlide > 0) {
                    indexSlide--;
                    sliderItems.forEach(function (item, index) {
                        let matrix = window.getComputedStyle(item).transform;
                        matrix = matrix.split(/\(|,\s|\)/).slice(1, 7);
                        let newPosition = Math.abs(+matrix[4]) - +width;
                        item.style.transform = 'translate(-' + newPosition + 'px,0px)';
                    });
                    thisObject.setActiveSlide(indexSlide);
                }
                if (indexSlide === 0) {
                    this.classList.add('disabled')
                } else {
                    this.classList.remove('disabled')
                }
                thisObject.next.classList.remove('disabled');
            }
        }else{
            document.querySelector('.slider-navigation').classList.add('hide');
        }
    }
    SliderInit(){
        this.className.classList.add('slider-init');
        this.sliderItemsInit();
        this.setActiveSlide();
        this.sliderNavigation();
    }
}
let slider = new Slider('main-slider-first',{
    slide:2,
    loop:false,
    breakPoints:{
        '475':{
            slide:1
        },
        '768':{
            slide:3
        },
        '1300':{
            slide:1
        },
        '1600':{
            slide:1
        }
    },
    navigation:{
        'next':'slider-btn-next',
        'prev':'slider-btn-prev'
    }
});
