## Fast Inverse Square Root Algorithm 
#### (or, evil floating point bit level hacking)

---?color=linear-gradient(90deg, #5384AD 65%, white 35%)

@snap[north-west span-85 text-white]
#### What do we mean?
@snapend

@snap[midpoint span-60]
@quote[Favor object composition over class inheritance.](Gang of Four, Design Patterns.)
@snapend

---?color=linear-gradient(90deg, #5384AD 65%, white 35%)

@snap[north-west span-85 text-white]
#### What do we mean?
@snapend

@snap[west span-40]
@box[bg-orange text-white rounded box-padding fragment](Class inheritance accomplishes reuse by abstracting away a common interface into a base class that subclasses can inherit from.)
@snapend

@snap[east span-40]
@box[bg-green text-white rounded box-padding fragment](Aggregation accomplishes reuse by forming a collection of subobjects, which encapsulate their own identity.)
@snapendc

---?code=inheritance.js&lang=javascript

@snap[north-west span-85 text-white]
#### Inheritance
@snapend

@snap[south span-50 text-07 text-white]
@[1-6](Boat class)
@[8-16](Sail Boat with #sail method)
@[18-27](Long Sail Boat extends Sail Boat)
@[29-37](Motor Boat with #motor method)
@[39-47](Fast Motor Boat with faster #motor method)
@[49-57](Faster Motor Boat with even faster #motor method)
@[59-65](Add a #speed property...)
@[67-76](Improved Motor Boat)
@[78-83](Improved Fast Motor Boat)
@[85-90](Improved Faster Motor Boat)
@[92-97](Fast Sail Boat ?)
@[98-108](Diesel Motor Boat ?)
@[110-117](Add a #fuel property...)
@[119-128](Fast Diesel Motor Boat)
@[130-139](Alternative Fast Diesel Motor Boat)
@[141-150](Alternative Fast Diesel Motor Boat)
@snapend

---?color=linear-gradient(90deg, #5384AD 65%, white 35%)

@snap[north-west span-85 text-white]
#### Multiple Inheritance
@snapend

@snap[west span-40]
@box[bg-orange text-white rounded box-padding fragment](Multiple inheritance is when a sub-class can inherit from more than one parent class.)
@snapend

@snap[east span-40]
@box[bg-orange text-white rounded box-padding fragment](... JavaScript does not support multiple inheritance.)
@snapend

---?code=multiple-inheritance.js&lang=javascript

@snap[north-west span-85 text-white]
#### Multiple Inheritance
@snapend

@snap[south span-50 text-07]
@[1-8](Boat class)
@[10-18](Sail Boat with #sail method)
@[20-25](Long Boat with #length property)
@[27-35](Motor Boat with #motor method)
@[37-42](Speed Boat with #speed property)
@[44-53](Fast Motor Boat extends Motor Boat & Speed Boat)
@[55-64](Fast Sail Boat extends Sail Boat & Speed Boat)
@[66-79](Faster Sail Boat With Motor extends Sail Boat, Motor Boat, Speed Boat)
@[81-97](Long Fast Diesel Motor Boat With Sail extends Diesel Boat, Motor Boat, Speed Boat, Long Boat, Sail Boat)
@snapend

---?color=linear-gradient(90deg, #5384AD 65%, white 35%)

@snap[north-west span-85 text-white]
#### Aggregation
@snapend

@snap[west span-40]
@box[bg-green text-white rounded box-padding fragment](Aggregation accomplishes reuse by forming a collection of subobjects, which retain their own reference identity.)
@snapend

@snap[east span-40]
@box[bg-green text-white rounded box-padding fragment](... This can be accomplished through delegation to the subobject, or concatenation of the subobject's members.)
@snapend

---?color=linear-gradient(90deg, #5384AD 65%, white 35%)

@snap[north-west span-85 text-white]
#### Aggregation
@snapend

@snap[west span-40]
@box[bg-orange text-white rounded box-padding fragment](&nbsp; Inheritance is for &nbsp; "IS A" relationships)
@snapend

@snap[east span-40]
@box[bg-green text-white rounded box-padding fragment](Aggregation is for "HAS A" relationships)
@snapend

---?code=aggregation.js&lang=javascript

@snap[north-west span-85 text-white]
#### Aggregation
@snapend

@snap[south span-50 text-07]
@[1-9](Sail with #sail method)
@[11-20](Motor with #motor method)
@[22-27](Fast Motor extends Motor)
@[29-34](Faster Motor extends Motor)
@[36-41](Frame with #length property)
@[43-48](Long Frame extends Frame)
@[50-55](Fuel with #fuel property)
@[57-62](Diesel Fuel extends Fuel)
@[64-69](Boat class)
@[71-76](Sail Boat extends Boat, adds Sail)
@[78-84](Long Sail Boat extends Boat, adds Sail & Long Frame)
@[86-91](Motor Boat extends Boat, adds Motor)
@[93-98](Fast Motor Boat extends Boat, adds Fast Motor)
@[100-106](Faster Motor Boat with Sail extends Boat, adds Faster Motor & Sail)
@[108-116](Long Faster Diesel Motor Boat With Sail extends Boat...)
@snapend

---?color=linear-gradient(90deg, #5384AD 65%, white 35%)

@snap[north-west span-85]
#### Aggregation
@snapend

@snap[west span-60]
@ul[spaced text-white]
- Less coupling
- Fewer classes
- Better encapsulation
- More flexibility
- No need for multiple inheritance
@ulend
@snapend

---?color=linear-gradient(90deg, #5384AD 65%, white 35%)

@snap[north span-30]
#### Questions?
@snapend

@snap[west span-30]
#### Comments?
@snapend

@snap[east span-30]
#### Suggestions?
@snapend

@snap[south span-30]
#### Concerns?
@snapend

---?code=state-object.js&lang=javascript

@snap[north-west span-85 text-white]
#### A Practical Example
@snapend

@snap[south span-50 text-07]
@[1-8](State class with #get & #set methods)
@[1-17](UndoableState subclass adds #undo & #redo methods)
@[10-27](LockacleState subclass adds #lock & #unlock methods)
@[29-39](UndoableState subclass aggregates Undoable)
@[41-51](LockableState subclass aggregates Lockable)
@[47-64](UndoableLockableState subclass aggregates Undoable & Lockable)
@snapend

---?code=aggregate.js&lang=javascript

@snap[north-west span-85 text-white]
#### My Implementation
@snapend

@snap[south span-50 text-07]
@[1-2](WeakMaps hold references to the target objects)
@[4-8](Store prototypes for the target and source "this" objects)
@[4-14](Create a record of the target objects property descriptors)
@[4-20](Create a record of the source objects property descriptors)
@[4-22](Create an aggregate object to use as the new prototype)
@[9-25](Copy the target and source properties to the new prototype)
@[9-23,26](Set the new prototype of the target object)
@[9-28]()
@snapend
