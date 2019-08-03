## Aggregation over Inheritance

---?color=linear-gradient(90deg, #5384AD 65%, white 35%)

@snap[north span-65]
#### Prototypal Inheritance
@snapend

@title[Customize Slide Layout]


```javascript
class Animal {
    constructor(legs) {
        this.legs = legs;
    }
    
    says(sound, volume) {
        external.play(sound);
    }
}

class Dog extends Animal {
    constructor(legs = 4, volume = 5) {
        super(legs);
        this.volume = volume;
    }
    
    says() {
        super.says('bark', this.volume);
    }
}
```

@snap[south span-65 text-08]
@[1-9, zoom-25](Animal class)
@[11-20, zoom-25](Dog sub-class)
@snapend

---

@snap[west span-50]
## Customize the Layout
@snapend

@snap[south span-100 text-white]
Snap Layouts let you create custom slide designs directly within your markdown.
@snapend

---?color=linear-gradient(90deg, #5384AD 65%, white 35%)
@title[Add A Little Imagination]

@snap[north-west h4-white]
#### And start presenting...
@snapend

@snap[west span-55]
@ul[spaced text-white]
- You will be amazed
- What you can achieve
- *With a little imagination...*
- And **GitPitch Markdown**
@ulend
@snapend

@snap[east span-45]
@img[shadow](assets/img/conference.png)
@snapend

---?image=assets/img/presenter.jpg

@snap[north span-100 h2-white]
## Now It's Your Turn
@snapend

@snap[south span-100 text-06]
[Click here to jump straight into the interactive feature guides in the GitPitch Docs @fa[external-link]](https://gitpitch.com/docs/getting-started/tutorial/)
@snapend
