## Aggregation over Inheritance

---?code=inheritance.js&lang=javascript&color=linear-gradient(90deg, #5384AD 65%, white 35%)

@snap[north-west span-85]
#### Inheritance
@snapend

@snap[south span-85 text-07]
@[1-6](Boat)
@[8-16](Sail Boat adds #sail method)
@[18-27](Long Sail Boat can extend Sail Boat)
@[29-37](Motor Boat with #motor method)
@[39-47](Fast Motor Boat with faster #motor method)
@[49-57](Faster Motor Boat with even faster #motor method)
@[59-65](Add a #speed attribute...)
@[67-76](Motor Boat looks like this...)
@[78-83](Fast Motor Boat looks like this...)
@[85-90](Does it make sense for a Fast Sail Boat...)
@[91-101](What about a Diesel Motor Boat...)
@[103-110](Add a #fuel attribute...)
@[112-121](Fast Diesel Motor Boat can extend Fast Boat)
@[123-132](Fast Diesel Motor Boat can extend Diesel Motor Boat)
@[134-144](Long Fast Diesel Motor Boat With Sail could extend Long Sail Boat)
@[146-155](Long Fast Diesel Motor Boat With Sail could extend Fast Diesel Motor Boat)
@snapend


---


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
