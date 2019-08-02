## Aggregation over Inheritance

---

## Add Some Slide Candy

---?color=linear-gradient(180deg, white 75%, black 25%)
@title[Customize Slide Layout]


```javascript
class Animal {
    constructor(legs) {
        this.legs = legs;
    }
}

class Dog extends Animal {
    constructor() {
        super(4);
    }
    
    bark(volume) {
    }
}
```

@snap[south span-100 text-08]
@[1,2](You can present code inlined within your slide markdown too.)
@[9-17](Displayed using code-syntax highlighting just like your IDE.)
@[19-20](Again, all of this without ever leaving your slideshow.)
@snapend

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
