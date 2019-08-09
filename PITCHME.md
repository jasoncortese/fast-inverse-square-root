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
<div style="margin-bottom: 100px; text-align: left">This was credited to John Carmack who was lead programmer on the Quake software, but can be traced back past Gary Tarolli of SGI, and ultimately to the mid-80s with Greg Walsh and Cleve Moler working at Ardent Computers.</div>
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
<div style="margin-bottom: 100px; text-align: left">It turns out the most interesting thing here isn't the magic number itself, but the idea: treating a floating point number as an integer approximates a logarithmic operation!</div>
@snapend

@snap[midpoint span-65 text-05]
```
const buffer = new ArrayBuffer(8); // (x,y)
const fbuf = new Float32Array(buffer);
const ibuf = new Uint32Array(buffer);

function invsqrt(number) {
    fbuf[0] = x;                 // store as float
    ibuf[0] >>= 1;               // shift right as integer
    ibuf[0] *= -1;               // negate as integer
    ibuf[0] += 0x5F3759DF;       // add magic number
    return fbuf[0];              // return as float
}
```
@snapend

---?color=linear-gradient(90deg, #5384AD 65%, white 35%)

@snap[north-west span-85 text-white]
#### <div style="padding-left: 20px;">Math is hard, mkay?</div>
@snapend

@snap[north span-85 text-05 text-black]
<div style="margin-top: 100px; text-align: left">Let's convert this to JavaScript so we play around with it and figure out what is going on...</div>
@snapend

@snap[south span-85 text-05 text-black]
<div style="margin-bottom: 100px; text-align: left">It turns out the most interesting thing here isn't the magic number itself, but the idea: treating a floating point number as an integer approximates a logarithmic operation!</div>
@snapend

@snap[midpoint span-65 text-05]
`\[
\left( \sum_{k=1}^n a_k b_k \right)^{\!\!2} \leq
 \left( \sum_{k=1}^n a_k^2 \right) \left( \sum_{k=1}^n b_k^2 \right)
\]`
@snapend
