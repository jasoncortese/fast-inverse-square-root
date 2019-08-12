## Fast Inverse Square Root Algorithm 
#### (or, evil floating point bit level hacking)


---?color=linear-gradient(90deg, #5384AD 70%, white 30%)

@snap[north-west span-85 text-white]
#### <div style="padding-left: 20px;">Origins...</div>
@snapend

@snap[north span-85 text-05 text-black]
<div style="margin-top: 100px; text-align: left;">Around the turn of the century on a Usenet public forum, someone posted this method found in the source code of Quake III Arena...</div>
@snapend

@snap[south span-85 text-05 text-black]
<div style="margin-bottom: 100px; text-align: left;">This was credited to John Carmack who was lead programmer on the Quake software, but can be traced back thru Gary Tarolli of SGI, and ultimately to the mid-80s with Greg Walsh and Cleve Moler working at Ardent Computers.</div>
@snapend

@snap[midpoint span-60 text-05]
```
float Q_rsqrt( float number )
{
    float x2 = number \* 0.5F;
    float y  = number;
    long i  = \* ( long \* ) &y;                  // evil floating point bit level hacking
    i  = 0x5f3759df - ( i >> 1 );               // what the fuck? 
    y  = \* ( float \* ) &i;
    y  = y \* ( threehalfs - ( x2 \* y \* y ) );   // 1st iteration
//    y  = y \* ( threehalfs - ( x2 \* y \* y ) ); // 2nd iteration, this can be removed

    return y;
}
```
@snapend


---?color=linear-gradient(90deg, #5384AD 70%, white 30%)

@snap[north-west span-85 text-white]
#### <div style="padding-left: 20px; color: white;">Math is hard, m'kay?</div>
@snapend

@snap[north span-85 text-05 text-black]
<div style="margin-top: 100px; text-align: left;">In 3D graphics you do a lot of normalizing vectors, and that involves a lot of inverses and square roots, both of which are expensive operations (back then, quadruply so).</div>
@snapend

@snap[south span-85 text-05 text-black]
<div style="margin-bottom: 100px; text-align: left;">Recall that dividing a logarithm by 2 (or bitwise shifting right) equates to taking the square root, and multiplying by negative 1 equates to inverting.</div>
@snapend

@snap[midpoint span-60 text-05]
`\[y = {1 \over \sqrt{x}} = x^{-\frac{1}{2}}\]
\[\log_2 y = -{\small\frac{1}{2}} {\log_2 x}\]`
@snapend


---?color=linear-gradient(90deg, #5384AD 70%, white 30%)

@snap[north-west span-85 text-white]
#### <div style="padding-left: 20px; color: white;">IEEE-yai-yai</div>
@snapend

@snap[north span-85 text-05 text-black]
<div style="margin-top: 100px; text-align: left;">The bits of a single-precision floating point number look like this, where s is the sign bit, e are the 8 bits of the exponent E, and m are the 23 significant bits of the mantissa M.</div><br/>
<span style="color: orange;">s</span> <span style="color: green;">e e e e e e e e</span> <span style="color: red;">m m m m m m m m m m m m m m m m m m m m m m m</span>
@snapend

@snap[south span-85 text-05 text-black]
<div style="margin-bottom: 100px; text-align: left;">For 32-bit floating point numbers the bias B is 127, and the length L is 2^23. Given these, it is easy to convert between the floating point number and the integer interpretation.</div>
@snapend

@snap[midpoint span-60 text-05]
`\[m = {\frac{M}{L}}\]
\[e = E - B\]
\[\]
\[{\large{F}} \rightarrow (1+m) 2^e\]
\[\]
\[{\large{I}} \rightarrow M + L E\]`
@snapend


---?color=linear-gradient(90deg, #5384AD 70%, white 30%)

@snap[north-west span-85 text-white]
#### <div style="padding-left: 20px; color: white;">IEEE-yai-yai</div>
@snapend

@snap[north span-85 text-05 text-black]
<div style="margin-top: 100px; text-align: left;">Substituting our float representation into the inverse square root equation, we end up with logarithms that, for values between 0 and 1, can be linearly approximated. </div>
@snapend

@snap[south span-85 text-05 text-black]
<div style="margin-bottom: 100px; text-align: left;">Look familiar yet?</div>
@snapend

@snap[midpoint span-60 text-05]
`\[\log_2 (1 + m_y) + e_y = -{\small\frac{1}{2}} {\log_2 (1 + m_x) + e_x}\]
\[m_y + e_y + \sigma \approx -{\small\frac{1}{2}} (m_x + e_x + \sigma)\]
\[{\frac{M_y}{L}} + E_y + \sigma \approx -{\small\frac{1}{2}} ({\frac{M_x}{L}} + E_x + \sigma)\]
\[{M_y} + LE_y \approx {\small\frac{3}{2}} L(B - \sigma) -{\small\frac{1}{2}}(M_x + LE_x)\]
\[{\large{I}_y} \approx {\small\frac{3}{2}} L(B - \sigma) -{\small\frac{1}{2}}{\large{I}_x}\]`
@snapend


---?color=linear-gradient(90deg, #5384AD 70%, white 30%)

@snap[north-west span-85 text-white]
#### <div style="padding-left: 20px; color: white;">The Magic Number</div>
@snapend

@snap[north span-85 text-05 text-black]
<div style="margin-top: 100px; text-align: left;">We're looking for three-halves of a constant K, which we can subtract one-half of the integer from to approximate the inverse square root of the float.</div>
@snapend

@snap[south span-85 text-05 text-black]
<div style="margin-bottom: 100px; text-align: left;">And three-halves of K? You guessed it &mdash; our magic number!</div>
@snapend

@snap[midpoint span-60 text-05]
`\[{\large{I}_y} \approx {\small\frac{3}{2}} K -{\small\frac{1}{2}}{\large{I}_x}\]
\[\]
\[K = L(B - \sigma) = (2^{23}) (127 - 0.0450465)\]
\[\]
\[K = 1064975338\]
\[\]
\[{\small\frac{3}{2}} K = 1597463007 = 0x5f3759df\]`
@snapend
    
---?color=linear-gradient(90deg, #5384AD 70%, white 30%)

@snap[north-west span-85 text-white]
#### <div style="padding-left: 20px; color: white;">All the Magic Numbers</div>
@snapend

@snap[north span-85 text-05 text-black]
<div style="margin-top: 100px; text-align: left;">If minus one-half is `p` for the inverse square-root, three-halves is `1-p`. Using this we can generate magic numbers for other powers: square root, cube root, etc...</div>
@snapend

@snap[south span-85 text-05 text-black]
<div style="margin-bottom: 100px; text-align: left;">...</div>
@snapend

@snap[midpoint span-60 text-05]
`\[{\large{I}_y} \approx (1-p) K + {p}{\large{I}_x}\]
\[\]
\[{\small\frac{3}{2}} K = 0x5f3759df\]
\[\]
\[{\small\frac{1}{2}} K = 0x1fbd1df5\]
\[\]
\[{\small\frac{1}{3}} K = 0x2a517d3c\]`
@snapend

---?color=linear-gradient(90deg, #5384AD 70%, white 30%)

@snap[north-west span-85 text-white]
#### <div style="padding-left: 20px; color: white;">A Quick Refresher...</div>
@snapend

@snap[north span-85 text-05 text-black]
<div style="margin-top: 100px; text-align: left;">Recall that Newton's Method is an iterative way of solving for roots of a function. Starting with an approximation, then a better approximation is found by feeding the approximation into the reverse equation and averaging the results.</div>
@snapend

@snap[south span-85 text-05 text-black]
<div style="margin-bottom: 100px; text-align: left;">(Fun fact: this method applied to finding square roots was known to the ancient Babylonians.)</div>
@snapend

@snap[midpoint span-60 text-05]
`\[y \approx {\sqrt{x}}\]
\[y' = {{\frac{x}{y} + y} \over {2}}\]
\[\]
\[y \approx {1 \over \sqrt{x}}\]
\[y' = -{{\frac{x}{y^{-3}} - 3y} \over {2}}\]`
@snapend


---?color=linear-gradient(90deg, #5384AD 70%, white 30%)

@snap[north-west span-85 text-white]
#### <div style="padding-left: 20px;">What the f*ck?</div>
@snapend

@snap[north span-85 text-05 text-black]
<div style="margin-top: 100px; text-align: left;">Let's convert this to JavaScript so we play around with it and figure out what is going on...</div>
@snapend

@snap[south span-85 text-05 text-black]
<div style="margin-bottom: 100px; text-align: left;">It turns out the most interesting thing here isn't the magic number itself, but the idea: treating a Float as an Integer approximates a logarithmic operation!</div>
@snapend

@snap[midpoint span-60 text-05]
```
const buffer = new ArrayBuffer(4); // (x)
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


---?color=linear-gradient(90deg, #5384AD 70%, white 30%)

@snap[north-west span-85 text-white]
#### <div style="padding-left: 20px; color: white;">Prosthaphaeresis</div>
@snapend

@snap[north span-85 text-05 text-black]
<div style="margin-top: 100px; text-align: left;">We can now make sense of our original function: shifting right approximates the square root, negating approximates the inverse, and the magic number accounts for the change in representation.</div>
@snapend

@snap[south span-85 text-05 text-black]
<div style="margin-bottom: 100px; text-align: left;">We're going to call this operation "`prosthaphaeresis`", an old-timey term for logarithmic-like approximations before logarithms were invented.</div>
@snapend

@snap[midpoint span-60 text-05]
```
const buffer = new ArrayBuffer(8); // (x,y)
const fbuf = new Float32Array(buffer);
const ibuf = new Uint32Array(buffer);

function invsqrt(x) {
    fbuf[0] = x;                             // input float
    ibuf[0] >>= 1;                           // p-etic shift-right (square root)
    ibuf[0] \*= -1;                           // p-etic negate (inverse)
    ibuf[0] += 0x5F3759DF;                   // p-etic constant (magic number)
    fbuf[0] \*= 1.5 - (x \* fbuf[0] \*\* 2);     // apply newtons method
    return fbuf[0];                          // return float
}
```
@snapend


