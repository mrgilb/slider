class Slider {
    constructor ({node, visibleSlides, auto}) {
        this.slider = node
        this.visibleSlides = visibleSlides || 1
        this.position = 0
        this.container = this.slider.querySelector('[data-slider=container]')
        this.controls = this.slider.querySelector('[data-slider=controls]')
        this.prev = this.slider.querySelector('[data-slider=prev]')
        this.next = this.slider.querySelector('[data-slider=next]')
        this.slides = this.slider.querySelector('[data-slider=slides]')
        this.slideList =  this.slider.querySelectorAll('[data-slider=slide]')

        this.touchStartX = 0
        this.touchStartY = 0

        this.gap = this.visibleSlides > 1 ? 20 : 0
        this.position === 0 ? this.prev.setAttribute('disabled', 'disabled') : this.prev.removeAttribute('disabled')
        this.slides.style.transform = `translateX(${this.position * -1}px)`
        this.slides.style.width = `${this.slides.children.length * 100}%`
        this.delta = this.container.offsetWidth / this.visibleSlides
        this.maxDelta = this.slides.offsetWidth / this.visibleSlides - this.delta * this.visibleSlides
        this.minDelta = 0

        this.setWidthSlide()
        this.initMove()
        this.autoSlide = auto ? this.autoSlide() : null
    }

    handlerClick = (evt) => {
      evt.preventDefault()
      this.slides.style.transform = `translateX${this.position}px`

      if (evt.target.getAttribute('data-slider') === 'prev') {
        if (this.position !== this.minDelta) {
          this.position += this.delta
          this.slides.style.transform = `translateX(${this.position}px)`
        }
      }

      if (evt.target.getAttribute('data-slider') === 'next') {
        if (Math.abs(this.position) < this.maxDelta) {
          this.position -= this.delta
          this.slides.style.transform = `translateX(${this.position}px)`
        }

      }

      Math.abs(this.position) >= this.maxDelta ?
        this.next.setAttribute('disabled', 'disabled') :
        this.next.removeAttribute('disabled')

      Math.abs(this.position) === this.minDelta ?
        this.prev.setAttribute('disabled', 'disabled') :
        this.prev.removeAttribute('disabled')
    }

    handleTouchStart = (evt) => {
      const firstTouch = evt.touches[0];

      this.touchStartX = firstTouch.clientX
      this.touchStartY = firstTouch.clientY
    }

    handleTouchEnd = (evt) => {
      if (this.clientX === 0 || this.clientX === 0) {
        return false
      }

      let touchMoveX = evt.changedTouches[0].clientX
      let touchMoveY = evt.changedTouches[0].clientY

      let XDiff = touchMoveX - this.touchStartX
      let YDiff = touchMoveY - this.touchStartY

      if (Math.abs(XDiff) > Math.abs(YDiff)) {
        if (XDiff > 0) {
          if (this.position !== this.minDelta) {
            this.position += this.delta
            this.slides.style.transform = `translateX(${this.position}px)`
          }
        }
        else {
          if (Math.abs(this.position) < this.maxDelta) {
            this.position -= this.delta
            this.slides.style.transform = `translateX(${this.position}px)`
          }
        }
      }

      Math.abs(this.position) >= this.maxDelta ?
        this.next.setAttribute('disabled', 'disabled') :
        this.next.removeAttribute('disabled')

      Math.abs(this.position) === this.minDelta ?
        this.prev.setAttribute('disabled', 'disabled') :
        this.prev.removeAttribute('disabled')
    }

    initMove () {
      this.slider.addEventListener('click', this.handlerClick);
      this.slider.addEventListener('touchstart', this.handleTouchStart);
      this.slider.addEventListener('touchend', this.handleTouchEnd);
    }

    setWidthSlide () {
      this.slideList.forEach(slide => {
        slide.style.width = `${this.delta - this.gap}px`
        slide.style.marginRight = `${this.gap}px`
      })
    }

    autoSlide () {
      setInterval(() => {
        if (Math.abs(this.position) < this.maxDelta) {
          this.position -= this.delta
          this.slides.style.transform = `translateX(${this.position}px)`
        } else {
          this.position = 0
          this.slides.style.transform = `translateX(${this.position}px)`
        }

      Math.abs(this.position) >= this.maxDelta ?
        this.next.setAttribute('disabled', 'disabled') :
        this.next.removeAttribute('disabled')

      Math.abs(this.position) === this.minDelta ?
        this.prev.setAttribute('disabled', 'disabled') :
        this.prev.removeAttribute('disabled')
      }, 5000)
    }
}


const initSlider = function () {
  const sliders = document.querySelectorAll('[data-slider=slider]')

  sliders.forEach(slider => {
    new Slider(
      {
      node: slider,
      visibleSlides: 2,
      auto: true
      }
      )
  })
}

initSlider();


