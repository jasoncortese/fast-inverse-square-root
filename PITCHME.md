## Fast Inverse Square Root Algorithm 
#### (or, evil floating point bit level hacking)

---?color=linear-gradient(90deg, #5384AD 65%, white 35%)

@snap[north-west span-85 text-white]
#### <div style="padding-left: 20px;">Origins...</div>
@snapend

@snap[north span-85 text-05 text-black]
<div style="margin-top: 100px; text-align: left">Around the turn of the century on a Usenet public forum, someone posted this method found in the source code of Quake III Arena...</div>
@snapend

@snap[south span-85 text-05 text-black]
<div style="margin-bottom: 100px; text-align: left">This was credited to John Carmack who was lead programmer on the Quake software, but can be traced back thru Gary Tarolli of SGI, and ultimately to the mid-80s with Greg Walsh and Cleve Moler working at Ardent Computers.</div>
@snapend

@snap[midpoint span-65 text-05]
```
float Q_rsqrt( float number )
{
    long i;
    float x2, y;
    const float threehalfs = 1.5F;

    x2 = number \* 0.5F;
    y  = number;
    i  = \* ( long \* ) &y;                       // evil floating point bit level hacking
    i  = 0x5f3759df - ( i >> 1 );               // what the fuck? 
    y  = \* ( float \* ) &i;
    y  = y \* ( threehalfs - ( x2 \* y \* y ) );   // 1st iteration
//    y  = y \* ( threehalfs - ( x2 \* y \* y ) ); // 2nd iteration, this can be removed

    return y;
}
```
@snapend

---?color=linear-gradient(90deg, #5384AD 65%, white 35%)

@snap[north-west span-85 text-white]
#### <div style="padding-left: 20px;">What the f*ck?</div>
@snapend

@snap[north span-85 text-05 text-black]
<div style="margin-top: 100px; text-align: left">Let's convert this to JavaScript so we play around with it and figure out what is going on...</div>
@snapend

@snap[south span-85 text-05 text-black]
<div style="margin-bottom: 100px; text-align: left">It turns out the most interesting thing here isn't the magic number itself, but the idea: treating a Float as an Integer approximates a logarithmic operation!</div>
@snapend

@snap[midpoint span-65 text-05]
```
const buffer = new ArrayBuffer(8); // (x,y)
const fbuf = new Float32Array(buffer);
const ibuf = new Uint32Array(buffer);

function invsqrt(x) {
    fbuf[0] = x;                             // store as float
    ibuf[0] >>= 1;                           // shift right as integer
    ibuf[0] \*= -1;                           // negate as integer
    ibuf[0] += 0x5F3759DF;                   // add magic number
    fbuf[0] \*= 1.5 - (x \* fbuf[0] \*\* 2);     // apply newtons method
    return fbuf[0];                          // return as float
}
```
@snapend

---?color=linear-gradient(90deg, #5384AD 65%, white 35%)

@snap[north-west span-85 text-white]
#### <div style="padding-left: 20px; color: white;">Math is hard, m'kay?</div>
@snapend

@snap[north span-85 text-05 text-black]
<div style="margin-top: 100px; text-align: left">In 3D graphics you do a lot of normalizing vectors, and that involves a lot of inverses and square roots, both of which are expensive operations (back then, quadruply so).</div>
@snapend

@snap[south span-85 text-05 text-black]
<div style="margin-bottom: 100px; text-align: left">Recall that dividing a logarithm by 2 (or bitwise shifting right) would equate to taking the square root, and multiplying by negative 1 would equate to inverting.</div>
@snapend

@snap[midpoint span-65 text-05]
`\[
y = {1 \over \sqrt{x}} = x^{-\frac{1}{2}}
\]\[
\log_2 y = -{\small\frac{1}{2}} {\log_2 x}
\]`
@snapend

---?color=linear-gradient(90deg, #5384AD 65%, white 35%)

@snap[north-west span-85 text-white]
#### <div style="padding-left: 20px; color: white;">IEEE-yai-yai</div>
@snapend

@snap[north span-85 text-05 text-black]
<div style="margin-top: 100px; text-align: left">The bits of a single-precision floating point number look like this.</div>
@snapend

@snap[south span-85 text-05 text-black]
<div style="margin-bottom: 100px; text-align: left">Recall that dividing a logarithm by 2 (or bitwise shifting right) would equate to taking the square root, and multiplying by negative 1 would equate to inverting.</div>
@snapend

@snap[midpoint span-65 text-05]
s e e e e e e e e m m m m m m m m m m m m m m m m m m m m m m m
`\[
y = {1 \over \sqrt{x}} = x^{-\frac{1}{2}}
\]\[
\log_2 y = -{\small\frac{1}{2}} {\log_2 x}
\]`
@snapend
