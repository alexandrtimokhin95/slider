class Slider{
    constructor(className,object) {
        this.className = document.querySelector('.'+className).children[0];
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
        if(this.settings.breakPoints && Object.keys(this.settings.breakPoints).length > 0){
            for (const item in this.settings.breakPoints) {
                if( window.innerWidth >= item ){
                    this.settings.slide = thisObject.settings.breakPoints[item].slide;
                }
            }
        }
    }
    getSliderItemWidth(){
        if(this.settings.slide > 1){
            if(this.settings.margin > 0){
                return this.className.offsetWidth / this.settings.slide;
            }else{
                return this.className.offsetWidth / this.settings.slide;
            }
        }else{
            return this.className.offsetWidth;
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
            item.style.width = thisObject.getSliderItemWidth()-(thisObject.settings.margin - thisObject.settings.margin/thisObject.settings.slide)+'px';
            if(thisObject.settings.margin){
                item.style.marginRight = thisObject.settings.margin+'px';
            }
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
        let width = this.getSliderItemWidth() * this.settings.slide;
        let indexSlide = 0;
        const thisObject = this;
        if(this.settings.loop === false){
            this.prev.classList.add('disabled');
        }
        if(!this.checkWidth()) {
            let currentPosition = 0;
            this.next.onclick = function () {
                indexSlide++;
                currentPosition += +width + thisObject.settings.margin;
                thisObject.className.style.transform = 'translate3d(-'+ currentPosition +'px, 0px, 0px)';
                thisObject.setActiveSlide(indexSlide);

                thisObject.prev.classList.remove('disabled');
            };
            this.prev.onclick = function () {
                if (indexSlide > 0) {
                    indexSlide--;
                    currentPosition -= +width + thisObject.settings.margin;
                    thisObject.className.style.transform = 'translate3d(-'+ currentPosition +'px, 0px, 0px)';
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
    slide:3,
    loop:false,
    margin:90,
    navigation:{
        'next':'slider-btn-next',
        'prev':'slider-btn-prev'
    }
});
