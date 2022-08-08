class Slider{
    constructor(className,object) {
        this.sliderContainer = document.querySelector('.'+className).children[0];
        this.next = document.querySelector('.'+object.navigation.next);
        this.prev = document.querySelector('.'+object.navigation.prev);
        this.sliderItems = [...this.sliderContainer.children];
        this.countSlides = this.sliderItems.length;
        this.settings = object;
        this.SliderInit();
    }
    setSettingsValue(){
        this.viewCountSlide = this.settings.slide;
        if(typeof this.settings['offset'] !== "undefined"){
            this.offset = this.settings.offset;
        }else{
            this.offset = 'all';
        }
        if(typeof this.settings['margin'] !== "undefined"){
            this.marginSlider = this.settings.margin;
        }else{
            this.marginSlider = false;
        }
        if(typeof this.settings['breakPoints'] !== "undefined"){
            this.breakPoints = this.settings.breakPoints;
            this.setBreakPoints();
        }
    }
    setBreakPoints(){
        let thisObject = this;
        if(typeof this.settings['breakPoints'] !== "undefined" && Object.keys(this.breakPoints).length > 0){
            for (let item in this.breakPoints) {
                if( window.innerWidth >= item ){
                    this.viewCountSlide = thisObject.breakPoints[item].slide;
                    if(typeof thisObject.breakPoints[item]['margin'] !== "undefined"){
                        this.marginSlider = thisObject.breakPoints[item].margin;
                    }else{
                        this.marginSlider = this.settings.margin;
                    }
                }
            }
        }
    }
    setSliderItemWidth(){
        if(this.viewCountSlide > 1){
            if(this.marginSlider && this.marginSlider > 0){
                return (this.sliderContainer.offsetWidth / this.viewCountSlide)-(this.marginSlider - this.marginSlider/this.viewCountSlide);
            }else{
                return this.sliderContainer.offsetWidth / this.viewCountSlide;
            }
        }else{
            return this.sliderContainer.offsetWidth;
        }
    }
    setSliderPosition(){
        switch (this.offset) {
            case "all":
                if(this.marginSlider){
                    return this.sliderContainer.offsetWidth + this.marginSlider;
                }else{
                    return this.sliderContainer.offsetWidth;
                }
            case "one":
                if(this.marginSlider){
                    return this.setSliderItemWidth() + this.marginSlider;
                }else{
                    return this.setSliderItemWidth();
                }
        }
    }
    sliderItemsInit(){
        let thisObject = this;
        this.sliderItems.forEach(function (item,index){
            item.setAttribute('index',index);
            item.style.width = thisObject.setSliderItemWidth()+'px';
            if(thisObject.marginSlider){
                item.style.marginRight = thisObject.marginSlider+'px';
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
        let width = this.setSliderPosition();
        let currentPosition = 0;
        let indexSlide = 0;
        const thisObject = this;
        this.next.onclick = function () {
            indexSlide++;
            currentPosition += +width;
            thisObject.sliderContainer.style.transform = 'translate3d(-'+ currentPosition +'px, 0px, 0px)';
        };
        this.prev.onclick = function () {
            if(indexSlide > 0){
                indexSlide--;
                currentPosition -= +width;
                thisObject.sliderContainer.style.transform = 'translate3d(-'+ currentPosition +'px, 0px, 0px)';
            }
        }
    }
    SliderInit(){
        this.sliderContainer.classList.add('slider-init');
        this.setSettingsValue();
        this.setBreakPoints();
        this.sliderItemsInit();
        this.setActiveSlide();
        this.sliderNavigation();
    }
}
let slider = new Slider('main-slider-first',{
    slide:3,
    margin:20,
    loop:false,
    touch:true,
    offset:'one',
    breakPoints:{
      '320':{
        margin:10,
        slide:2
      },
      '1200':{
          slide:3
      }
    },
    navigation:{
        'next':'slider-btn-next',
        'prev':'slider-btn-prev'
    }
});
