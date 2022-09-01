## Краткая инструкция по работе
- для slider нужно указать атрибуты `data-slider="slider"`
- для контейнера внутри `data-slider="container"`
- для контейнера слайдов `data-slider="slides"`
- для каждого слайда  `data-slider="slide"`
- для контейнера кнопок prev, next `data-slider="controls"`
- для кнопок `data-slider="prev"` и `data-slider="next"`
- чтобы вызвать слайдер нужно создать один экземпляр 
`const slider = new Slider({node: 'сам слайдер', visibleSlides: 2 (кол-во отображаемых слайдов), auto: true (если нужно автоматическое перемещение слайдов)})`

- демка https://mrgilb.github.io/slider/
