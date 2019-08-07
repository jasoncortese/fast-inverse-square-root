## Aggregation over Inheritance

---?code=inheritance.js&lang=javascript&color=linear-gradient(90deg, #5384AD 65%, white 35%)

@snap[north-west span-85 text-white]
#### Inheritance
@snapend

@snap[south span-30 text-07 text-white]
@[1-6](Boat class)
@[8-16](Sail Boat with #sail method)
@[18-27](Long Sail Boat extends Sail Boat)
@[29-37](Motor Boat with #motor method)
@[39-47](Fast Motor Boat with faster #motor method)
@[49-57](Faster Motor Boat with even faster #motor method)
@[59-65](Add a #speed property...)
@[67-76](Improved Motor Boat)
@[78-83](Improved Fast Motor Boat)
@[85-90](Fast Sail Boat ?)
@[91-101](Diesel Motor Boat ?)
@[103-110](Add a #fuel property...)
@[112-121](Fast Diesel Motor Boat)
@[123-132](Alternative Fast Diesel Motor Boat)
@snapend

---?code=multiple-inheritance.js&lang=javascript&color=linear-gradient(90deg, #5384AD 65%, white 35%)

@snap[north-west span-85 text-white]
#### Multiple Inheritance
@snapend

@snap[south span-30 text-07]
@[1-6](Boat class)
@[8-16](Sail Boat with #sail method)
@[18-23](Long Boat with #length property)
@[25-33](Motor Boat with #motor method)
@[35-40](Speed Boat with #speed property)
@[39-47](Fast Motor Boat extends Motor Boat & Speed Boat)
@[49-57](Fast Sail Boat extends Sail Boat & Speed Boat)
@[134-144](Faster Sail Boat With Motor extends Sail Boat, Motor Boat, Speed Boat)
@[146-155](Long Fast Diesel Motor Boat With Sail extends Diesel Boat, Motor Boat, Speed Boat, Long Boat, Sail Boat)
@snapend

---?color=linear-gradient(90deg, #5384AD 65%, white 35%)

@snap[north-west span-85 text-white]
#### IS-A or HAS-A
@snapend

@snap[west span-40]
@box[bg-orange text-white rounded box-padding fragment](Inheritance is for &nbsp; "IS A" relationships)
@snapend

@snap[east span-40]
@box[bg-green text-white rounded box-padding fragment](Aggregation is for "HAS A" relationships)
@snapend

---?color=linear-gradient(90deg, #5384AD 65%, white 35%)

@snap[north-west span-85]
#### Object Composition
@snapend

@snap[west span-55]
@ul[spaced text-white]
- Less coupling
- Fewer classes
- Better encapsulation
- More flexibility
- JS doesn't support multiple inheritance anyway
@ulend
@snapend
